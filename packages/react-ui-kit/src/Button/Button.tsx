import { forwardRef } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'
import { Icon, IconProps } from '../Icon'
import { SpinnerIcon } from '../icons'
import { HTMLTribeProps } from '../system'

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'outline',
  'danger',
] as const
export type ButtonVariant = typeof BUTTON_VARIANTS[number]

export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type ButtonSize = typeof BUTTON_SIZES[number]

export type ButtonProps = HTMLTribeProps<'button'> & {
  variant?: ButtonVariant
  /**
   * Use the size prop to change the size of the button.
   * @default md
   */
  size?: ButtonSize
  fullWidth?: boolean
  rounded?: boolean
  disabled?: boolean
  loading?: boolean
  leadingIcon?: IconProps
  trailingIcon?: IconProps
}
/**
 * The Button component is used to trigger an action or event, such as submitting a form, opening a dialog,
 * canceling an action, or performing a delete operation.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      as,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      rounded = false,
      disabled = false,
      loading = false,
      className,
      children,
      leadingIcon,
      trailingIcon,
      ...rest
    } = props
    const { backgroundType } = useBackgroundContext()

    const sizeClsx = [
      'font-medium shadow-sm',
      size === 'xs' && 'px-2.5 py-1.5 text-xs',
      size === 'sm' && 'px-3 py-2 text-sm leading-4',
      size === 'md' && 'px-4 py-2 text-sm',
      size === 'lg' && 'px-4 py-2 text-base',
      size === 'xl' && 'px-6 py-3 text-base',
    ]
    const roundedSizeClsx = [
      'font-medium shadow-sm',
      size === 'xs' && 'px-1.5 py-1.5 text-xs',
      size === 'sm' && 'px-2 py-2 text-sm leading-4',
      size === 'md' && 'px-2 py-2 text-sm',
      size === 'lg' && 'px-2 py-2 text-base',
      size === 'xl' && 'px-3 py-3 text-base',
    ]

    const textColorClsx = [
      variant === 'primary' && 'text-basicPrimary-500',
      variant === 'secondary' && 'text-basicSecondary-500',
      variant === 'outline' && [
        backgroundType === 'main' && 'text-basicMain-500',
        backgroundType === 'surface' && 'text-basicSurface-500',
        backgroundType === 'secondary' && 'text-basicSecondary-500',
      ],
      variant === 'danger' && 'text-white',
    ]

    const outlineBgClsx = [
      backgroundType === 'main' && 'bg-main-50 hover:bg-main-100',
      backgroundType === 'surface' && 'bg-surface-50 hover:bg-surface-100',
      backgroundType === 'secondary' &&
        'bg-actionSecondary-50 hover:bg-actionSecondary-100',
    ]

    const variantClsx = [
      'border',
      variant === 'primary' &&
        'border-transparent bg-actionPrimary-600 hover:bg-actionPrimary-700',
      variant === 'secondary' &&
        'border-transparent bg-actionSecondary-100 hover:bg-actionSecondary-200',
      variant === 'outline' && ['border-neutral-300', outlineBgClsx],
      variant === 'danger' &&
        'border-transparent bg-danger-600 hover:bg-danger-700 focus:ring-danger-500',
    ]

    const roundedClsx = [
      !rounded && size === 'xs' && 'rounded',
      !rounded && size !== 'xs' && 'rounded-md',
      rounded && 'rounded-full ',
    ]

    const contentProps = { trailingIcon, leadingIcon, size, children }

    const Component = as || 'button'

    return (
      <Component
        ref={ref}
        type={as ? undefined : 'button'}
        className={clsx(
          'inline-flex items-center relative',
          'focus:outline-none focus-visible:ring',
          textColorClsx,
          variantClsx,
          !rounded ? sizeClsx : roundedSizeClsx,
          roundedClsx,
          fullWidth && 'w-full block justify-center',
          disabled && 'opacity-60 cursor-default pointer-events-none',
          loading && 'opacity-60 cursor-default pointer-events-none',
          className,
        )}
        {...rest}
      >
        <>
          {loading && (
            <div className="absolute inline-flex left-0 right-0 justify-center">
              <SpinnerIcon className="animate-spin" />
            </div>
          )}
          <span className={clsx('flex', { invisible: loading })}>
            <ButtonContent {...contentProps} />
          </span>
        </>
      </Component>
    )
  },
)

type ButtonContentProps = Pick<
  ButtonProps,
  'leadingIcon' | 'trailingIcon' | 'children' | 'size'
>

const ButtonContent = (props: ButtonContentProps) => {
  const { leadingIcon, trailingIcon, children, size } = props

  const iconSizeClsx = [
    ['xs', 'sm'].includes(size) && 'h-4 w-4',
    ['md'].includes(size) && 'h-5 w-5',
    ['lg', 'xl'].includes(size) && 'h-5 w-5',
  ]

  const leadingIconPaddingClsx = [
    ['xs', 'sm'].includes(size) && '-ml-0.5 mr-2',
    ['md'].includes(size) && '-ml-1 mr-2',
    ['lg', 'xl'].includes(size) && '-ml-1 mr-3',
  ]

  const trailingIconPaddingClsx = [
    ['xs', 'sm'].includes(size) && 'ml-2 -mr-0.5',
    ['md'].includes(size) && 'ml-2 -mr-1 ',
    ['lg', 'xl'].includes(size) && 'ml-3 -mr-1 ',
  ]

  return (
    <span className="inline-flex items-center">
      {leadingIcon && (
        <Icon
          className={clsx(iconSizeClsx, !!children && leadingIconPaddingClsx)}
        >
          {leadingIcon}
        </Icon>
      )}
      {children}
      {trailingIcon && (
        <Icon
          className={clsx(iconSizeClsx, !!children && trailingIconPaddingClsx)}
        >
          {trailingIcon}
        </Icon>
      )}
    </span>
  )
}
