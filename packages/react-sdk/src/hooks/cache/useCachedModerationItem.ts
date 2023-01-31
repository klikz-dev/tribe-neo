import { InfiniteData, QueryClient } from 'react-query'

import { PaginatedModeration } from '@tribeplatform/gql-client/types'

import { getModerationItemsKey } from '../../utils/keys'

export const removeFromModerationItems = (
  moderationItemId: string,
  queryClient: QueryClient,
) => {
  const moderationItemsKey = getModerationItemsKey()
  queryClient.setQueriesData<InfiniteData<PaginatedModeration>>(
    moderationItemsKey,
    old => ({
      ...old,
      pages: old.pages.map(page => ({
        ...page,
        edges: page.edges.filter(edge => edge.node.id !== moderationItemId),
        nodes: page.nodes.filter(node => node.id !== moderationItemId),
      })),
    }),
  )
}
