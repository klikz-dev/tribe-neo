import { UseQueryOptions } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  MemberNotificationSettings,
  QueryMemberNotificationSettingsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberNotificationSettingsKey } from '../../utils/keys'

export const useMemberNotificationSettings = (
  options: {
    variables?: QueryMemberNotificationSettingsArgs
    useQueryOptions?: UseQueryOptions<MemberNotificationSettings, ClientError>
  } = {},
) => {
  const { variables, useQueryOptions } = options || {}
  const { client } = useTribeClient()

  return useQuery<MemberNotificationSettings, ClientError>(
    getMemberNotificationSettingsKey(variables),
    () => client.notifications.memberSettings(variables),
    useQueryOptions,
  )
}
