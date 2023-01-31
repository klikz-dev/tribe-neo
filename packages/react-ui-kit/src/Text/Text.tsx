import { FC } from 'react'

import clsx from 'clsx'

import { HTMLTribeProps } from '../system'

export type TextAlign = 'leading' | 'center' | 'trailing'
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type TextProps = HTMLTribeProps<'span'> & {
  align?: TextAlign
  size?: TextSize
  truncate?: boolean
}

export const Text: FC<TextProps> = props => {
  const {
    align = 'leading',
    size = 'md',
    as,
    className,
    truncate,
    children,
    ...rest
  } = props
  const Component = as || 'span'

  return (
    <Component
      className={clsx(
        [
          align === 'leading' && 'text-left',
          align === 'center' && 'text-center',
          align === 'trailing' && 'text-right',
        ],
        [
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-xl',
          size === '2xl' && 'text-2xl',
        ],
        truncate && 'truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
