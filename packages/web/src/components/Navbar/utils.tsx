import { ReactNode } from 'react'

import BellIcon from '@heroicons/react/outline/BellIcon'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import NewspaperIcon from '@heroicons/react/outline/NewspaperIcon'
import PlusIcon from '@heroicons/react/outline/PlusIcon'
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import UserCircleIcon from '@heroicons/react/outline/UserCircleIcon'
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import * as BellSolidIcon from '@heroicons/react/solid/BellIcon'
import * as HomeSolidIcon from '@heroicons/react/solid/HomeIcon'
import * as NewspaperSolidIcon from '@heroicons/react/solid/NewspaperIcon'
import * as PlusSolidIcon from '@heroicons/react/solid/PlusIcon'
import * as SearchSolidIcon from '@heroicons/react/solid/SearchIcon'
import * as UserCircleSolidIcon from '@heroicons/react/solid/UserCircleIcon'
import * as UserGroupSolidIcon from '@heroicons/react/solid/UserGroupIcon'
import * as ViewGridSolidIcon from '@heroicons/react/solid/ViewGridIcon'

import { Network } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import {
  NavbarControlItem,
  NavbarControlType,
  NavbarNavigationAction,
  NavbarNavigationItem,
  NavbarStyle,
} from './constants'

const icons = {
  bell: BellIcon,
  plus: PlusIcon,
  home: HomeIcon,
  newspaper: NewspaperIcon,
  search: SearchIcon,
  userCircle: UserCircleIcon,
  userGroup: UserGroupIcon,
  viewGrid: ViewGridIcon,
}

const activeIcons = {
  bell: BellSolidIcon,
  plus: PlusSolidIcon,
  home: HomeSolidIcon,
  newspaper: NewspaperSolidIcon,
  search: SearchSolidIcon,
  userCircle: UserCircleSolidIcon,
  userGroup: UserGroupSolidIcon,
  viewGrid: ViewGridSolidIcon,
}

export const getIcon = (iconName: string, active = false) => {
  if (!iconName) return null
  if (active) return activeIcons[iconName]
  return icons[iconName]
}

export const getOldNavigationItems = (
  network: Network,
): NavbarNavigationItem[] => {
  const { topNavigation } = network || {}
  const { enabled = false, items } = topNavigation || {}

  if (!enabled) return []

  return items
    .filter(item => item.link)
    .map(item => ({
      label: item.text,
      action: NavbarNavigationAction.OPEN_LINK,
      page: null,
      link: item.link,
      openInNewWindow: item.openInNewWindow || false,
      space: null,
    }))
}

export const getCleanNavbarProps = (options: {
  network: Network
  props?: {
    navigationItems?: NavbarNavigationItem[]
    view?: NavbarStyle
  }
}): {
  navigationItems: NavbarNavigationItem[]
  view: NavbarStyle
} => {
  const { network, props = {} } = options
  const { navigationItems: newNavigationItems, view: newView } = props
  const navigationItems: NavbarNavigationItem[] =
    newNavigationItems || getOldNavigationItems(network)

  let view = newView
  if (!view && navigationItems.length) view = NavbarStyle.STACKED
  else if (!view) view = NavbarStyle.DEFAULT

  return {
    navigationItems: newNavigationItems || getOldNavigationItems(network),
    view,
  }
}

export const getNavbarControlPresentation = (options: {
  item: NavbarControlItem
  avatarUrl?: string
  avatarName?: string
  props: Record<string, any>
}): ReactNode => {
  const { item, avatarUrl, avatarName, props } = options
  const Icon = getIcon(item.icon)

  switch (item.type) {
    case NavbarControlType.BUTTON:
      return (
        <Button
          key={item.label}
          trailingIcon={Icon ? <Icon className="h-5 w-5" /> : null}
          {...props}
        >
          {item.showLabel ? item.label : null}
        </Button>
      )
    case NavbarControlType.ICON:
      return (
        <>
          <span className="sr-only">{item.label}</span>
          {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
        </>
      )
    case NavbarControlType.AVATAR:
      return (
        <>
          <span className="sr-only">{item.label}</span>
          <Avatar
            className="h-8 w-8 rounded-full"
            src={avatarUrl}
            name={avatarName}
          />
        </>
      )
    default:
      return null
  }
}
