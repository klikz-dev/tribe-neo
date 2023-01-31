import { FC } from 'react'

import clsx from 'clsx'

import { useCard } from './CardContext'

export type CardFooterProps = React.ComponentProps<'div'> & {
  withBorder?: boolean
}

export const CardFooter: FC<CardFooterProps> = props => {
  const { withBorder = false, children, className, ...rest } = props
  const { padding } = useCard()

  return (
    <div
      className={clsx(
        padding === 'md' && 'px-4 py-5 sm:p-6 ',
        padding === 'sm' && 'px-4 py-5 sm:px-3',
        !withBorder && 'pt-0 sm:pt-0',
        withBorder && 'border-t border-neutral-200',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export const CardActions: FC<CardFooterProps> = props => {
  const { withBorder = false, children, className, ...rest } = props
  const { padding } = useCard()

  return (
    <div
      className={clsx(
        padding === 'md' && 'px-4 py-5 sm:p-6 ',
        padding === 'sm' && 'px-4 py-5 sm:px-3',
        'sm:flex sm:flex-row-reverse space-x-2 space-x-reverse',
        !withBorder && 'pt-0 sm:pt-0',
        withBorder && 'border-t border-neutral-200',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
