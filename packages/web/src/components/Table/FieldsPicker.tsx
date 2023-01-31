import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import TableIcon from '@heroicons/react/outline/TableIcon'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Popover } from '@tribeplatform/react-ui-kit/Popover'
import { Toggle } from '@tribeplatform/react-ui-kit/Toggle'

import { DraggableList } from '../DraggableList'

export const FieldsPicker = ({ table, footer }) => {
  const { allColumns: fields, toggleHideColumn, setColumnOrder } = table

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const newItems = DraggableList.reorder(
      fields,
      result.source.index,
      result.destination.index,
    )
    setColumnOrder(newItems.map(item => item.id))
  }

  return (
    <Popover placement="bottom-end">
      <Popover.TriggerMinimal>
        <Button
          variant="outline"
          leadingIcon={<TableIcon />}
          trailingIcon={<ChevronDownIcon />}
        >
          Fields
        </Button>
      </Popover.TriggerMinimal>
      <Popover.Panel>
        <div className="w-64 p-3">
          <DraggableList id="field-picker" onDragEnd={onDragEnd}>
            {fields.map((field, index) => (
              <DraggableList.Item
                key={field.Header}
                id={field.id}
                index={index}
              >
                <p className="flex flex-grow text-basicSurface-500 overflow-hidden">
                  <div className="max-w-full truncate">
                    {field.name || field.Header}
                  </div>
                </p>
                <Toggle
                  checked={field.isVisible}
                  onChange={() => toggleHideColumn(field.id)}
                />
              </DraggableList.Item>
            ))}
          </DraggableList>
          {footer}
        </div>
      </Popover.Panel>
    </Popover>
  )
}
