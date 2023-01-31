import { Request, Response } from 'express'

import { TribeClient } from '@tribeplatform/gql-client'

import { RuntimeConfigs } from '../../../config'
import { isExpired, parseToken } from '../../../lib/accessToken'
import {
  getSSRAuthCookies,
  setSSRAuthCookies,
} from '../../utils/authCookies.utils'

/**
 * Obtain a new refreshToken or access token depends on:
 *  If the refresh token is provided on the request body we get a new refresh and access token
 *  Else if, we are using the existing refresh token on the request cookie to update the access token only
 * @returns AuthToken
 */
export async function refreshToken(req: Request, res: Response) {
  if (!RuntimeConfigs.TRIBE_GQL_ENDPOINT) {
    console.warn('BaseUrl is not defined')
    res.status(500).send('Something went wrong')
    return
  }

  const { networkDomain } = req.body
  let { refreshToken } = req.body
  const { accessToken, refreshToken: cookieRefreshToken } = getSSRAuthCookies({
    req,
    res,
  })

  if (!refreshToken) {
    // we should not update the refresh token if the access token still valid
    const hasAccessTokenExpired = isExpired(parseToken(accessToken))
    if (hasAccessTokenExpired) {
      refreshToken = cookieRefreshToken
    }
  }
  const client = new TribeClient({
    graphqlUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
    accessToken,
  })

  try {
    const authToken = await client.getTokens({
      networkDomain,
      refreshToken,
    })

    if (authToken) {
      const { refreshToken: newRt, accessToken: newAt } = authToken

      setSSRAuthCookies({ req, res, refreshToken: newRt, accessToken: newAt })

      res.status(200).json(authToken)
      return
    }
  } catch (e) {
    console.error('Something went wrong with api/auth/refresh-token', e)
  }

  res.status(500).send('Something went wrong')
}
