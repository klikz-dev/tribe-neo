import { ReactElement, useMemo } from 'react'

import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import { Page } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'

import { defaultPages } from './default-pages'
import { LayoutLoader } from './layouts/LayoutLoader.component'
import { mergePages, sortPages } from './utils'

export const loadPage = (
  page: Page,
  networkName: string,
  customPath: string = null,
  customExact: boolean = null,
) => {
  const { seoDetail } = page
  const { title: pageTitle = page.slug, description } = seoDetail
  const title = `${pageTitle} - ${networkName}`
  return (
    <Route
      key={page.slug}
      path={customPath || page.address.path}
      exact={customExact === null ? page.address.exact : customExact}
    >
      <Helmet>
        {title ? <title>{title}</title> : null}
        {title ? <meta property="og:title" content={title} /> : null}
        {title ? <meta name="twitter:title" content={title} /> : null}
        {description ? <meta name="description" content={description} /> : null}
        {description ? (
          <meta property="og:description" content={description} />
        ) : null}
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
      </Helmet>
      <SlateRenderer slate={page.slate} path={page.address.path} />
    </Route>
  )
}

export const Routes = (): ReactElement => {
  const {
    data: { network },
  } = useAuthToken({
    useQueryOptions: {
      // this is here to prevent the whole page from re-rendering
      notifyOnChangeProps: ['data'],
    },
  })
  const { name, pages: customPages = [], navigationSlates } = network
  const pages = useMemo(
    () => mergePages(defaultPages, customPages),
    [customPages],
  )

  const content = useMemo(() => {
    const notFoundPage = pages.find(page => page.slug === 'not-found')
    const arr =
      pages.length > 0
        ? sortPages(pages).map(page => loadPage(page, name))
        : [<Route key="not-leaded" />]

    arr.push(loadPage(notFoundPage, name, '*', true))

    return arr
  }, [pages, name])

  return (
    <LayoutLoader
      Content={<Switch>{content}</Switch>}
      pages={pages}
      navigationSlates={navigationSlates}
    />
  )
}
