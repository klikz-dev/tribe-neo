import { ComponentProps, FC } from 'react'

import clsx from 'clsx'

export type FormActionsProps = ComponentProps<'div'>

export const FormActions: FC<FormActionsProps> = props => {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx(
        'flex flex-row-reverse space-x-2 space-x-reverse',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
