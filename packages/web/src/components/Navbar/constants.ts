export const enum NavbarStyle {
  DEFAULT = 'default',
  STACKED = 'stacked',
}

export const availableNavbarStyles = [
  { title: 'Default', value: NavbarStyle.DEFAULT },
  { title: 'Stacked', value: NavbarStyle.STACKED },
]

export const enum NavbarNavigationAction {
  OPEN_PAGE = 'OPEN_PAGE',
  OPEN_SPACE = 'OPEN_SPACE',
  OPEN_LINK = 'OPEN_LINK',
}

export const navbarNavigationActions = [
  { title: 'Open a link', action: NavbarNavigationAction.OPEN_LINK },
  { title: 'Open a page', action: NavbarNavigationAction.OPEN_PAGE },
  { title: 'Open a space', action: NavbarNavigationAction.OPEN_SPACE },
]

export type NavbarNavigationItem = {
  label: string
  action: NavbarNavigationAction
  page?: string
  link?: string
  openInNewWindow?: boolean
  space?: string
}

export const enum NavbarControlType {
  BUTTON = 'BUTTON',
  ICON = 'ICON',
  AVATAR = 'AVATAR',
}

export const enum NavbarControlAction {
  CREATE_ITEM = 'CREATE_ITEM',
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  SHOW_PROFILE = 'SHOW_PROFILE',
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
}

export type NavbarControlItem = {
  type: NavbarControlType
  action: NavbarControlAction
  label: string
  icon?: string
  showLabel?: boolean
}

export const defaultNavbarControlItems: NavbarControlItem[] = [
  {
    type: NavbarControlType.BUTTON,
    action: NavbarControlAction.SHOW_NOTIFICATION,
    label: 'Show Notification',
    icon: 'bell',
    showLabel: null,
  },
  {
    type: NavbarControlType.BUTTON,
    action: NavbarControlAction.CREATE_ITEM,
    label: 'Create Post',
    icon: 'plus',
    showLabel: false,
  },
  {
    type: NavbarControlType.AVATAR,
    action: NavbarControlAction.SHOW_PROFILE,
    label: 'Show Profile',
    icon: null,
    showLabel: null,
  },
  {
    type: NavbarControlType.BUTTON,
    action: NavbarControlAction.LOGIN,
    label: 'Log in',
    icon: null,
    showLabel: true,
  },
  {
    type: NavbarControlType.BUTTON,
    action: NavbarControlAction.SIGNUP,
    label: 'Sign up',
    icon: null,
    showLabel: true,
  },
]
