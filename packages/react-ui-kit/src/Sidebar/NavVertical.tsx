import { FC } from 'react'

import clsx from 'clsx'

import { Icon, IconProps } from '../Icon'
import { HTMLTribeProps } from '../system'

export type NavVerticalProps = HTMLTribeProps<'nav'> & {
  active?: boolean
  leadingIcon?: IconProps
}

/**
 * Used to create a side navigation
 */
export const NavVertical = (props: NavVerticalProps) => {
  const { as, children, className, ...rest } = props
  const Component = as || 'nav'

  return (
    <Component
      className={clsx('flex-1 space-y-8 isolate', className)}
      aria-label="Sidebar"
      {...rest}
    >
      {children}
    </Component>
  )
}

export type NavVerticalItemProps = HTMLTribeProps<'a'> & {
  active?: boolean
  leadingIcon?: IconProps
}

const NavVerticalItem: FC<NavVerticalItemProps> = props => {
  const {
    children,
    as,
    leadingIcon,
    active = false,
    className,
    ...rest
  } = props
  const Component = as || 'a'

  return (
    <Component
      className={clsx(
        active
          ? 'bg-main-200 text-basicMain-900'
          : 'text-basicMain-600 hover:bg-main-100 hover:text-basicMain-900',
        'group flex items-center px-3 py-2 leading-5 rounded-md',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {leadingIcon && (
        <Icon
          className={clsx(
            active
              ? 'text-basicMain-500'
              : 'text-basicMain-400 group-hover:text-basicMain-600',
            'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
          )}
          aria-hidden="true"
        >
          {leadingIcon}
        </Icon>
      )}
      {typeof children === 'string' ? (
        <span className="truncate">{children}</span>
      ) : (
        children
      )}
    </Component>
  )
}

const NavVerticalItemSecondary: FC<NavVerticalItemProps> = props => {
  const { children, leadingIcon, active = false, className, ...rest } = props

  return (
    <a
      className={clsx(
        'group flex items-center px-3 py-2 text-basicMain-600 leading-none rounded-md hover:text-basicMain-900 hover:bg-main-100',
        'focus:outline-none focus-visible:ring',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {leadingIcon && (
        <Icon
          className={clsx(
            active
              ? 'text-basicMain-500'
              : 'text-basicMain-400 group-hover:text-basicMain-600',
            'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
          )}
          aria-hidden="true"
        >
          {leadingIcon}
        </Icon>
      )}
      <span className="truncate">{children}</span>
    </a>
  )
}

export type NavVerticalGroupProps = HTMLTribeProps<'div'>

export const NavVerticalGroup: FC<NavVerticalGroupProps> = props => {
  const { children, className, ...rest } = props

  return (
    <div className={clsx('space-y-1', className)} role="group" {...rest}>
      {children}
    </div>
  )
}

export type NavVerticalGroupHeaderProps = HTMLTribeProps<'h3'>

export const NavVerticalGroupHeader: FC<
  NavVerticalGroupHeaderProps
> = props => {
  const { children, className, ...rest } = props

  return (
    <h3
      className={clsx(
        'px-3 text-sm font-semibold text-basicMain-500 uppercase tracking-wider',
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  )
}

NavVertical.Item = NavVerticalItem
NavVertical.ItemSecondary = NavVerticalItemSecondary

NavVertical.Group = NavVerticalGroup
NavVertical.GroupHeader = NavVerticalGroupHeader
