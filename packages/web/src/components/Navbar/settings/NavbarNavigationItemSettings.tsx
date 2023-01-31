import { ReactNode } from 'react'

import TrashIcon from '@heroicons/react/outline/TrashIcon'

import { PickerFormControl } from '@tribeplatform/react-sdk/components'
import { useSpace } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { Select } from '@tribeplatform/react-ui-kit/Select'
import { useSlateComponent, useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { defaultPages } from '../../../page-builder/default-pages'
import { mergePages } from '../../../page-builder/utils'
import {
  NavbarNavigationAction,
  navbarNavigationActions,
  NavbarNavigationItem,
} from '../constants'
import { getOldNavigationItems } from '../utils'

export type NavbarNavigationItemSettingsProps = {
  itemIndex: number
}

export const NavbarNavigationItemSettings = ({
  itemIndex,
}: NavbarNavigationItemSettingsProps) => {
  const { context, popActiveBlock } = useSlateKit()
  const { component, upsertProp } = useSlateComponent()
  const { pages: customPages } = context.network
  const pages = mergePages(defaultPages, customPages)

  const { navigationItems: newNavigationItems } = component?.props || {}
  const navigationItems: NavbarNavigationItem[] =
    newNavigationItems || getOldNavigationItems(context.network)
  const item: NavbarNavigationItem = navigationItems[itemIndex]

  const { data: currentSpace } = useSpace({
    fields: { image: 'basic' },
    variables: { id: item?.space },
  })

  if (!item) return null

  const { label } = item
  // let readyToSave: boolean = item.label && item.action && true
  // switch (item.action) {
  //   case NavbarNavigationAction.OPEN_LINK:
  //     readyToSave = readyToSave && item.link && true
  //     break
  //   case NavbarNavigationAction.OPEN_PAGE:
  //     readyToSave = readyToSave && item.page && true
  //     break
  //   case NavbarNavigationAction.OPEN_SPACE:
  //     readyToSave = readyToSave && item.space && true
  //     break
  // }

  const updateItem = update => {
    const newItems = navigationItems.map((item, idx) =>
      idx === itemIndex ? { ...item, ...update } : item,
    )
    upsertProp('navigationItems', newItems)
  }
  const deleteItem = () => {
    popActiveBlock()
    upsertProp('navigationItems', [
      ...navigationItems.slice(0, itemIndex),
      ...navigationItems.slice(itemIndex + 1),
    ])
  }
  let actionBasedInput: ReactNode
  switch (item.action) {
    case NavbarNavigationAction.OPEN_LINK:
      actionBasedInput = (
        <FormControl.Input
          name="link"
          value={item.link}
          onChange={e => {
            updateItem({ link: e.target.value })
          }}
          label="Link"
        />
      )
      break
    case NavbarNavigationAction.OPEN_PAGE:
      actionBasedInput = (
        <FormControl.Select
          value={item.page}
          onChange={page => {
            updateItem({ page })
          }}
          label="Page"
        >
          <Select.Button>{item.page}</Select.Button>
          <Select.Items>
            {pages
              .filter(page => page.slug !== 'explore')
              .filter(page => page.type === 'CUSTOM' || page.slug === 'home')
              .map(page => (
                <Select.Item key={page.slug} value={page.slug}>
                  {page?.seoDetail?.title}
                </Select.Item>
              ))}
          </Select.Items>
        </FormControl.Select>
      )
      break
    case NavbarNavigationAction.OPEN_SPACE:
      actionBasedInput = (
        <PickerFormControl.SpacePicker
          value={currentSpace}
          onChange={space => {
            updateItem({ space: space?.id })
          }}
          label="Space"
        />
      )
      break
  }

  return (
    <List spacing="sm">
      <List.Item>
        <FormControl.Input
          name="label"
          value={label}
          onChange={e => {
            updateItem({ label: e.target.value })
          }}
          label="Label"
        />
      </List.Item>
      <List.Item>
        <FormControl.Select
          value={item.action}
          onChange={action => {
            updateItem({ action, link: null, page: null, space: null })
          }}
          label="Action"
        >
          <Select.Button>
            {
              navbarNavigationActions.find(
                actionItem => actionItem.action === item.action,
              )?.title
            }
          </Select.Button>
          <Select.Items>
            {navbarNavigationActions.map(actionItem => (
              <Select.Item key={actionItem.title} value={actionItem.action}>
                {actionItem.title}
              </Select.Item>
            ))}
          </Select.Items>
        </FormControl.Select>
      </List.Item>
      {item.action && <List.Item>{actionBasedInput}</List.Item>}
      {item.action && (
        <List.Item>
          <FormControl.Toggle
            name="newWindow"
            label="Open in a new window"
            checked={item.openInNewWindow}
            onChange={openInNewWindow => {
              updateItem({ openInNewWindow })
            }}
          />
        </List.Item>
      )}
      <List.Item className="mt-4">
        <Button
          variant="outline"
          leadingIcon={<TrashIcon />}
          onClick={deleteItem}
          fullWidth
        >
          Delete
        </Button>
      </List.Item>
    </List>
  )
}
