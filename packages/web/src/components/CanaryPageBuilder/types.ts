import { Theme } from '../../themes/types'

export enum ActionKind {
  SetTheme = 'SET_THEME',
  NAVIGATE = 'NAVIGATE',
}

export type Action = {
  type: ActionKind
  payload: unknown
}

export enum RouteType {
  SPACE = 'space',
  PAGE = 'page',
  THEME = 'theme',
}

export type Route = {
  path: string
  entityType: RouteType
}

export type State = {
  theme: Theme
  route: Route
}
