import { forwardRef, Ref, FC } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'

export type CheckboxProps = React.ComponentProps<'input'> & {
  invalid?: boolean
  placement?: 'start' | 'end'
}
/**
 * The Checkbox component is used in forms when a user needs to select multiple values from several options.
 */
export const Checkbox: FC<CheckboxProps> = forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    const {
      invalid = false,
      disabled,
      placement = 'start',
      children,
      className,
      ...rest
    } = props
    const { text500Clsx } = useBackgroundContext()

    const input = (
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          ' h-4 w-4 rounded',
          'text-actionPrimary-600',
          'focus:outline-none focus:ring-transparent',
          !invalid && 'focus-visible:ring-actionPrimary-500 border-neutral-300',
          invalid &&
            'border-danger-300 focus-visible:ring-danger-500 focus:border-danger-500',
          disabled && 'opacity-60 cursor-default',
          className,
        )}
        disabled={disabled}
        {...rest}
      />
    )

    if (placement === 'start') {
      return (
        <label className="relative flex items-start">
          <div className="flex items-center h-5">{input}</div>
          <div
            className={clsx(
              'ml-3 text-sm',
              text500Clsx,
              disabled && 'opacity-60 cursor-default',
            )}
          >
            {children}
          </div>
        </label>
      )
    }
    return (
      <label className="relative flex items-start">
        <div
          className={clsx(
            'min-w-0 flex-1 text-sm',
            text500Clsx,
            disabled && 'opacity-60 cursor-default',
          )}
        >
          {children}
        </div>
        <div className="ml-3 flex items-center h-5">{input}</div>
      </label>
    )
  },
)
