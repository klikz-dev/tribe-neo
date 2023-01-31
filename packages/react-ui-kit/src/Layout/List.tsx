import { FC } from 'react'

import clsx from 'clsx'

import {
  ListDirection,
  ListProvider,
  ListSpacing,
  useList,
} from './ListContext'

export type ListProps = React.ComponentProps<'ul'> & {
  spacing?: ListSpacing
  divider?: boolean
  direction?: ListDirection
}
/**
 * List component is used to display list items. It renders a <ul> element by default.
 */
export const List = (props: ListProps) => {
  const {
    children,
    divider = false,
    spacing = 'md',
    direction = 'vertical',
    className,
    ...rest
  } = props

  return (
    <ul
      className={clsx(
        [
          'flex',
          direction === 'vertical' && 'flex-col',
          direction === 'horizontal' && 'flex-row',
        ],
        divider && [
          'divide-neutral-200',
          direction === 'vertical' && 'divide-y',
          direction === 'horizontal' && 'divide-x',
        ],
        className,
      )}
      {...rest}
    >
      <ListProvider spacing={spacing} direction={direction}>
        {children}
      </ListProvider>
    </ul>
  )
}

export type ListItemProps = React.ComponentProps<'li'>

const ListItem: FC<ListItemProps> = props => {
  const { children, className, ...rest } = props

  const { spacing, direction } = useList()

  return (
    <li
      className={clsx(
        direction === 'vertical' && [
          spacing === 'md' && 'py-4',
          spacing === 'sm' && 'py-2',
          spacing === 'none' && 'py-0',
          className,
        ],
        direction === 'horizontal' && [
          'flex-1',
          spacing === 'md' && 'px-4',
          spacing === 'sm' && 'px-2',
          spacing === 'none' && 'px-0',
          className,
        ],
      )}
      {...rest}
    >
      {children}
    </li>
  )
}

List.Item = ListItem
