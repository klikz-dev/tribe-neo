export function simplifyPaginatedResult<T>(data): {
  nodes: T[]
  hasNextPage: boolean
  totalCount: number
} {
  let result = { totalCount: 0, nodes: [] as any, hasNextPage: false }
  if (!data?.pages) return result
  data.pages.forEach(page => {
    if (page?.edges) {
      page.edges.forEach(edge => {
        if (edge?.node) result.nodes.push(edge.node)
      })
    } else if (page?.nodes) {
      page.nodes.forEach(node => {
        if (node) result.nodes.push(node)
      })
    }
  })
  const lastPage = data.pages[data.pages.length - 1]

  result = {
    ...result,
    ...{
      totalCount: lastPage.totalCount,
      hasNextPage: lastPage?.pageInfo?.hasNextPage || false,
      endCursor: lastPage?.pageInfo?.endCursor,
    },
  }
  return result
}
