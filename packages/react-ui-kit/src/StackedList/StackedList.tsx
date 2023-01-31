import { FC } from 'react'

import clsx from 'clsx'

export type StackedListProps = React.ComponentProps<'div'>

/**
 * List with sticky headings
 */
export const StackedList = (props: StackedListProps) => {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx('h-full overflow-y-auto isolate', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export type StackedListGroupProps = React.ComponentProps<'div'>

const StackedListGroup: FC<StackedListGroupProps> = props => {
  const { children, className, ...rest } = props

  return (
    <div className={clsx('relative', className)} {...rest}>
      {children}
    </div>
  )
}

export type StackedListGroupTitleProps = React.ComponentProps<'div'>

const StackedListGroupTitle: FC<StackedListGroupTitleProps> = props => {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx(
        'z-10 sticky top-0 border-t border-b border-neutral-200 bg-surface-100 px-6 py-1 text-sm font-medium text-basicSurface-500',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

StackedList.Group = StackedListGroup
StackedList.GroupTitle = StackedListGroupTitle
