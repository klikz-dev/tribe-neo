import { Dispatch, FC } from 'react'

import { matchPath } from 'react-router'

import { Page } from '@tribeplatform/gql-client/types'

import { defaultPages } from '../../page-builder/default-pages'
import { useTheme } from '../../themes/ThemeProvider.component'
import { PageSettings } from './PageSettings'
import { SpaceSettings } from './SpaceSettings'
import { ThemePresetsCard } from './ThemePresetsCard'
import { Action, ActionKind, RouteType, State } from './types'

const spaceJson = defaultPages.find(p => p.slug === 'space')

export const Sidebar: FC<{
  state: State
  dispatch: Dispatch<Action>
  pages: Page[]
}> = ({ state, dispatch, pages }) => {
  const { theme: mainTheme } = useTheme()
  const { route } = state

  if (route.entityType === RouteType.THEME) {
    return (
      <div className="mt-6">
        <ThemePresetsCard
          theme={state.theme}
          mainTheme={mainTheme}
          setPreset={template => {
            dispatch({
              type: ActionKind.SetTheme,
              payload: { colors: template.colors, name: template.name },
            })
          }}
        />
      </div>
    )
  }
  if (route.entityType === RouteType.SPACE) {
    const spaceMatch = matchPath<{ slug: string }>(
      route.path,
      spaceJson.address,
    )
    if (spaceMatch?.params?.slug) {
      return (
        <div className="mt-6">
          <SpaceSettings slug={spaceMatch.params.slug} />
        </div>
      )
    }
  }

  const page = pages.find(p => p.address.path === route.path)
  // Default
  return (
    <div className="mt-6">
      <PageSettings page={page} />
    </div>
  )
}
