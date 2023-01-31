import { cloneElement, ComponentProps, FC } from 'react'

import clsx from 'clsx'

import { getValidChildren } from '../utils'
import { ButtonSize } from './Button'

export type ButtonGroupProps = ComponentProps<'div'> & {
  size?: ButtonSize
}

export const ButtonGroup: FC<ButtonGroupProps> = props => {
  const { size = 'md', className, children, ...rest } = props

  const variant = 'outline'

  const validChildren = getValidChildren(children)

  const clones = validChildren.map(child => {
    const childProps = {
      variant,
      size,
      className:
        'rounded-l-none rounded-r-none  first:rounded-l-md last:rounded-r-md -ml-px  focus:z-10',
    }

    return cloneElement(child, childProps)
  })

  return (
    <span
      className={clsx(
        'relative isolate z-0 inline-flex shadow-sm rounded-md',
        className,
      )}
      {...rest}
    >
      {clones}
    </span>
  )
}
