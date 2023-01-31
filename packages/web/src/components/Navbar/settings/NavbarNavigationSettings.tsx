import PlusIcon from '@heroicons/react/outline/PlusIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import {
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'

import { ComponentSettings } from '../../../page-builder/component-editor'
import { DraggableList } from '../../DraggableList'
import { NavbarNavigationItem } from '../constants'
import { getOldNavigationItems } from '../utils'
import { NavbarNavigationItemSettings } from './NavbarNavigationItemSettings'

export const NavbarNavigationSettings = () => {
  const { pushActiveBlock, context } = useSlateKit()
  const slateProps = useSlate()
  const {
    componentId,
    componentLevel,
    parentComponentId,
    component,
    upsertProp,
  } = useSlateComponent()
  const { navigationItems: newNavigationItems } = component?.props || {}
  const navigationItems: NavbarNavigationItem[] =
    newNavigationItems || getOldNavigationItems(context.network)
  const { activeBlock } = context

  const openItem = (Component, name, index, additionalProps = {}) => {
    pushActiveBlock({
      id: activeBlock.id,
      name,
      Settings: (
        <ComponentSettings
          componentId={componentId}
          componentLevel={componentLevel}
          parentComponentId={parentComponentId}
          Settings={<Component itemIndex={index} {...additionalProps} />}
          slateProps={slateProps}
        />
      ),
    })
  }
  const onDragEnd = (items, key) => result => {
    if (!result.destination) {
      return
    }

    const newItems = DraggableList.reorder(
      items,
      result.source.index,
      result.destination.index,
    )

    upsertProp(key, newItems)
  }
  const deleteItem = (items, key, itemIndex) => {
    upsertProp(key, [
      ...items.slice(0, itemIndex),
      ...items.slice(itemIndex + 1),
    ])
  }
  const addItem = (items, key) => {
    const newItems = [...items, { label: 'New Item' }]
    const index = newItems.length - 1
    upsertProp(key, newItems)
    openItem(NavbarNavigationItemSettings, newItems[index].label, index)
  }

  return (
    <List spacing="sm">
      <List.Item>
        <h3 className="leading-6 text-basicSurface-500">Navigation items</h3>
      </List.Item>
      <List.Item>
        <DraggableList
          id="navbar-navigation-items"
          onDragEnd={onDragEnd(navigationItems, 'navigationItems')}
        >
          {navigationItems.map((item, index) => (
            <DraggableList.Item key={item.label} id={item.label} index={index}>
              <div
                className="flex flex-grow cursor-pointer h-6 truncate"
                onClick={() => {
                  openItem(NavbarNavigationItemSettings, item.label, index)
                }}
              >
                <p className="text-basicSurface-500 truncate">{item.label}</p>
              </div>
              <TrashIcon
                className="w-6 h-6 cursor-pointer text-basicSurface-700 hover:text-basicSurface-900"
                onClick={() =>
                  deleteItem(navigationItems, 'navigationItems', index)
                }
              />
            </DraggableList.Item>
          ))}
        </DraggableList>
        <Button
          variant="outline"
          leadingIcon={<PlusIcon />}
          onClick={() => addItem(navigationItems, 'navigationItems')}
          fullWidth
        >
          Add navigation
        </Button>
      </List.Item>
    </List>
  )
}
