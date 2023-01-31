import { Types, CollectionFields } from '@tribeplatform/gql-client'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCollectionsKey } from '../../utils/keys'

export const useCollections = (options: {
  useQueryOptions?: UseQueryOptions<Types.Collection[]>
  variables?: Types.QueryCollectionsArgs
  fields?: CollectionFields
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const collectionsKey = getCollectionsKey(variables)

  return useQuery<Types.Collection[]>(
    collectionsKey,
    () => client?.collections.list({ ...variables }, fields),
    useQueryOptions,
  )
}
