import isEqual from 'react-fast-compare'

import { Types, NetworkFields } from '@tribeplatform/gql-client'
import { AuthToken } from '@tribeplatform/gql-client/types'

import { useQueryClient, useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey, getNetworkKey } from '../../utils/keys'

export const useNetwork = (options?: {
  useQueryOptions?: UseQueryOptions<Types.Network>
  fields?: NetworkFields
}) => {
  const queryClient = useQueryClient()
  const { useQueryOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const networkKey = getNetworkKey()
  const authTokenKey = getAuthTokensKey()

  return useQuery<Types.Network>(networkKey, () => client.network.get(fields), {
    initialData: () => {
      return queryClient.getQueryData<AuthToken>(authTokenKey)?.network
    },
    isDataEqual: (o, n) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pages: _o, ...oRest } = o
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pages: _n, ...nRest } = n
      return isEqual(nRest, oRest)
    },
    ...useQueryOptions,
  })
}
