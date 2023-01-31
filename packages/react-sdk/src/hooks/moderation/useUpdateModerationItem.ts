import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationUpdateModerationItemArgs,
  Action,
  ModerationStatus,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationItemsKey } from '../../utils/keys'
import { removeFromModerationItems } from '../cache'

export const useUpdateModerationItem = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUpdateModerationItemArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const moderationItemsKey = getModerationItemsKey()

  return useMutation<Action, ClientError, MutationUpdateModerationItemArgs>(
    variables => client.moderation.updateItem(variables),
    {
      onMutate: variables => {
        if (
          variables?.input?.status === ModerationStatus.REJECTED ||
          variables?.input?.status === ModerationStatus.ACCEPTED
        ) {
          removeFromModerationItems(variables.id, queryClient)
        }
      },
      onSettled: () => {
        // invalidate to refetch again
        queryClient.invalidateQueries(moderationItemsKey)
      },
      ...useMutationOptions,
    },
  )
}
