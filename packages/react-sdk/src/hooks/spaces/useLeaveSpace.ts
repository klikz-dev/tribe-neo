import { ClientError } from '@tribeplatform/gql-client'
import { MutationLeaveSpaceArgs, Action } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getMemberNotificationSettingsKey,
  getPostsKey,
  getSpaceKey,
} from '../../utils/keys'

export const useLeaveSpace = (options?: {
  spaceSlug: string
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationLeaveSpaceArgs
  >
}) => {
  const { useMutationOptions, spaceSlug } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationLeaveSpaceArgs>(
    (input: MutationLeaveSpaceArgs) => client.spaces.leave(input),
    {
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries(getSpaceKey({ id: variables.spaceId }))
        queryClient.invalidateQueries(getSpaceKey({ slug: spaceSlug }))
        queryClient.invalidateQueries(getMemberNotificationSettingsKey())
        queryClient.invalidateQueries(getPostsKey())
      },
      ...useMutationOptions,
    },
  )
}
