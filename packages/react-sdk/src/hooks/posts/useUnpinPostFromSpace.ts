import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationUnpinPostFromSpaceArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getUnpinPostFromSpaceKey,
  getPostKey,
  getPostsKey,
  getPinnedPostsKey,
} from '../../utils/keys'

export const useUnpinPostFromSpace = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUnpinPostFromSpaceArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationUnpinPostFromSpaceArgs>(
    variables => client.posts.unpinFromSpace(variables),
    {
      onSettled: (data, error, variables) => {
        const postKey = getPostKey(variables.postId)
        queryClient.invalidateQueries(postKey)

        const postsKey = getPostsKey()
        queryClient.invalidateQueries(postsKey)

        const pinnedPostsKey = getPinnedPostsKey()
        queryClient.invalidateQueries(pinnedPostsKey)
      },
      mutationKey: getUnpinPostFromSpaceKey(),
      ...useMutationOptions,
    },
  )
}
