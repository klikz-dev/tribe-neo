import { useState } from 'react'

import { Transition } from '@headlessui/react'
import MenuIcon from '@heroicons/react/outline/MenuIcon'
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import XIcon from '@heroicons/react/outline/XIcon'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { Image } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { BackgroundProvider } from '@tribeplatform/react-ui-kit/BackgroundContext'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { useSlate } from '@tribeplatform/slate-kit/hooks'

import { useMobileSidebar } from '../../MobileSidebarProvider'
import { Logo } from '../Logo'
import { SearchBar } from '../Search/SearchBar'
import { NavbarStyle } from './constants'
import { NavbarControl } from './controls/NavbarControl'
import { EmailVerificationBanner } from './EmailVerificationBanner'
import { NavbarNavigation } from './navigations/NavbarNavigation'
import { NavbarSettings } from './settings/NavbarSettings'
import { getCleanNavbarProps } from './utils'

export const Navbar = ({
  query,
  view: newView,
  navigationItems: newNavigationItems,
  controlItems,
}) => {
  const { data: authToken } = useAuthToken()
  const { networkPublicInfo } = authToken || {}
  const { mobileSidebar, mobileSidebarOpen, setMobileSidebarOpen } =
    useMobileSidebar()
  const { context } = useSlate()
  const { mobileSidebarEnable = true } = context
  const [showSearch, setShowSearch] = useState(false)

  const { view, navigationItems } = getCleanNavbarProps({
    network: context.network,
    props: { view: newView, navigationItems: newNavigationItems },
  })

  const showSearchIcon =
    view === NavbarStyle.STACKED || !navigationItems?.length

  return (
    <div className="bg-actionSecondary-50 text-basicSecondary-500 shadow-sm lg:overflow-y-visible">
      <EmailVerificationBanner />
      <BackgroundProvider backgroundType="secondary">
        {view === NavbarStyle.STACKED ? (
          <div className="hidden lg:flex bg-actionSecondary-100">
            <div className="flex items-center h-10 max-w-8xl w-full space-x-5 mx-auto px-4 lg:px-8">
              <NavbarNavigation navigationItems={navigationItems} />
            </div>
          </div>
        ) : null}
        <div className="max-w-8xl mx-auto px-3 lg:px-8">
          {showSearch ? (
            <div className="relative h-16 flex justify-between items-center space-x-2 px-2">
              <SearchBar autoFocus query={query} />
              <div className="flex-shrink-0">
                <Link
                  className="p-2 block"
                  to="#"
                  onClick={e => {
                    setShowSearch(false)
                    e.preventDefault()
                  }}
                >
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 h-16 gap-5">
              <div className="flex overflow-hidden items-center lg:col-span-3 col-span-5">
                {mobileSidebarEnable && (
                  <Link
                    onClick={() => setMobileSidebarOpen(true)}
                    to="#"
                    className="lg:hidden mr-3"
                  >
                    <MenuIcon className="h-8 w-8" aria-hidden="true" />
                  </Link>
                )}
                <Link to="/">
                  <Logo
                    src={(networkPublicInfo?.logo as Image)?.urls?.small}
                    alt={networkPublicInfo?.name}
                  />
                </Link>
                {!mobileSidebarEnable && (
                  <div className="h-8 w-8 lg:hidden flex-shrink-0 ml-3">
                    &nbsp;
                  </div>
                )}
              </div>
              <div className="hidden lg:flex flex-grow lg:col-span-6 space-x-4">
                {navigationItems?.length && view === NavbarStyle.DEFAULT ? (
                  <div className="flex flex-grow items-center space-x-4 justify-center">
                    <NavbarNavigation navigationItems={navigationItems} />
                  </div>
                ) : (
                  <SearchBar query={query} />
                )}
              </div>
              <div className="flex items-center space-x-4 lg:col-span-3 col-span-7 justify-end">
                <Button
                  variant="outline"
                  rounded
                  className={clsx(
                    showSearchIcon && 'lg:hidden',
                    'w-10 h-10 px-0 justify-center flex-shrink-0',
                  )}
                  onClick={() => setShowSearch(true)}
                >
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
                <NavbarControl controlItems={controlItems} />
              </div>
            </div>
          )}
        </div>
      </BackgroundProvider>
      <Transition show={mobileSidebarEnable && mobileSidebarOpen}>
        <Transition.Child
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="z-10 fixed inset-0 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-200 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="z-10 fixed inset-y-0 left-0 max-w-xs w-full bg-surface-50 px-3 py-4 overflow-y-auto"
        >
          <Link onClick={() => setMobileSidebarOpen(false)} to="#">
            <XIcon className="h-8 w-8 mb-5" aria-hidden="true" />
          </Link>
          {mobileSidebar}
          {navigationItems?.length ? (
            <div className="flex flex-col w-full space-y-5 px-3">
              <Divider />
              <h4>Navigation</h4>
              <NavbarNavigation navigationItems={navigationItems} />
            </div>
          ) : null}
        </Transition.Child>
      </Transition>
    </div>
  )
}

Navbar.displayName = 'Navbar'
Navbar.Settings = NavbarSettings
