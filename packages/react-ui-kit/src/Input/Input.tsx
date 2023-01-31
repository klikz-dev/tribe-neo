import { forwardRef, ReactNode, Ref, FC } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'
import { Icon, IconProps } from '../Icon'
import { ExclamationCircleIcon } from '../icons'

export type InputProps = React.ComponentProps<'input'> & {
  invalid?: boolean
  leadingIcon?: IconProps
  trailingIcon?: IconProps
  leadingAddon?: string | ReactNode
  trailingAddon?: string | ReactNode
  wrapperClassName?: React.ComponentProps<'input'>['className']
}
/**
 * The Input component is a component that is used to get user input in a text field.
 */
export const Input: FC<InputProps> = forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    const {
      invalid = false,
      disabled,
      leadingIcon,
      trailingIcon,
      leadingAddon,
      trailingAddon,
      className,
      wrapperClassName,
      ...rest
    } = props
    const { backgroundType, backgroundClsx, text400Clsx, text500Clsx } =
      useBackgroundContext()

    const mainClsx = [
      'placeholder-basicMain-300',
      !invalid &&
        'focus:ring-actionPrimary-500 focus:border-actionPrimary-500 border border-neutral-300',
    ]
    const surfaceClsx = [
      'placeholder-basicSurface-300',
      !invalid &&
        'focus:ring-actionPrimary-500 focus:border-actionPrimary-500 border border-neutral-300',
    ]
    const secondaryClsx = [
      'placeholder-basicSecondary-300',
      !invalid &&
        'focus:ring-actionSecondary-600 focus:border-actionSecondary-600 border border-neutral-300',
    ]

    return (
      <div
        className={clsx(
          'flex relative rounded-md shadow-sm isolate w-full',
          wrapperClassName,
        )}
      >
        <div className="flex items-stretch flex-grow focus-within:z-10">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className={clsx('h-5 w-5', text400Clsx)}>
                {leadingIcon}
              </Icon>
            </div>
          )}
          {leadingAddon && (
            <span
              className={clsx(
                'inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-300',
                backgroundClsx,
                text500Clsx,
              )}
            >
              {leadingAddon}
            </span>
          )}

          <input
            ref={ref}
            className={clsx(
              'block w-full rounded-md',
              'px-3 py-2',
              'appearance-none',
              'focus:outline-none focus:ring-1',
              text500Clsx,
              backgroundClsx,
              [
                backgroundType === 'main' && mainClsx,
                backgroundType === 'surface' && surfaceClsx,
                backgroundType === 'secondary' && secondaryClsx,
              ],
              invalid &&
                'pr-10 border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
              disabled && 'opacity-60 cursor-default',
              leadingIcon && 'pl-10',
              trailingIcon && 'pr-10 ',
              leadingAddon &&
                'flex-1 min-w-0 block w-full px-3 py-2 rounded-l-none',
              leadingAddon && !trailingAddon && 'rounded-r-md',
              trailingAddon &&
                'flex-1 min-w-0 block w-full px-3 py-2 rounded-r-none',
              trailingAddon && !leadingAddon && 'rounded-l-md',
              className,
            )}
            type="text"
            disabled={disabled}
            {...rest}
          />
        </div>

        {trailingIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
            <Icon className={clsx('h-5 w-5', text400Clsx)}>{trailingIcon}</Icon>
          </div>
        )}
        {trailingAddon && (
          <span
            className={clsx(
              'inline-flex items-center px-3 rounded-r-md border border-l-0 border-neutral-300',
              backgroundClsx,
              text500Clsx,
            )}
          >
            {trailingAddon}
          </span>
        )}

        {invalid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
            <ExclamationCircleIcon
              className="h-5 w-5 text-danger-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    )
  },
)
