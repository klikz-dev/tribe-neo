import { matchPath } from 'react-router'

import { AppContext, PageProps } from '../../@types'
import { getPagesServerData } from '../pages'

export const prefetchPageInitialData = async (
  context: AppContext,
): Promise<void> => {
  const { path } = context?.req
  const pages = (context?.authToken?.network as any)?.pages || {}
  if (!Array.isArray(pages)) return
  const page = pages.find(p => {
    return (
      matchPath(path, {
        path: p.address.path,
        exact: p.address.exact,
      }) !== null
    )
  })

  if (!page) return

  const matchedPath = matchPath(path, {
    path: page.address.path,
    exact: page.address.exact,
  })

  if (!matchedPath) return

  const props: PageProps = { context, path: matchedPath }

  if (getPagesServerData[page?.slug]) {
    await getPagesServerData[page.slug](props)
  }
}
