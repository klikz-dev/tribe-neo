import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationUpdateMemberSpaceNotificationSettingsArgs,
  MemberSpaceNotificationSettings,
  MemberNotificationSettings,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberNotificationSettingsKey } from '../../utils/keys'

export const useUpdateSpaceNotificationSettings = (options?: {
  useMutationOptions?: UseMutationOptions<
    MemberSpaceNotificationSettings,
    ClientError,
    MutationUpdateMemberSpaceNotificationSettingsArgs,
    { snapshot: MemberNotificationSettings }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const memberSettingsKey = getMemberNotificationSettingsKey()

  return useMutation<
    MemberSpaceNotificationSettings,
    ClientError,
    MutationUpdateMemberSpaceNotificationSettingsArgs,
    { snapshot: MemberNotificationSettings }
  >(
    (variables: MutationUpdateMemberSpaceNotificationSettingsArgs) =>
      client.notifications.updateSpaceSettings(variables),
    {
      onMutate: async newSpaceSettings => {
        await queryClient.cancelQueries(memberSettingsKey)

        const snapshot =
          queryClient.getQueryData<MemberNotificationSettings>(
            memberSettingsKey,
          )

        queryClient.setQueryData<MemberNotificationSettings>(
          memberSettingsKey,
          old => {
            return {
              ...old,
              spaces: old.spaces.map(s => {
                if (
                  s?.space?.id === newSpaceSettings.spaceId &&
                  s?.channel === newSpaceSettings.channel
                ) {
                  return {
                    ...s,
                    channel: newSpaceSettings.channel,
                    preference:
                      newSpaceSettings.input.preference ?? s.preference,
                    enabled: newSpaceSettings.input.enabled ?? s.enabled,
                    sameAsDefault:
                      newSpaceSettings.input.sameAsDefault ?? s.sameAsDefault,
                  }
                }
                return s
              }),
            }
          },
        )

        return { snapshot }
      },
      onError: (err, newSpace, context) => {
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
    },
  )
}
