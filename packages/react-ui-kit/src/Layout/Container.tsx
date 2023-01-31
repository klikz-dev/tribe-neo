import { FC } from 'react'

import clsx from 'clsx'

import { HTMLTribeProps } from '../system'

export type ContainerSize = 'md' | 'sm'

export type ContainerProps = HTMLTribeProps<'div'> & {
  size?: ContainerSize
}
/**
 * Containers are used to constrain a content's width to the current breakpoint, while keeping it fluid.
 */
export const Container: FC<ContainerProps> = props => {
  const { as, children, className, size = 'md', ...rest } = props

  const sizeClsx = {
    'max-w-8xl ': size === 'md',
    'max-w-3xl': size === 'sm',
  }

  const Component = as || 'div'

  return (
    <Component
      className={clsx(sizeClsx, 'mx-auto sm:px-6 lg:px-8', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
