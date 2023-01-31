import { UseQueryOptions } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  MemberPostNotificationSettings,
  QueryMemberPostNotificationSettingsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberPostNotificationSettingsKey } from '../../utils/keys'

export const useMemberPostNotificationSettings = (
  options: {
    variables?: QueryMemberPostNotificationSettingsArgs
    useQueryOptions?: UseQueryOptions<
      MemberPostNotificationSettings,
      ClientError
    >
  } = {},
) => {
  const { variables, useQueryOptions } = options || {}
  const { client } = useTribeClient()

  return useQuery<MemberPostNotificationSettings, ClientError>(
    getMemberPostNotificationSettingsKey({
      postId: variables?.postId,
    }),
    () => client.notifications.memberPostNotificationSettings(variables),
    useQueryOptions,
  )
}
