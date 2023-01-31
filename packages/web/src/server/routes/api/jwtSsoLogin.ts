import { Request, Response } from 'express'

import { TribeClient } from '@tribeplatform/gql-client'

import { RuntimeConfigs } from '../../../config'
import { setSSRAuthCookies } from '../../utils/authCookies.utils'

export async function jwtSsoLogin(req: Request, res: Response) {
  const { token } = req.query ?? {}
  const client = new TribeClient({
    graphqlUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
  })

  const networkDomain = req.hostname

  try {
    if (token?.length > 0 && RuntimeConfigs.TRIBE_GQL_ENDPOINT) {
      const authToken = await client.getTokens({
        ssoToken: String(token),
        networkDomain,
      })

      const accessToken = authToken?.accessToken
      const refreshToken = authToken?.refreshToken
      if (refreshToken || accessToken) {
        setSSRAuthCookies({ req, res, refreshToken, accessToken })
      }
    }
  } catch (e) {
    console.error('Something went wrong with api/auth/sso', token, e)
  }

  res.redirect('/')
  res.end()
}
