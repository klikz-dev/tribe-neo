import isEqual from 'react-fast-compare'

import { AuthTokenFields } from '@tribeplatform/gql-client'
import { AuthToken } from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey } from '../../utils/keys'

export const useAuthToken = (options?: {
  useQueryOptions?: UseQueryOptions<AuthToken>
  fields?: AuthTokenFields
}) => {
  const { useQueryOptions, fields = 'default' } = options || {}
  const { client, config, onTokenUpdate } = useTribeClient()
  const authTokenKey = getAuthTokensKey()
  const { networkDomain } = config || {}

  return useQuery<AuthToken>(
    authTokenKey,
    () => client.getTokens({ networkDomain }, fields),
    {
      isDataEqual: (o, n) => {
        // let's only compare network, networkPublicInfo and member
        const { network: on, networkPublicInfo: onp, member: om } = o
        const { network: nn, networkPublicInfo: nnp, member: nm } = n

        // We should remove the pages before comparison because pages is weird :|

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { pages: _op, ...oNetworkRest } = on
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { pages: _np, ...nNetworkRest } = nn
        const eq1 = isEqual(oNetworkRest, nNetworkRest)
        const eq2 = isEqual(onp, nnp)
        const eq3 = isEqual(om, nm)
        return eq1 && eq2 && eq3
      },
      ...useQueryOptions,
      onSuccess: data => {
        client.setToken(data.accessToken)
        if (typeof onTokenUpdate === 'function') {
          onTokenUpdate(data)
        }
        if (typeof useQueryOptions?.onSuccess === 'function') {
          useQueryOptions.onSuccess(data)
        }
      },
    },
  )
}
