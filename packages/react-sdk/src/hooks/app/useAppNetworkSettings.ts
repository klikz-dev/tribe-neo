import { UseQueryOptions } from 'react-query'

import { QueryGetAppNetworkSettingsArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppNetworkSettingsKey } from '../../utils/keys'

export const useAppNetworkSettings = (options: {
  variables: QueryGetAppNetworkSettingsArgs
  useQueryOptions?: UseQueryOptions<string>
}) => {
  const { variables, useQueryOptions } = options
  const { client } = useTribeClient()
  const appNetworkSettingsKey = getAppNetworkSettingsKey(variables)

  return useQuery<string>(
    appNetworkSettingsKey,
    () => client.app.networkSettings(variables),
    useQueryOptions,
  )
}
