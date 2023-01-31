import { FC } from 'react'

import clsx from 'clsx'

export type TableHeaderProps = React.ComponentProps<'thead'>

export const TableHeader: FC<TableHeaderProps> = props => {
  const { children, className, ...rest } = props

  return (
    <thead className={clsx('bg-surface-50', className)} {...rest}>
      {children}
    </thead>
  )
}

export type TableHeaderCellProps = React.ComponentProps<'th'>

export const TableHeaderCell: FC<TableHeaderCellProps> = props => {
  const { children, className, ...rest } = props

  return (
    <th
      scope="col"
      className={clsx(
        'px-6 py-3 text-left font-medium text-basicSurface-500 tracking-wider',
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  )
}
