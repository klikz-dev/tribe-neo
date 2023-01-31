import { PostFields } from '@tribeplatform/gql-client'
import {
  PaginatedPost,
  QueryRepliesArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostsKey } from '../../utils/keys'

export const useReplies = (options: {
  variables: QueryRepliesArgs
  fields?: PostFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedPost>
}) => {
  const {
    variables,
    fields = 'default',
    useInfiniteQueryOptions,
  } = options || {}
  const { client } = useTribeClient()
  const repliesKey = getPostsKey(variables)

  return useInfiniteQuery<PaginatedPost>(
    repliesKey,
    ({ pageParam: after }) =>
      client?.posts.replies({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
