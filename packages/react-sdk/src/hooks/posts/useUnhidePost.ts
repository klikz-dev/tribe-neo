import { ClientError } from '@tribeplatform/gql-client'
import { Action, MutationUnhidePostArgs } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getFeedKey, getPostKey, getPostsKey } from '../../utils/keys'
import { pinnedPostsFilter } from './filters'

export const useUnhidePost = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUnhidePostArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationUnhidePostArgs>(
    (variables: MutationUnhidePostArgs) => client.posts.unhide(variables),
    {
      onSettled: (data, error, variables) => {
        const postKey = getPostKey(variables.id)
        queryClient.invalidateQueries(postKey)

        const postsKey = getPostsKey()
        queryClient.invalidateQueries(postsKey)
        queryClient.invalidateQueries({ ...pinnedPostsFilter, active: true })

        const feedKey = getFeedKey()
        queryClient.invalidateQueries(feedKey)
      },
      ...useMutationOptions,
    },
  )
}
