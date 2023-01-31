import { useMemo, useReducer } from 'react'

import { useNetwork } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { useQuery } from '../../lib/useQuery'
import { defaultPages } from '../../page-builder/default-pages'
import { mergePages } from '../../page-builder/utils'
import { ThemeConvertor } from '../../themes/theme-convertor'
import { useTheme } from '../../themes/ThemeProvider.component'
import { MainHeader } from './MainHeader'
import { Preview } from './Preview'
import { Sidebar } from './Sidebar'
import { Action, ActionKind, State, Route, RouteType } from './types'

const init = ({ theme, ...state }: State): State => {
  return {
    theme: new ThemeConvertor({
      base: theme,
      theme: {},
    }).toTheme(),
    ...state,
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.SetTheme:
      return {
        ...state,
        theme: new ThemeConvertor({
          base: state.theme,
          theme: action.payload,
        }).toTheme(),
      }
    case ActionKind.NAVIGATE:
      return {
        ...state,
        route: action.payload as Route,
      }
    default:
      return state
  }
}
const INITIAL_STATE: Partial<State> = {
  route: {
    entityType: RouteType.THEME,
    path: '/theme',
  },
}

export const CanaryPageBuilder = () => {
  const { theme: mainTheme } = useTheme()
  const { data: network } = useNetwork()
  const query = useQuery()

  const pages = useMemo(
    () => mergePages(defaultPages, network?.pages || []),
    [network?.pages],
  )

  const [state, dispatch] = useReducer(
    reducer,
    {
      theme: mainTheme,
      route: {
        entityType: query.type || INITIAL_STATE.route.entityType,
        path: query.path || INITIAL_STATE.route.path,
      },
    },
    init,
  )

  return (
    <div className="min-h-screen w-full grid grid-cols-12 overflow-hidden px-5 pb-10 bg-main-50">
      <main className="col-span-12 lg:col-span-8 xl:col-span-9 pt-5 sm:pt-7 lg:mr-5 mr-0">
        <MainHeader
          pages={pages}
          route={state.route}
          onRouteChange={item => {
            dispatch({
              type: ActionKind.NAVIGATE,
              payload: item.value,
            })
          }}
        />

        <div className="mt-6 mb-8 h-full">
          <Preview state={state} pages={pages} />
        </div>
      </main>
      <aside
        className="hidden lg:block lg:col-span-4 xl:col-span-3 pt-5 sm:pt-7"
        aria-label="Sidebar"
      >
        <div className="flex justify-end">
          <Button size="xs">Save</Button>
        </div>
        <Sidebar state={state} dispatch={dispatch} pages={pages} />
      </aside>
    </div>
  )
}
