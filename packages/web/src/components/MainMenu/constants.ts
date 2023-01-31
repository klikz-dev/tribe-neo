import BellIcon from '@heroicons/react/outline/BellIcon'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import NewspaperIcon from '@heroicons/react/outline/NewspaperIcon'
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import UserCircleIcon from '@heroicons/react/outline/UserCircleIcon'
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import * as BellSolidIcon from '@heroicons/react/solid/BellIcon'
import * as HomeSolidIcon from '@heroicons/react/solid/HomeIcon'
import * as NewspaperSolidIcon from '@heroicons/react/solid/NewspaperIcon'
import * as SearchSolidIcon from '@heroicons/react/solid/SearchIcon'
import * as UserCircleSolidIcon from '@heroicons/react/solid/UserCircleIcon'
import * as UserGroupSolidIcon from '@heroicons/react/solid/UserGroupIcon'
import * as ViewGridSolidIcon from '@heroicons/react/solid/ViewGridIcon'

export const enum MainMenuIcon {
  BellIcon = 'BellIcon',
  HomeIcon = 'HomeIcon',
  NewspaperIcon = 'NewspaperIcon',
  SearchIcon = 'SearchIcon',
  UserCircleIcon = 'UserCircleIcon',
  UserGroupIcon = 'UserGroupIcon',
  ViewGridIcon = 'ViewGridIcon',
}

export const mainMenuIcons = {
  [MainMenuIcon.BellIcon]: BellIcon,
  [MainMenuIcon.HomeIcon]: HomeIcon,
  [MainMenuIcon.NewspaperIcon]: NewspaperIcon,
  [MainMenuIcon.SearchIcon]: SearchIcon,
  [MainMenuIcon.UserCircleIcon]: UserCircleIcon,
  [MainMenuIcon.UserGroupIcon]: UserGroupIcon,
  [MainMenuIcon.ViewGridIcon]: ViewGridIcon,
}

export const mainMenuActiveIcons = {
  [MainMenuIcon.BellIcon]: BellSolidIcon,
  [MainMenuIcon.HomeIcon]: HomeSolidIcon,
  [MainMenuIcon.NewspaperIcon]: NewspaperSolidIcon,
  [MainMenuIcon.SearchIcon]: SearchSolidIcon,
  [MainMenuIcon.UserCircleIcon]: UserCircleSolidIcon,
  [MainMenuIcon.UserGroupIcon]: UserGroupSolidIcon,
  [MainMenuIcon.ViewGridIcon]: ViewGridSolidIcon,
}

export const enum MainMenuAction {
  OPEN_PAGE = 'OPEN_PAGE',
  OPEN_PROFILE = 'OPEN_PROFILE',
  OPEN_LINK = 'OPEN_LINK',
}
export type MainMenuItem = {
  enabled: boolean
  label: string
  action: MainMenuAction
  icon: string
  page?: string
  link?: string
}
export const mainMenuDefaultItems: MainMenuItem[] = [
  {
    enabled: true,
    label: 'Home',
    action: MainMenuAction.OPEN_PAGE,
    icon: MainMenuIcon.HomeIcon,
    page: 'home',
    link: null,
  },
  // {
  //   enabled: false,
  //   label: 'Explore',
  //   action: MainMenuAction.OPEN_PAGE,
  //   icon: MainMenuIcon.NewspaperIcon,
  //   page: 'explore',
  //   link: null,
  // },
  {
    enabled: true,
    label: 'Members',
    action: MainMenuAction.OPEN_PAGE,
    icon: MainMenuIcon.UserGroupIcon,
    page: 'members',
    link: null,
  },
  {
    enabled: true,
    label: 'Spaces',
    action: MainMenuAction.OPEN_PAGE,
    icon: MainMenuIcon.ViewGridIcon,
    page: 'spaces',
    link: null,
  },
  {
    enabled: false,
    label: 'Profile',
    action: MainMenuAction.OPEN_PROFILE,
    icon: MainMenuIcon.UserCircleIcon,
    page: null,
    link: null,
  },
]

export const mainMenuActions = [
  {
    label: 'Show Home',
    action: MainMenuAction.OPEN_PAGE,
    page: 'home',
    link: null,
  },
  {
    label: 'Show Explore',
    action: MainMenuAction.OPEN_PAGE,
    page: 'explore',
    link: null,
  },
  {
    label: 'Show All Members',
    action: MainMenuAction.OPEN_PAGE,
    page: 'members',
    link: null,
  },
  {
    label: 'Show All Spaces',
    action: MainMenuAction.OPEN_PAGE,
    page: 'spaces',
    link: null,
  },
  {
    label: 'Show All Collections',
    action: MainMenuAction.OPEN_PAGE,
    page: 'collections',
    link: null,
  },
  {
    label: 'Show Profile',
    action: MainMenuAction.OPEN_PROFILE,
    page: null,
    link: null,
  },
]
