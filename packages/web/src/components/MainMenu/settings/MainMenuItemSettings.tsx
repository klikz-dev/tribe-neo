import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { Select } from '@tribeplatform/react-ui-kit/Select'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import {
  mainMenuActions,
  mainMenuDefaultItems,
  MainMenuItem,
} from '../constants'

export type MainMenuItemSettingsProps = {
  item: MainMenuItem
  updateItem: (item) => void
}

export const MainMenuItemSettings = ({ itemIndex }) => {
  const { component, upsertProp } = useSlateComponent()

  const { items = mainMenuDefaultItems } = component?.props || {}
  const item = items[itemIndex]

  if (!item) return null

  const { label } = item
  const actionIdx = mainMenuActions.findIndex(
    action => item.action === action.action && item.page === action.page,
  )
  const currentAction = mainMenuActions[actionIdx]
  const updateItem = update => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? { ...item, ...update } : item,
    )
    upsertProp('items', newItems)
  }

  return (
    <List spacing="sm">
      <List.Item>
        <FormControl.Input
          name="label"
          value={label}
          onChange={e => {
            updateItem({ ...item, label: e.target.value })
          }}
          label="Label"
        />
      </List.Item>
      <List.Item>
        <FormControl.Select
          value={actionIdx}
          onChange={index => {
            const result = { ...mainMenuActions[index] }
            delete result.label
            updateItem({ ...item, ...result })
          }}
          label="Action"
        >
          <Select.Button>{currentAction?.label}</Select.Button>
          <Select.Items>
            {mainMenuActions.map((action, idx) => (
              <Select.Item key={action.label} value={idx}>
                {action.label}
              </Select.Item>
            ))}
          </Select.Items>
        </FormControl.Select>
      </List.Item>
    </List>
  )
}
