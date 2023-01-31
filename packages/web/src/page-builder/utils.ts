import { Page } from '@tribeplatform/gql-client/types'

const PAGE_TYPE_PRIORITY = {
  SYSTEM: 1,
  CUSTOM: 2,
  ENTITY: 3,
}

const comparePaths = (path1: string[], path2: string[]): boolean => {
  if (path1.length === 0) return true
  if (path2.length === 0) return false

  const firstIsDynamic = path1[0].startsWith(':')
  const secondIsDynamic = path2[0].startsWith(':')

  if (!firstIsDynamic && secondIsDynamic) return false
  if (firstIsDynamic && !secondIsDynamic) return true
  if (firstIsDynamic && secondIsDynamic) {
    if (path1.length === 1 && path2.length === 1) return path1[0] < path2[0]
    return comparePaths(
      path1.slice(1, path1.length),
      path2.slice(1, path2.length),
    )
  }
  if (path1[0] !== path2[0]) return path1[0] < path2[0]
  return comparePaths(
    path1.slice(1, path1.length),
    path2.slice(1, path2.length),
  )
}

export const sortPages = (pages: Page[]): Page[] => {
  const sortedPages = [...pages]
  sortedPages.sort((page1, page2) => {
    if (page1.type !== page2.type) {
      return PAGE_TYPE_PRIORITY[page1.type] - PAGE_TYPE_PRIORITY[page2.type]
    }
    return comparePaths(
      page1.address.path.split('/'),
      page2.address.path.split('/'),
    )
      ? 1
      : -1
  })
  return sortedPages
}

export const mergePages = (pages: Page[], customPages: Page[]): Page[] => {
  const customPageSlugs = customPages.map(page => page.slug)
  const uniquePages = pages.filter(page => !customPageSlugs.includes(page.slug))
  return [...uniquePages, ...customPages]
}
