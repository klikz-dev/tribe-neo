import { QuerySpaceArgs, Space } from '@tribeplatform/gql-client/types'

import { useQueryClient } from '../../lib'
import { getCollectionsKey, getSpacesKey } from '../../utils/keys'

const findSpaceInSpaces = (args: QuerySpaceArgs, queryClient): Space => {
  const spacesKey = getSpacesKey()
  let cachedSpace = null

  const queries = queryClient.getQueriesData({ queryKey: spacesKey })
  queries?.forEach(query => {
    const queryData = query[1] as { pages: [{ nodes: [{ id; slug }] }] }
    queryData?.pages?.forEach(page => {
      page?.nodes?.forEach(space => {
        if (space?.id === args.id || space?.slug === args.slug) {
          cachedSpace = space
        }
      })
    })
  })

  return cachedSpace
}

const findSpaceInCollections = (args: QuerySpaceArgs, queryClient): Space => {
  const collectionsKey = getCollectionsKey()
  let cachedSpace = null

  const queries = queryClient.getQueriesData({ queryKey: collectionsKey })
  queries?.forEach(query => {
    const queryData = query[1] as [{ spaces: { nodes: [{ id; slug }] } }]
    queryData?.forEach(collection => {
      collection?.spaces?.nodes?.forEach(space => {
        if (space?.id === args.id || space?.slug === args.slug) {
          cachedSpace = space
        }
      })
    })
  })

  return cachedSpace
}

export const useCachedSpace = (args: QuerySpaceArgs): Space => {
  const queryClient = useQueryClient()
  return (
    findSpaceInSpaces(args, queryClient) ||
    findSpaceInCollections(args, queryClient)
  )
}
