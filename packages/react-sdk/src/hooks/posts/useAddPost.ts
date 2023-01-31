import { InfiniteData, QueryKey } from 'react-query'
import { QueryFilters } from 'react-query/types/core/utils'

import { ClientError, PostFields } from '@tribeplatform/gql-client'
import {
  MutationCreatePostArgs,
  PaginatedPost,
  Post,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAddPostKey, POSTS_KEY, FEED_KEY } from '../../utils/keys'
import { addPostToPaginatedPost } from '../cache/useCachedPost'

const spacePostsKey = (spaceId): QueryFilters => ({
  active: true,
  predicate: query => {
    const [main, args] = query.queryKey || []
    return (
      main === FEED_KEY ||
      (main === POSTS_KEY && (args as any)?.spaceIds?.indexOf(spaceId) > -1)
    )
  },
})

export const useAddPost = (options?: {
  fields?: PostFields
  useMutationOptions?: UseMutationOptions<
    Post,
    ClientError,
    MutationCreatePostArgs,
    { snapshot: [QueryKey, InfiniteData<PaginatedPost>][] }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const addPostKey = getAddPostKey()

  return useMutation<
    Post,
    ClientError,
    MutationCreatePostArgs,
    { snapshot: [QueryKey, InfiniteData<PaginatedPost>][] }
  >(
    (input: MutationCreatePostArgs) => client.posts.create(input, fields),

    {
      mutationKey: addPostKey,
      onSuccess: (data, variables) => {
        queryClient.setQueriesData<InfiniteData<PaginatedPost>>(
          spacePostsKey(variables.spaceId),
          addPostToPaginatedPost(data),
        )
      },
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries(spacePostsKey(variables.spaceId))
      },
      ...useMutationOptions,
    },
  )
}
