import { ReactNode } from 'react'

import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'

import { MenuIcon, XIcon } from '../icons'
import {
  NavbarMobileUser,
  NavbarProfileDropdown,
  NavbarProps,
} from './NavbarElements'

export type NavbarSimpleProps = NavbarProps & {
  action?: ReactNode
}
export const NavbarSimple = (props: NavbarSimpleProps) => {
  const { logo, action, user, notifications, userNavigation, navigation } =
    props

  return (
    <Disclosure as="nav" className="bg-surface-50 shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-basicSurface-400 hover:text-basicSurface-500 hover:bg-surface-200 focus:outline-none focus:ring">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">{logo}</div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={clsx(
                        item.current
                          ? 'border-actionPrimary-300 text-basicSurface-900'
                          : 'border-transparent text-basicSurface-500 hover:border-neutral-300 hover:text-basicSurface-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                        'focus:outline-none focus-visible:ring',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {action && <div className="flex-shrink-0">{action}</div>}

                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {notifications}

                  <NavbarProfileDropdown
                    user={user}
                    userNavigation={userNavigation}
                  />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={clsx(
                    item.current
                      ? 'bg-actionPrimary-50 border-actionPrimary-500 text-actionPrimary-700'
                      : 'border-transparent text-basicSurface-500 hover:bg-surface-100 hover:border-neutral-300 hover:text-basicSurface-700',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6',
                    'focus:outline-none focus-visible:ring',
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-neutral-200">
              <div className="flex items-center px-4 sm:px-6">
                <NavbarMobileUser user={user} notifications={notifications} />
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'block px-4 py-2 text-base font-medium text-basicSurface-500 hover:text-basicSurface-800 hover:bg-surface-200 sm:px-6',
                      'focus:outline-none focus-visible:ring',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
