import { ApiErrorCodes, TribeClient } from '@tribeplatform/gql-client'
import { Keys } from '@tribeplatform/react-sdk/lib'

import { AppContext, AppInitialProps } from '../../@types'
import { RuntimeConfigs } from '../../config'
import { isExpired, parseToken } from '../../lib/accessToken'
import { isRestricted } from '../../lib/app.lib'
import { generateIntercomUserHash } from '../../lib/intercom/generateUserHash'
import {
  CommunityNotFoundError,
  CommunityUnavailableError,
  SessionMismatchError,
  UnkownServerError,
} from '../errors'
import {
  getSSRAuthCookies,
  resetSSRAuthCookies,
  setSSRAuthCookies,
} from './authCookies.utils'

/**
 * This function will be running on the initial request and on the server side only
 * @param context NextJs Context
 * @param options Option to compile the page component
 * @returns pageProps
 */

const getTokensQuery = async (context: AppContext) => {
  const { queryClient, req, res } = context

  // FORCED_NETWORK_DOMAIN can be truthy only within dev environments
  const networkDomain = RuntimeConfigs.FORCED_NETWORK_DOMAIN || req.hostname

  try {
    const { refreshToken, accessToken } = getSSRAuthCookies(context)
    const client = new TribeClient({
      graphqlUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
      accessToken,
    })

    // we should not update the refresh token if the access token still valid
    const hasAccessTokenExpired = isExpired(parseToken(accessToken))
    const authToken = await client.getTokens({
      networkDomain,
      refreshToken: hasAccessTokenExpired ? refreshToken : undefined,
    })

    client.setToken(accessToken)

    queryClient.setQueryData(Keys.getAuthTokensKey(), authToken)

    setSSRAuthCookies({
      accessToken: authToken?.accessToken,
      refreshToken: authToken?.refreshToken,
      req,
      res,
    })
    return { authToken, client, networkDomain }
  } catch (error) {
    resetSSRAuthCookies({ req, res })
    return { errors: error?.response?.errors || error, networkDomain }
  }
}

export const getAppInitialProps = async (
  context: AppContext,
): Promise<AppInitialProps> => {
  const { req } = context
  const { url } = req
  const optimizelyDataFile = null

  const { authToken, client, errors, networkDomain } = await getTokensQuery(
    context,
  )

  if (
    Array.isArray(errors) &&
    errors[0]?.code === String(ApiErrorCodes.RESOURCE_NOT_FOUND) &&
    context?.req.headers.host !== RuntimeConfigs.TRIBE_APP_DOMAIN
  ) {
    const fullUrl = req.headers?.host + req.originalUrl
    throw new CommunityNotFoundError(networkDomain, fullUrl, errors)
  }

  if (errors || !authToken) {
    throw new UnkownServerError('Something went wrong', errors)
  }

  if (!authToken?.network) {
    if (authToken && url && isRestricted(authToken, url)) {
      throw new CommunityUnavailableError(req.headers.host)
    }
  }

  // check for domain name if its not the same let's redirect to network domain
  const devNetwork = RuntimeConfigs.FORCED_NETWORK_DOMAIN
  if (
    !devNetwork &&
    authToken?.networkPublicInfo?.domain &&
    authToken?.networkPublicInfo?.domain !== context?.req.hostname
  ) {
    throw new SessionMismatchError(
      authToken.networkPublicInfo.domain,
      context.req.url,
    )
  }

  context.authToken = authToken
  context.client = client

  return {
    optimizelyDataFile,
    authToken: context.authToken,
    intercomUserHash: generateIntercomUserHash(authToken?.accessToken),
  }
}
