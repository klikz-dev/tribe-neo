import { ReactNode } from 'react'

import { Popover } from '@headlessui/react'
import clsx from 'clsx'

import { MenuIcon, XIcon } from '../icons'
import {
  NavbarProps,
  NavbarProfileDropdown,
  NavbarMobileUser,
} from './NavbarElements'

export type NavbarWithSearchProps = NavbarProps & {
  search: ReactNode
  action: ReactNode
}
export const NavbarWithSearch = (props: NavbarWithSearchProps) => {
  const {
    logo,
    search,
    action,
    user,
    notifications,
    userNavigation,
    navigation,
  } = props

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          clsx(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-surface-50 shadow-sm lg:static lg:overflow-y-visible',
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">{logo}</div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    {search}
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-basicSurface-400 hover:bg-surface-200 hover:text-basicSurface-500 focus:outline-none focus:ring">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  {action}

                  {notifications}

                  <NavbarProfileDropdown
                    user={user}
                    userNavigation={userNavigation}
                  />
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={clsx(
                      item.current
                        ? 'bg-surface-200 text-basicSurface-900'
                        : 'hover:bg-surface-100',
                      'block rounded-md py-2 px-3 text-base font-medium',
                      'focus:outline-none focus-visible:ring',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                  <NavbarMobileUser user={user} notifications={notifications} />
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'block rounded-md py-2 px-3 text-base font-medium text-basicSurface-500 hover:bg-surface-100 hover:text-basicSurface-900',
                        'focus:outline-none focus-visible:ring',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  )
}
