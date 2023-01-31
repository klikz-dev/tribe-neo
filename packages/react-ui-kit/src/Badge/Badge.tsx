import { forwardRef, ForwardRefExoticComponent, ReactNode, FC } from 'react'

import clsx from 'clsx'

import { Icon, IconProps } from '../Icon'
import { HTMLTribeProps } from '../system'
import { BadgeProvider, useBadge } from './BadgeContext'

export type BadgeVariant = 'primary' | 'secondary'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = HTMLTribeProps<'div'> & {
  variant?: BadgeVariant
  size?: BadgeSize
  rounded?: boolean
  leadingIcon?: IconProps
  trailingIcon?: IconProps | ReactNode
}

type BadgeCompound = ForwardRefExoticComponent<BadgeProps> & {
  Button?: FC<BadgeButtonProps>
}
/**
 * Badges are used to highlight an item's status for quick recognition.
 */
export const Badge: BadgeCompound = forwardRef((props, ref) => {
  const {
    as,
    variant = 'primary',
    size = 'md',
    rounded = false,
    children,
    leadingIcon,
    trailingIcon,
    className,
    ...rest
  } = props

  const colorClsx = [
    variant === 'primary' && 'bg-actionPrimary-100 text-actionPrimary-800',
    variant === 'secondary' && 'bg-surface-200 text-basicSurface-800',
    'focus:outline-none focus-visible:ring',
  ]

  const sizeClsx = [
    size === 'sm' && 'px-1.5 py-0.5 text-xs',
    size === 'md' && 'px-2.5 py-0.5 text-xs ',
    size === 'lg' && 'px-3 py-0.5 text-sm',
  ]

  const roundedClsx = {
    rounded: !rounded && size === 'md',
    'rounded-md': !rounded && size === 'lg',
    'rounded-full ': rounded,
  }

  let leadingIconElement
  if (leadingIcon) {
    const iconClsx = [
      size === 'md' && !!children && '-ml-0.5 mr-1.5',
      size === 'lg' && !!children && '-ml-1 mr-1.5',
      'h-4 w-4',
    ]

    leadingIconElement = (
      <Icon className={clsx(iconClsx, colorClsx)}>{leadingIcon}</Icon>
    )
  }
  let trailingIconElement
  if (trailingIcon) {
    const iconClsx = [
      size === 'md' && !!children && '-mr-0.5 ml-1.5',
      size === 'lg' && !!children && '-mr-1 ml-1.5',
      'h-4 w-4',
    ]
    trailingIconElement = (
      <Icon className={clsx(iconClsx, colorClsx)}>{trailingIcon}</Icon>
    )
  }
  const Component = as || 'span'

  return (
    <Component
      ref={ref}
      className={clsx(
        'inline-flex items-center',
        'font-medium ',
        colorClsx,
        sizeClsx,
        roundedClsx,
        className,
      )}
      {...rest}
    >
      <BadgeProvider variant={variant} size={size}>
        {leadingIconElement}
        {children}
        {trailingIconElement}
      </BadgeProvider>
    </Component>
  )
})

export type BadgeButtonProps = HTMLTribeProps<'button'>

const BadgeButton: FC<BadgeButtonProps> = props => {
  const { children, className, ...rest } = props

  const { variant } = useBadge()

  const buttonColorClsx = [
    variant === 'primary' &&
      'text-actionPrimary-400 hover:bg-actionPrimary-200 hover:text-actionPrimary-500 focus:outline-none focus:bg-actionPrimary-500 focus:text-actionPrimary-50',
    variant === 'secondary' &&
      'text-basicSurface-400 hover:bg-basicSurface-200 hover:text-basicSurface-500 focus:outline-none focus:bg-basicSurface-500 focus:text-basicSurface-50',
  ]

  return (
    <button
      type="button"
      className={clsx(
        'flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none',
        buttonColorClsx,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

Badge.Button = BadgeButton
