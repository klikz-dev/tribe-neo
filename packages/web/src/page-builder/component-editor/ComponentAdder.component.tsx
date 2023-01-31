import { ReactElement } from 'react'

import PlusSmIcon from '@heroicons/react/outline/PlusSmIcon'

export const ComponentAdder = ({
  onAdd,
}: {
  onAdd: (e) => void
}): ReactElement => {
  return (
    <div className="relative my-3 opacity-20 hover:opacity-100">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-neutral-300" />
      </div>
      <div className="relative flex justify-center">
        <button
          type="button"
          className="inline-flex items-center shadow-sm px-4 py-1.5 border border-neutral-300 text-sm leading-5 font-medium rounded-full text-basicSurface-700 bg-surface-50 hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-actionPrimary-500"
          onClick={onAdd}
        >
          <PlusSmIcon
            className="-ml-1.5 mr-1 h-5 w-5 text-basicSurface-400"
            aria-hidden="true"
          />
          <span>Add</span>
        </button>
      </div>
    </div>
  )
}
