import { ComponentProps } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export type GridListColumns = 3 | 4

export type GridListProps = ComponentProps<'div'> & {
  columns?: GridListColumns
}
/**
 * GridList is a 2-dimensional layout system, meaning it can handle both columns and rows.
 */
export const GridList = (props: GridListProps) => {
  const { children, columns = 3, className } = props

  const columnsClsx = {
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
    'grid-cols-1 lg:grid-cols-3 xl:grid-cols-4': columns === 4,
  }

  return (
    <ul className={twMerge(clsx('grid gap-6', columnsClsx, className))}>
      {children}
    </ul>
  )
}

const GridListItem = ({ children, ...rest }) => {
  return (
    <li className="col-span-1" {...rest}>
      {children}
    </li>
  )
}

GridList.Item = GridListItem
