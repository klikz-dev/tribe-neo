import { Transition } from '@headlessui/react'
import MenuIcon from '@heroicons/react/outline/MenuIcon'
import XIcon from '@heroicons/react/outline/XIcon'
import clsx from 'clsx'
import { Link as RouterLink, useRoute } from 'wouter'

import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { TribeLogo } from '../../icons/svg'
import { useMobileSidebar } from '../../MobileSidebarProvider'
import { AuthOptions } from '../AuthOptions'

export const Navbar = () => {
  const { mobileSidebar, mobileSidebarOpen, setMobileSidebarOpen } =
    useMobileSidebar()
  const [match] = useRoute('/apps/:appSlug/:section')
  const mobileSidebarEnable = match

  return (
    <div className="bg-actionSecondary-500 text-basicSecondary-500 shadow-sm lg:overflow-y-visible">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        <div className="relative h-16 flex justify-between space-x-4">
          <div className="flex items-center flex-shrink-0 space-x-4">
            <Transition
              show={mobileSidebarEnable && !mobileSidebarOpen}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-0"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-0"
              leaveTo="opacity-0"
              className="absolute left-0 z-20 lg:hidden text-basicSecondary-400"
            >
              <MenuIcon
                className="h-8 w-8"
                aria-hidden="true"
                onClick={() => setMobileSidebarOpen(true)}
              />
            </Transition>
            <Transition
              show={mobileSidebarEnable && mobileSidebarOpen}
              enter="ease-in duration-300 transform"
              enterFrom="-rotate-90"
              enterTo="rotate-0"
              leave="ease-in duration-200 transform"
              leaveFrom="rotate-0"
              leaveTo="-rotate-90"
              className="absolute left-0 z-20 lg:hidden  text-basicSurface-500"
            >
              <XIcon
                className="h-8 w-8"
                aria-hidden="true"
                onClick={() => setMobileSidebarOpen(false)}
              />
            </Transition>
            <div
              className={clsx(
                'w-8 lg:hidden',
                !mobileSidebarEnable && 'hidden',
              )}
            />
            <div className="flex">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <Link href="/" as={RouterLink} data-testid="navbar-logo">
                  <TribeLogo />
                </Link>
                for Devs
                <Badge size="md" rounded variant="secondary">
                  beta
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <AuthOptions />
          </div>
        </div>
        <Transition show={mobileSidebarEnable && mobileSidebarOpen}>
          <Transition.Child
            enter="transition-opacity duration-300"
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
            enter="ease-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="z-10 fixed inset-y-0 left-0 max-w-xs w-full bg-surface-50"
          >
            <div className="absolute inset-x-0 top-16 bottom-0 pl-4 pr-4 pb-4 overflow-y-auto">
              {mobileSidebar}
            </div>
          </Transition.Child>
        </Transition>
      </div>
    </div>
  )
}
