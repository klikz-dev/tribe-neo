import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationDeletePostArgs,
  ActionFields,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getDeletePostKey,
  getFeedKey,
  getPostKey,
  getPostsKey,
} from '../../utils/keys'
import { getCachedPost } from '../cache/useCachedPost'
import { getPostsQueryById } from './filters'

export const useDeletePost = (options?: {
  fields?: ActionFields
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeletePostArgs
  >
}) => {
  const { useMutationOptions, fields = 'basic' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationDeletePostArgs>(
    (input: MutationDeletePostArgs) => client.posts.delete(input, fields),
    {
      onSettled: (data, error, input) => {
        const postKey = getPostKey(input.id)
        queryClient.removeQueries(postKey)

        const postsKey = getPostsKey()
        queryClient.invalidateQueries(postsKey)

        const feedKey = getFeedKey()
        queryClient.invalidateQueries(feedKey)

        const cachedPost = getCachedPost(input.id, queryClient)
        // we want to "refetch" only replies query if any
        // (invalidate does not work for disabled queries)
        // (replies withing a reply is a disabled query)
        const parentPostId = cachedPost.repliedToId
        if (parentPostId) {
          queryClient.refetchQueries(getPostsQueryById(parentPostId))
        }
      },
      mutationKey: getDeletePostKey(),
      ...useMutationOptions,
    },
  )
}
