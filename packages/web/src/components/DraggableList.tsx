import { ReactNode } from 'react'

import ViewListIcon from '@heroicons/react/outline/ViewListIcon'
import clsx from 'clsx'
import {
  DragDropContext,
  Draggable as DumbDraggable,
  Droppable,
} from 'react-beautiful-dnd'

const DRAGGABLE_ITEM_INSIDE_MODAL_STYLES = {
  position: 'sticky',
  top: 0,
  left: 0,
}

export type DraggableListProps = {
  id: string
  onDragEnd: (props) => void
  children: ReactNode
}

export const DraggableList = ({
  id,
  onDragEnd,
  children,
}: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export type DraggableListItemProps = {
  id: string
  index: number
  isInsideModal?: boolean
}

const DraggableListItem: React.FC<DraggableListItemProps> = ({
  id,
  index,
  children,
  isInsideModal,
  ...rest
}) => {
  const overriddenStyles = isInsideModal
    ? DRAGGABLE_ITEM_INSIDE_MODAL_STYLES
    : null

  return (
    <DumbDraggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => {
        let { transform } = provided.draggableProps.style

        // Revert horizontal position back to 0
        if (snapshot.isDragging && transform) {
          // eslint-disable-next-line no-useless-escape
          transform = transform.replace(/\(.+\,/, '(0,')
        }
        return (
          <div
            className={clsx(
              'border rounded-md p-2 px-2 mb-2 bg-surface-50 hover:bg-surface-100 flex space-x-2 items-center hover-trigger truncate',
              snapshot.isDragging ? 'shadow-lg' : '',
            )}
            key={id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={
              snapshot.isDragging
                ? {
                    ...provided.draggableProps.style,
                    transform,
                    ...overriddenStyles,
                  }
                : provided.draggableProps.style
            }
            {...rest}
          >
            <div
              className="h-5 w-5 text-basicSurface-500 flex-shrink-0"
              {...provided.dragHandleProps}
            >
              <ViewListIcon />
            </div>
            {children}
          </div>
        )
      }}
    </DumbDraggable>
  )
}

DraggableList.reorder = reorder
DraggableList.Item = DraggableListItem
