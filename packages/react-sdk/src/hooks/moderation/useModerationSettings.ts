import { UseQueryOptions } from 'react-query'

import { ModerationSettings } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationSettingsKey } from '../../utils/keys'

export const useModerationSettings = (options?: {
  useQueryOptions?: UseQueryOptions<ModerationSettings>
}) => {
  const { useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const moderationSettingsKey = getModerationSettingsKey()

  return useQuery<ModerationSettings>(
    moderationSettingsKey,
    () => client.moderation.settings(),
    useQueryOptions,
  )
}
