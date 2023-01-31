import { Types, PostFields } from '@tribeplatform/gql-client'

import { useInfiniteQuery, UseInfiniteQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getFeedKey } from '../../utils/keys'

export const DefaultFeedLimit = 10

export const useFeed = (options: {
  variables: Types.QueryFeedArgs
  fields?: PostFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<Types.PaginatedPost>
}) => {
  const {
    variables = { limit: DefaultFeedLimit },
    fields = 'default',
    useInfiniteQueryOptions,
  } = options || {}

  const { client } = useTribeClient()
  const feedKey = getFeedKey(variables)

  return useInfiniteQuery<Types.PaginatedPost>(
    feedKey,
    ({ pageParam: after }) =>
      client?.posts.feed(
        {
          after,
          ...variables,
        },
        fields,
      ),
    useInfiniteQueryOptions,
  )
}
