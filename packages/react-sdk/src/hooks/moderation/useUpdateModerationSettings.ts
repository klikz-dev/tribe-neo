import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationUpdateModerationSettingsArgs,
  ModerationSettings,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationSettingsKey } from '../../utils/keys'

export const useUpdateModerationSettings = (options?: {
  useMutationOptions?: UseMutationOptions<
    ModerationSettings,
    ClientError,
    MutationUpdateModerationSettingsArgs,
    { snapshot: ModerationSettings }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const moderationSettingsKey = getModerationSettingsKey()

  return useMutation<
    ModerationSettings,
    ClientError,
    MutationUpdateModerationSettingsArgs,
    { snapshot: ModerationSettings }
  >(variables => client.moderation.updateSettings(variables), {
    onMutate: async newModerationSettings => {
      await queryClient.cancelQueries(moderationSettingsKey)

      const snapshot = queryClient.getQueryData<ModerationSettings>(
        moderationSettingsKey,
      )

      queryClient.setQueryData<ModerationSettings>(
        moderationSettingsKey,
        old => {
          return {
            ...old,
            ...newModerationSettings,
          }
        },
      )

      return { snapshot }
    },
    onError: (err, newNetworkSettings, context) => {
      // revert back the optimistic response
      queryClient.setQueryData<ModerationSettings>(
        moderationSettingsKey,
        context.snapshot,
      )
    },
    onSettled: () => {
      // invalidate to refetch again
      queryClient.invalidateQueries(moderationSettingsKey)
    },
    ...useMutationOptions,
  })
}
