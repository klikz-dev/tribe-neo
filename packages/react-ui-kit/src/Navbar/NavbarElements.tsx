import { Fragment, ReactNode, FC } from 'react'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { BellIcon, SearchIcon } from '../icons'
import { HTMLTribeProps } from '../system'

export type NavbarProps = {
  user?: NavbarUser
  userNavigation: NavbarNavigationItem[]
  navigation: NavbarNavigationItem[]
  logo: ReactNode
  notifications?: ReactNode
}

export type NavbarSearchProps = React.ComponentProps<'input'>

export const NavbarSearch: FC<NavbarSearchProps> = props => {
  const { className, ...rest } = props

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon
            className="h-5 w-5 text-basicSurface-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className={clsx(
            'block w-full bg-surface-50 border border-neutral-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-neutral-300  sm:text-sm',
            'focus:outline-none focus:text-basicSurface-900 focus:placeholder-neutral-300 focus:ring-1 focus:ring-actionPrimary-500 focus:border-actionPrimary-500',
            className,
          )}
          placeholder="Search..."
          type="search"
          {...rest}
        />
      </div>
    </div>
  )
}

export const NavbarProfileDropdown = ({ user, userNavigation }) => {
  if (!user) {
    return null
  }

  return (
    <Menu as="div" className="flex-shrink-0 relative ml-5">
      <div>
        <Menu.Button className="bg-surface-50 rounded-full flex focus:outline-none focus-visible:ring">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-surface-50 border py-1',
            'focus-visible:ring-1 focus:outline-none',
          )}
        >
          {userNavigation.map(item => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={clsx(
                    active ? 'bg-surface-200' : '',
                    'block py-2 px-4 text-sm text-basicSurface-700',
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export type NavbarNotificationsProps = HTMLTribeProps<'a'>

export const NavbarNotifications: FC<NavbarNotificationsProps> = props => {
  const { as, className, ...rest } = props

  const Component = as || 'a'

  return (
    <Component
      className={clsx(
        'ml-5 flex-shrink-0 bg-surface-50 rounded-full p-1 text-basicSurface-400 hover:text-basicSurface-500',
        'focus:outline-none focus-visible:ring',
        className,
      )}
      {...rest}
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </Component>
  )
}

export type NavbarNavigationItem = {
  name: string
  href?: string
  action?: () => void
  current?: boolean
}
export type NavbarUser = { name: string; email: string; imageUrl: string }

export const NavbarMobileUser = (props: {
  user: NavbarUser
  notifications?: ReactNode
}) => {
  const { user, notifications } = props

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-1 items-center">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-basicSurface-800">
          {user.name}
        </div>
        <div className="text-sm font-medium text-basicSurface-500">
          {user.email}
        </div>
      </div>
      {notifications}
    </div>
  )
}
