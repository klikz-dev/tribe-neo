import { useMemo } from 'react'

import { QueryClient } from 'react-query'

import { Collection } from '@tribeplatform/gql-client/types'

import { useQueryClient } from '../../lib'
import { getCollectionsKey } from '../../utils/keys'

export const getCachedCollection = (
  id: string,
  queryClient: QueryClient,
): Collection => {
  const collectionsKey = getCollectionsKey()
  let cachedCollection: Collection

  const data = queryClient.getQueriesData<Collection[]>(collectionsKey)
  data?.forEach(([_, queryData]) => {
    queryData?.forEach(collection => {
      if (collection?.id === id) cachedCollection = collection
    })
  })
  return cachedCollection
}

export const useCachedCollection = (id: string): Collection => {
  const queryClient = useQueryClient()
  return useMemo(() => getCachedCollection(id, queryClient), [id, queryClient])
}
