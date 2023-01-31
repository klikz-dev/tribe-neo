import { FC } from 'react'

import clsx from 'clsx'

export type TableRowProps = React.ComponentProps<'tr'>

export const TableRow: FC<TableRowProps> = props => {
  const { children, ...rest } = props

  return <tr {...rest}>{children}</tr>
}

export type TableCellProps = React.ComponentProps<'td'> & {
  variant?: 'default' | 'text-primary' | 'text-secondary'
  nowrap?: boolean
}

export const TableCell: FC<TableCellProps> = props => {
  const {
    children,
    className,
    variant = 'default',
    nowrap = true,
    ...rest
  } = props

  return (
    <td
      className={clsx(
        'px-6 py-4 ',
        nowrap && 'whitespace-nowrap',
        variant === 'text-primary' && 'text-basicSurface-900',
        variant === 'text-secondary' && 'text-basicSurface-500',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  )
}
