import { Transition } from '@headlessui/react'
import { matchPath, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { Image } from '@tribeplatform/gql-client/types'
import { useNetwork } from '@tribeplatform/react-sdk/hooks'
import { Sidebar } from '@tribeplatform/react-ui-kit/Sidebar'

import { AppsSidebarContent } from './AppsSidebarContent'
import { MainSidebarContent } from './MainSidebarContent'

export const AdminSidebar = () => {
  const location = useLocation()

  const apps = matchPath(location.pathname, {
    path: '/admin/network/apps',
    exact: false,
    strict: false,
  })

  const { data: network } = useNetwork()
  return (
    <Sidebar className="h-screen overflow-auto">
      <Sidebar.Header>
        <Link to="/">
          <img
            className="h-8 w-auto"
            src={
              (network?.logo as Image)?.urls?.small ||
              '/images/default-logo.png'
            }
            alt={network?.name}
          />
        </Link>
      </Sidebar.Header>
      <Sidebar.Content>
        <Transition
          show={!!apps}
          enter="duration-300 absolute z-20"
          enterFrom="-ml-64"
          enterTo="ml-0"
          leave="duration-300 absolute z-20"
          leaveFrom="ml-0"
          leaveTo="-ml-64"
          className="h-full bg-surface-50 w-64"
        >
          <AppsSidebarContent />
        </Transition>
        <Transition show={!apps} leave="duration-300">
          <MainSidebarContent />
        </Transition>
      </Sidebar.Content>
    </Sidebar>
  )
}
