import { UseQueryOptions } from 'react-query'

import { CollectionFields } from '@tribeplatform/gql-client'
import {
  QueryCollectionArgs,
  Collection,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCollectionKey } from '../../utils/keys'
import { useCachedCollection } from '../cache'

export const useCollection = (options: {
  variables?: QueryCollectionArgs
  fields?: CollectionFields
  useQueryOptions?: UseQueryOptions<Collection>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options
  const { client } = useTribeClient()
  const collectionKey = getCollectionKey(variables)
  const cachedCollection = useCachedCollection(variables?.id)

  return useQuery<Collection>(
    collectionKey,
    () => client.collections.get(variables, fields),
    {
      placeholderData: cachedCollection,
      ...useQueryOptions,
    },
  )
}
