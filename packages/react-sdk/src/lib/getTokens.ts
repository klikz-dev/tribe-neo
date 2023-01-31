import { TribeClient } from '@tribeplatform/gql-client'

import { getTokensType } from '../@types'

export const getTokens: getTokensType = async config => {
  const { networkDomain, networkId, otp } = config

  if (!networkDomain && !networkId && !otp) {
    throw new Error(
      'Please provide either of these arguments to proceed: networkDomain, networkId or otp',
    )
  }
  let graphqlUrl = config?.baseUrl
  if (!graphqlUrl && typeof process !== 'undefined') {
    graphqlUrl = process?.env?.TRIBE_GQL_ENDPOINT
  }

  const client = new TribeClient({
    accessToken: config?.accessToken,
    onError: config?.onError,
    graphqlUrl,
  })

  const authToken = await client.getTokens(
    {
      networkDomain,
      networkId,
      otp,
    },
    'default',
  )

  client.setToken(authToken?.accessToken)

  return { authToken, client }
}
