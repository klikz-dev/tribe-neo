import { FC } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { HTMLTribeProps } from '../system'

export type IndicatorBadgeVariant = 'primary' | 'danger'

export type IndicatorBadgeProps = HTMLTribeProps<'div'> & {
  /**
   * Number to show in badge
   */
  count?: number
  /**
   * Max count to show
   * @default 99
   */
  max?: number
  /**
   * Whether to show badge when count is zero
   * @default false
   */
  showZero?: boolean
  /**
   * Whether to display a dot instead of count
   * @default false
   */
  dot?: boolean
  variant?: IndicatorBadgeVariant
}

/**
 * IndicatorBadge is a visual indicator for numeric values such as tallies and scores.
 */
export const IndicatorBadge: FC<IndicatorBadgeProps> = props => {
  const {
    as,
    count,
    max = 99,
    dot = false,
    showZero = false,
    variant = 'danger',
    children,
    className,
    ...rest
  } = props

  const Component = as || 'span'

  if (!count || (!showZero && typeof count === 'number' && count <= 0)) {
    return <>{children}</>
  }

  const colorClsx = [
    variant === 'primary' && 'text-actionPrimary-100 bg-actionPrimary-600',
    variant === 'danger' && 'text-danger-100 bg-danger-600',
  ]

  let content = ''
  if (!dot && typeof count === 'number') {
    if (count > max) {
      content = `${max}+`
    } else if (count <= 0) {
      content = '0'
    } else {
      content = String(count)
    }
  }

  const component = (
    <Component
      className={twMerge(
        clsx(
          children &&
            'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
          colorClsx,
          'rounded-full ',
          !dot &&
            'h-5 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none',
          dot && 'inline-block w-2 h-2',
          className,
        ),
      )}
      {...rest}
    >
      {content}
    </Component>
  )

  if (children) {
    return (
      <div className={clsx('relative inline-block')}>
        {children}
        {component}
      </div>
    )
  }

  return component
}
