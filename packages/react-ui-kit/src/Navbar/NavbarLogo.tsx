import { FC } from 'react'

import clsx from 'clsx'

import { HTMLTribeProps } from '../system'

export type NavbarLogoProps = HTMLTribeProps<'div'> & {
  src?: string | null
  srcMobile?: string | null
  name?: string
}

const initials = (name: string) => {
  const [firstName, lastName] = name.split(' ')
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

export const NavbarLogo: FC<NavbarLogoProps> = props => {
  const { as, name, className, src, srcMobile, ...rest } = props

  const Component = as || 'div'

  return (
    <Component
      className={clsx(
        'max-w-sm max-h-8',
        'focus-visible:outline-none focus-visible:ring',
        className,
      )}
      {...rest}
    >
      {srcMobile || src ? (
        <>
          <img
            className="block lg:hidden h-8 w-auto object-contain"
            src={srcMobile || src}
            alt={name}
          />
          <img
            className="hidden lg:block h-8 w-auto object-contain"
            src={src || srcMobile}
            alt={name}
          />
        </>
      ) : (
        <span
          className={clsx(
            'inline-flex h-8 w-8 items-center justify-center bg-main-50',
          )}
        >
          <span className="font-bold text-lg text-basicMain-500">
            {name ? initials(name) : null}
          </span>
        </span>
      )}
    </Component>
  )
}
