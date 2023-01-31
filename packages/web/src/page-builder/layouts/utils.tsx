import { ReactElement } from 'react'

import { matchPath, useLocation } from 'react-router'

import {
  NavigationSlates,
  Page,
  SlateComponent,
} from '@tribeplatform/gql-client/types'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'
import { SlateContextProps } from '@tribeplatform/slate-kit/types'
import { compileProps } from '@tribeplatform/slate-kit/utils'

import { SpacePage, SpacePageProps } from '../../components/Space/SpacePage'

export const getNavigationComponents = (
  navigationSlates: NavigationSlates,
  path: string,
  additionalContext: Record<string, any>,
): {
  Header: ReactElement | null
  Sidebar1: ReactElement | null
  Sidebar2: ReactElement | null
  Footer: ReactElement | null
} => {
  const {
    header: headerSlate,
    sidebar1: sidebar1Slate,
    sidebar2: sidebar2Slate,
    footer: footerSlate,
  } = navigationSlates
  return {
    Header: headerSlate ? (
      <SlateRenderer
        slate={headerSlate}
        path={path}
        additionalContext={additionalContext}
      />
    ) : null,
    Sidebar1: sidebar1Slate ? (
      <SlateRenderer
        slate={sidebar1Slate}
        path={path}
        additionalContext={additionalContext}
      />
    ) : null,
    Sidebar2: sidebar2Slate ? (
      <SlateRenderer
        slate={sidebar2Slate}
        path={path}
        additionalContext={additionalContext}
      />
    ) : null,
    Footer: footerSlate ? (
      <SlateRenderer
        slate={footerSlate}
        path={path}
        additionalContext={additionalContext}
      />
    ) : null,
  }
}

export const useActivePage = (pages: Page[], customPage?: Page): Page => {
  const location = useLocation()
  return (
    customPage ||
    pages.find(
      page =>
        !!matchPath(location.pathname, {
          path: page.address.path,
          exact: page.address.exact,
          strict: false,
        }),
    )
  )
}

export const getSpaceSlugFromPage = (
  page: Page,
  context: SlateContextProps,
): string | undefined => {
  if (!page) return
  const rawSpaceProps = (
    page.slate.components.find(
      component => (component as SlateComponent).name === SpacePage.name,
    ) as SlateComponent
  )?.props
  const unCompiledProps =
    typeof rawSpaceProps === 'string'
      ? JSON.parse(rawSpaceProps)
      : rawSpaceProps
  const { slug }: SpacePageProps = compileProps(
    unCompiledProps || {},
    context,
  ) as SpacePageProps
  return slug
}
