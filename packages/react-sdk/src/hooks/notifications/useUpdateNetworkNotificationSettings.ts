import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationUpdateMemberNetworkNotificationSettingsArgs,
  MemberNetworkNotificationSettings,
  MemberNotificationSettings,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberNotificationSettingsKey } from '../../utils/keys'

export const useUpdateNetworkNotificationSettings = (options?: {
  useMutationOptions?: UseMutationOptions<
    MemberNetworkNotificationSettings,
    ClientError,
    MutationUpdateMemberNetworkNotificationSettingsArgs,
    { snapshot: MemberNotificationSettings }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const memberSettingsKey = getMemberNotificationSettingsKey()

  return useMutation<
    MemberNetworkNotificationSettings,
    ClientError,
    MutationUpdateMemberNetworkNotificationSettingsArgs,
    { snapshot: MemberNotificationSettings }
  >(variables => client.notifications.updateNetworkSettings(variables), {
    onMutate: async newNetworkSettings => {
      await queryClient.cancelQueries(memberSettingsKey)

      const snapshot =
        queryClient.getQueryData<MemberNotificationSettings>(memberSettingsKey)

      queryClient.setQueryData<MemberNotificationSettings>(
        memberSettingsKey,
        old => {
          return {
            ...old,
            network:
              old?.network?.map(n => {
                if (n?.channel === newNetworkSettings.channel) {
                  return {
                    ...n,
                    channel: newNetworkSettings.channel,
                    enabled: newNetworkSettings.input.enabled ?? n.enabled,
                    mention: newNetworkSettings.input.mention ?? n.mention,
                    reaction: newNetworkSettings.input.reaction ?? n.reaction,
                    sameAsDefault:
                      newNetworkSettings.input.sameAsDefault ?? n.sameAsDefault,
                  }
                }
                return n
              }) || [],
          }
        },
      )

      return { snapshot }
    },
    onError: (err, newNetworkSettings, context) => {
      // revert back the optimistic response
      queryClient.setQueryData<MemberNotificationSettings>(
        memberSettingsKey,
        context.snapshot,
      )
    },
    onSettled: () => {
      // invalidate to refetch again
      queryClient.invalidateQueries(memberSettingsKey)
    },
    ...useMutationOptions,
  })
}
