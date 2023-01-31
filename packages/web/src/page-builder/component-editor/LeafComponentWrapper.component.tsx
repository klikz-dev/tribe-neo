import { ReactElement } from 'react'

import CubeIcon from '@heroicons/react/outline/CubeIcon'
import PencilIcon from '@heroicons/react/solid/PencilIcon'
import TrashIcon from '@heroicons/react/solid/TrashIcon'
import clsx from 'clsx'

import {
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'

export const LeafComponentWrapper = ({
  displayName,
  Settings,
  permitToEdit,
  permitToAdd,
  children,
}): ReactElement | null => {
  const { selectBlock, unselectBlock, updateActiveBlock } = useSlateKit()
  const slateProps = useSlate()
  const { updateSlate } = slateProps
  const slateComponentProps = useSlateComponent()
  const { activated, selected, component, componentId, componentLevel } =
    slateComponentProps

  return (
    <div
      className="relative"
      onMouseEnter={() =>
        selectBlock({ id: componentId, level: componentLevel })
      }
      onMouseLeave={() =>
        unselectBlock({ id: componentId, level: componentLevel })
      }
    >
      <div
        className={clsx(
          'absolute left-0 right-0 top-0 h-full max-h-40 z-10 flex m-auto justify-center items-center',
          !selected && 'hidden',
        )}
      >
        {!activated && (
          <div className="flex flex-col m-auto justify-center items-center space-y-1">
            <p className="text-black">{displayName}</p>
            <div className="flex flex-row m-auto justify-center items-center space-x-1">
              {permitToEdit && (
                <div
                  className="bg-surface-50 hover:bg-surface-100 rounded-md w-6 p-1 cursor-pointer shadow-md"
                  onClick={e => {
                    updateActiveBlock({
                      id: componentId,
                      name: displayName,
                      Settings,
                    })
                    e.stopPropagation()
                  }}
                >
                  <PencilIcon className="text-basicSurface-500" />
                </div>
              )}
              {component.removable && permitToAdd && (
                <div
                  className="bg-surface-50 hover:bg-surface-100 rounded-md w-6 p-1 cursor-pointer shadow-md"
                  onClick={e => {
                    unselectBlock({
                      id: componentId,
                      level: componentLevel,
                    })
                    updateActiveBlock()
                    updateSlate({ removedComponentIds: [componentId] })
                    e.stopPropagation()
                  }}
                >
                  <TrashIcon className="text-danger-500" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={clsx('relative', selected && !activated && 'filter blur-sm')}
      >
        {children?.props?.hidden ? (
          <div className="py-10 text-center mb-5 bg-surface-50 rounded-md">{`${displayName}: Hidden`}</div>
        ) : (
          children
        )}
      </div>
      <div
        className={clsx(
          'absolute inset-0 overflow-hidden z-20',
          !(permitToEdit && !selected && !activated) && 'hidden',
        )}
      />
      <div
        className={clsx(
          'absolute inset-0 sm:rounded-md border-2',
          selected && !activated && 'bg-gray-300 bg-opacity-80',
          selected || activated ? 'border-actionPrimary-500 shadow-md' : '',
          permitToEdit &&
            !selected &&
            !activated &&
            'border-actionPrimary-300 shadow-sm',
          activated && 'z-20',
        )}
      />
      <span
        className={clsx(
          'absolute top-0 right-0 z-30 text-basicPrimary-500 rounded-bl-sm rounded-tr-md',
          selected || activated
            ? 'bg-actionPrimary-500'
            : 'bg-actionPrimary-300',
        )}
      >
        <CubeIcon className={clsx('h-5 w-5 p-1')} aria-hidden="true" />
      </span>
    </div>
  )
}
