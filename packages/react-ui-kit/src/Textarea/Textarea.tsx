import { forwardRef, FC } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'
import { ExclamationCircleIcon } from '../icons'

export type TextareaProps = React.ComponentProps<'textarea'> & {
  invalid?: boolean
}
/**
 * The Textarea component allows you to easily create multi-line text inputs.
 */
export const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  const { invalid = false, className, disabled, ...rest } = props

  const { backgroundType, backgroundClsx, text500Clsx } = useBackgroundContext()

  const placeholderClsx = [
    backgroundType === 'main' && 'placeholder-basicMain-300',
    backgroundType === 'surface' && 'placeholder-basicSurface-300',
    backgroundType === 'secondary' && 'placeholder-basicSecondary-300',
  ]

  return (
    <div className="flex relative rounded-md shadow-sm">
      <textarea
        ref={ref}
        className={clsx(
          ' block w-full rounded-md',
          text500Clsx,
          backgroundClsx,
          placeholderClsx,
          !invalid &&
            'focus:ring-actionPrimary-500 focus:border-actionPrimary-500 border-neutral-300',
          invalid &&
            'pr-10 border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
          disabled && 'opacity-60 cursor-default',
          className,
        )}
        rows={4}
        disabled={disabled}
        {...rest}
      />

      {invalid && (
        <div className="absolute top-0 right-0 pr-3 pt-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-danger-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
})
