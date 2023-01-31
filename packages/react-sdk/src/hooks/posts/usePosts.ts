import { PostFields } from '@tribeplatform/gql-client/graphql/post'
import {
  PaginatedPost,
  QueryPostsArgs,
  QueryTagPostsArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostsKey } from '../../utils/keys'

export const usePosts = (options: {
  variables: QueryPostsArgs | QueryTagPostsArgs
  fields?: PostFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedPost>
}) => {
  const {
    variables,
    fields = 'default',
    useInfiniteQueryOptions,
  } = options || {}
  const { client } = useTribeClient()
  const postsKey = getPostsKey(variables)

  return useInfiniteQuery<PaginatedPost>(
    postsKey,
    ({ pageParam: after }) =>
      client?.posts.list({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
