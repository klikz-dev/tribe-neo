import { Request, Response } from 'express'

import { TribeClient } from '@tribeplatform/gql-client'

import { RuntimeConfigs } from '../../../config'
import { setSSRAuthCookies } from '../../utils/authCookies.utils'

export async function otp(req: Request, res: Response) {
  const { token: otp } = req.query || {}
  const client = new TribeClient({
    graphqlUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
  })
  try {
    if (otp?.length > 0 && RuntimeConfigs.TRIBE_GQL_ENDPOINT) {
      const authToken = await client.getTokens({
        otp: String(otp),
      })

      const accessToken = authToken?.accessToken
      const refreshToken = authToken?.refreshToken
      if (refreshToken || accessToken) {
        setSSRAuthCookies({ req, res, refreshToken, accessToken })
      }
    }
  } catch (e) {
    console.error('Something went wrong with api/auth/otp', otp, e)
  }

  res.redirect('/')
  res.end()
}
