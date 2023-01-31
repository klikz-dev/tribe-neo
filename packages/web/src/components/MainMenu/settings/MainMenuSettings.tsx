/* eslint-disable @typescript-eslint/no-unused-vars */

import { Toggle } from '@tribeplatform/react-ui-kit/Toggle'
import {
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'

import { DraggableList } from '../../DraggableList'
import { mainMenuDefaultItems } from '../constants'

export const MainMenuSettings = () => {
  const { pushActiveBlock, context } = useSlateKit()
  const slateProps = useSlate()
  const {
    componentId,
    componentLevel,
    parentComponentId,
    component,
    upsertProp,
  } = useSlateComponent()
  const { items = mainMenuDefaultItems } = component?.props || {}
  const { activeBlock } = context

  const toggleItem = (index, enabled) => {
    const newItems = items.map((item, idx) =>
      idx === index ? { ...item, enabled } : item,
    )
    upsertProp('items', newItems)
  }
  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const newItems = DraggableList.reorder(
      items,
      result.source.index,
      result.destination.index,
    )

    upsertProp('items', newItems)
  }

  return (
    <DraggableList id="main-menu-items" onDragEnd={onDragEnd}>
      {items.map((item, index) => (
        <DraggableList.Item key={item.label} id={item.label} index={index}>
          <p
            className="flex flex-grow text-basicSurface-500"
            // onClick={() => {
            //   pushActiveBlock({
            //     id: activeBlock.id,
            //     name: item.label,
            //     Settings: (
            //       <ComponentSettings
            //         componentId={componentId}
            //         componentLevel={componentLevel}
            //         parentComponentId={parentComponentId}
            //         Settings={<MainMenuItemSettings itemIndex={index} />}
            //         slateProps={slateProps}
            //       />
            //     ),
            //   })
            // }}
          >
            {item.label}
          </p>
          <Toggle
            checked={item.enabled}
            onChange={enabled => {
              toggleItem(index, enabled)
            }}
          />
        </DraggableList.Item>
      ))}
    </DraggableList>
  )
}
