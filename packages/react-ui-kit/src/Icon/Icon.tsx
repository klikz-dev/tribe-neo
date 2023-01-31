import { cloneElement, ComponentProps, FC, isValidElement } from 'react'

import clsx from 'clsx'

export type IconProps = ComponentProps<'svg'>

export const Icon: FC<IconProps> = props => {
  const { children, className, ...rest } = props

  return isValidElement(children) ? (
    cloneElement(children, {
      'aria-hidden': true,
      focusable: false,
      className: clsx(className, children?.props?.className),
      ...rest,
    })
  ) : (
    <>{children}</>
  )
}
