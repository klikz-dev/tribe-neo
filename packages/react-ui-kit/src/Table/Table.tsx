import { FC } from 'react'

import clsx from 'clsx'

import { BackgroundProvider } from '../BackgroundContext'
import { TableHeader, TableHeaderCell } from './TableHeader'
import { TableCell, TableRow } from './TableRow'

export type TableProps = React.ComponentProps<'table'>

/**
 * Used to display data lists to your users in a clean, tabular format.
 */
export const Table = (props: TableProps) => {
  const { children, className, ...rest } = props

  return (
    <BackgroundProvider backgroundType="surface">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-neutral-200 sm:rounded-lg">
              <table
                className={clsx(
                  'min-w-full divide-y divide-neutral-200',
                  className,
                )}
                {...rest}
              >
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </BackgroundProvider>
  )
}

type TableBodyProps = React.ComponentProps<'tbody'>

const TableBody: FC<TableBodyProps> = props => {
  const { children, className, ...rest } = props

  return (
    <tbody
      className={clsx(
        'divide-y divide-neutral-200',
        'bg-surface-50 text-basicSurface-500',
        className,
      )}
      {...rest}
    >
      {children}
    </tbody>
  )
}

Table.Header = TableHeader
Table.HeaderCell = TableHeaderCell

Table.Body = TableBody

Table.Row = TableRow
Table.Cell = TableCell
