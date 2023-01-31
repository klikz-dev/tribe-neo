import { PostFields } from '@tribeplatform/gql-client/graphql'
import {
  PaginatedPost,
  QueryMemberPostsArgs,
} from '@tribeplatform/gql-client/types'

import { useInfiniteQuery, UseInfiniteQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostsKey } from '../../utils/keys'

export const useMemberPosts = (options: {
  variables: QueryMemberPostsArgs
  fields?: PostFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedPost>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const postsKey = getPostsKey(variables)

  return useInfiniteQuery<PaginatedPost>(
    postsKey,
    ({ pageParam: after }) =>
      client?.posts.byMember(
        variables.memberId,
        { after, ...variables },
        fields,
      ),
    useInfiniteQueryOptions,
  )
}
