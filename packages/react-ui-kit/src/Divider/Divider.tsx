import { FC } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'

export const DIVIDER_PADDINGS = ['none', 'sm', 'md', 'lg'] as const
export type DividerPadding = typeof DIVIDER_PADDINGS[number]

export type DividerProps = React.ComponentProps<'div'> & {
  padding?: DividerPadding
}
/**
 * Dividers are used to visually separate content in a list or group.
 */
export const Divider: FC<DividerProps> = props => {
  const { children, className, padding = 'md', ...rest } = props

  const { backgroundClsx, text400Clsx } = useBackgroundContext()

  return (
    <div
      className={clsx([
        'relative',
        padding === 'none' && 'py-0',
        padding === 'sm' && 'py-2',
        padding === 'md' && 'py-4',
        padding === 'lg' && 'py-6',
        className,
      ])}
      {...rest}
    >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-neutral-300" />
      </div>
      {children && (
        <div className="relative flex justify-center">
          <span className={clsx('px-2', backgroundClsx, text400Clsx)}>
            {children}
          </span>
        </div>
      )}
    </div>
  )
}
