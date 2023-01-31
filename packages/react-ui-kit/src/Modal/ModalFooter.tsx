import { FC } from 'react'

import clsx from 'clsx'

export type ModalFooterProps = React.ComponentProps<'div'> & {
  withBorder?: boolean
}

export const ModalFooter: FC<ModalFooterProps> = props => {
  const { withBorder = false, children, className, ...rest } = props

  return (
    <div
      className={clsx(
        'px-4 py-5 sm:p-6',
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

export const ModalActions: FC<ModalFooterProps> = props => {
  const { withBorder = false, children, className, ...rest } = props

  return (
    <div
      className={clsx(
        'px-4 py-5 sm:p-6',
        'flex flex-row-reverse space-x-2 space-x-reverse',
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
