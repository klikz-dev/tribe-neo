import { PluralNetworkFields } from '@tribeplatform/gql-client'
import {
  PaginatedNetwork,
  QueryGlobalNetworksArgs,
} from '@tribeplatform/gql-client/types'

import { useInfiniteQuery, UseInfiniteQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getNetworksKey } from '../../utils/keys'

export const useGlobalNetworks = (options: {
  variables: QueryGlobalNetworksArgs
  fields?: PluralNetworkFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedNetwork>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const networksKey = getNetworksKey()

  return useInfiniteQuery<PaginatedNetwork>(
    networksKey,
    ({ pageParam: after }) =>
      client?.dev.networks({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
