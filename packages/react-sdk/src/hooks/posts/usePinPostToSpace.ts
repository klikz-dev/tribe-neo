import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationPinPostToSpaceArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getPinnedPostsKey,
  getPinPostToSpaceKey,
  getPostKey,
  getPostsKey,
} from '../../utils/keys'

export const usePinPostToSpace = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationPinPostToSpaceArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationPinPostToSpaceArgs>(
    variables => client.posts.pinToSpace(variables),
    {
      onSettled: (data, error, variables) => {
        const postKey = getPostKey(variables.postId)
        queryClient.invalidateQueries(postKey)

        const postsKey = getPostsKey()
        queryClient.invalidateQueries(postsKey)

        const pinnedPostsKey = getPinnedPostsKey()
        queryClient.invalidateQueries(pinnedPostsKey)
      },
      mutationKey: getPinPostToSpaceKey(),
      ...useMutationOptions,
    },
  )
}
