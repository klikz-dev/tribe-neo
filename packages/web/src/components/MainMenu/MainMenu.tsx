import { generatePath, matchPath, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { Page } from '@tribeplatform/gql-client/types'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'
import { useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { useMobileSidebar } from '../../MobileSidebarProvider'
import { defaultPages } from '../../page-builder/default-pages'
import { mergePages } from '../../page-builder/utils'
import { getPagePermissions } from '../../utils/page.permissions'
import {
  MainMenuAction,
  mainMenuActiveIcons,
  mainMenuDefaultItems,
  mainMenuIcons,
  MainMenuItem,
} from './constants'
import { MainMenuSettings } from './settings/MainMenuSettings'

export type MainMenuProps = {
  items?: MainMenuItem[]
}

export const MainMenu = ({ items = [] }: MainMenuProps) => {
  const { setMobileSidebarOpen } = useMobileSidebar()
  const { context } = useSlateKit()
  const { data: authMember } = useAuthMember()
  const location = useLocation()
  const { network } = context
  const memberId = authMember?.id
  const pagePermissions = getPagePermissions({
    network,
    roleType: authMember?.role?.type,
  })
  const pages = mergePages(defaultPages, network?.pages)

  if (!items?.length) {
    items = [...mainMenuDefaultItems]
  }
  return (
    <NavVertical className="mb-5">
      <NavVertical.Group>
        {items
          .map(item => {
            if (!item.enabled) return null
            const IconComponent = mainMenuIcons[item.icon]
            const ActiveIconComponent = mainMenuActiveIcons[item.icon]
            let page: Page
            let matched
            let isActive: boolean

            switch (item.action) {
              case MainMenuAction.OPEN_LINK:
                return (
                  <NavVertical.Item
                    key={item.label}
                    as={Link}
                    to={item.link}
                    active={false}
                    leadingIcon={<IconComponent />}
                    target="_blank"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    {item.label}
                  </NavVertical.Item>
                )
              case MainMenuAction.OPEN_PROFILE:
                if (!pagePermissions.profile) return null
                page = pages?.find(page => page.slug === 'member')
                matched = matchPath(location.pathname, {
                  path: page.address.path,
                  exact: page.address.exact,
                  strict: false,
                })
                isActive = matched && matched?.params?.id === memberId
                return (
                  <NavVertical.Item
                    key={item.label}
                    as={Link}
                    to={generatePath(page.address.path, { id: memberId })}
                    active={isActive}
                    leadingIcon={
                      isActive ? <ActiveIconComponent /> : <IconComponent />
                    }
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    {item.label}
                  </NavVertical.Item>
                )
              case MainMenuAction.OPEN_PAGE:
                page = pages?.find(page => page.slug === item.page)
                if (!page || pagePermissions[page?.slug] === false) return null
                matched = matchPath(location.pathname, {
                  path: page.address.path,
                  exact: page.address.exact,
                  strict: false,
                })
                return (
                  <NavVertical.Item
                    key={item.label}
                    as={Link}
                    to={page.address.path}
                    active={!!matched}
                    leadingIcon={
                      matched ? <ActiveIconComponent /> : <IconComponent />
                    }
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    {item.label}
                  </NavVertical.Item>
                )
              default:
                return null
            }
          })
          .filter(item => item)}
      </NavVertical.Group>
    </NavVertical>
  )
}

MainMenu.displayName = 'Main Menu'
MainMenu.Settings = MainMenuSettings
