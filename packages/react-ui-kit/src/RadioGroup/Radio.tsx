import { FC } from 'react'

import clsx from 'clsx'

import { runIfFn } from '../utils'

export type RadioProps = React.ComponentProps<'input'> & {
  active?: boolean
  checked?: boolean
}
export const Radio: FC<RadioProps> = props => {
  const {
    active = false,
    checked = false,
    disabled,
    children,
    className,
    ...rest
  } = props

  return (
    <div className="relative flex focus:outline-none">
      <span
        className={clsx(
          checked
            ? 'bg-actionPrimary-600 border-transparent'
            : 'bg-surface-50 border-neutral-300',
          active ? 'ring-2 ring-offset-2 ring-actionPrimary-500' : '',
          'h-4 w-4 mt-0.5 rounded-full border flex items-center justify-center',
          !disabled && 'cursor-pointer ',
          disabled && 'opacity-60 cursor-default',
          className,
        )}
        aria-hidden="true"
        {...rest}
      >
        <span className="rounded-full bg-surface-50 w-1.5 h-1.5" />
      </span>
      <div className="ml-3 flex flex-1 flex-col">
        {runIfFn(children, {
          checked,
          active,
          disabled,
        })}
      </div>
    </div>
  )
}
