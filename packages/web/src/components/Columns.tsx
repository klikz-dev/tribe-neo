import clsx from 'clsx'

import { BlockContainer } from '@tribeplatform/slate-kit/components'

type ColumnsProps = {
  columns: {
    sticky?: boolean
    main?: boolean
  }[]
}

export const Columns = ({ columns }: ColumnsProps) => {
  return (
    <div className="grid grid-cols-12 gap-5">
      {columns.map((column, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`${idx}`}
          className={clsx(
            column.main
              ? 'col-span-12 lg:col-span-8'
              : 'hidden lg:block lg:col-span-4',
            column.sticky ? 'sticky top-0' : null,
          )}
        >
          <BlockContainer childId={idx} />
        </div>
      ))}
    </div>
  )
}
