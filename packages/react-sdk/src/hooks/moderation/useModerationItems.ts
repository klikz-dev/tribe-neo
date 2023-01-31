import { ModerationItemFields } from '@tribeplatform/gql-client'
import {
  PaginatedModeration,
  QueryModerationItemsArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationItemsKey } from '../../utils/keys'

export const useModerationItems = (options: {
  variables: QueryModerationItemsArgs
  fields?: ModerationItemFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedModeration>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const moderationItemsKey = getModerationItemsKey(variables)

  return useInfiniteQuery<PaginatedModeration>(
    moderationItemsKey,
    ({ pageParam: after }) =>
      client?.moderation.getItems({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
