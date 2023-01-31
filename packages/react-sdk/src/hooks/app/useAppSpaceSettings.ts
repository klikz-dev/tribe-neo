import { UseQueryOptions } from 'react-query'

import { QueryGetAppSpaceSettingsArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppSpaceSettingsKey } from '../../utils/keys'

export const useAppSpaceSettings = (options: {
  variables: QueryGetAppSpaceSettingsArgs
  useQueryOptions?: UseQueryOptions<string>
}) => {
  const { variables, useQueryOptions } = options
  const { client } = useTribeClient()
  const appSpaceSettingsKey = getAppSpaceSettingsKey(variables)

  return useQuery<string>(
    appSpaceSettingsKey,
    () => client.app.spaceSettings(variables),
    useQueryOptions,
  )
}
