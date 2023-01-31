import jwtDecode from 'jwt-decode'

import { TribeClient } from '@tribeplatform/gql-client'

import { RuntimeConfigs, StaticConfigs } from '../../config'
import { setSSRAuthCookies } from '../utils/authCookies.utils'

export const ssosRedirect = async (req, res) => {
  const { query } = req
  const { state } = query
  if (state) {
    try {
      const parsedState: any = jwtDecode(state, {
        header: true,
      })
      const networkDomain = parsedState?.networkDomain
      // check for domain name if its not the same let's redirect to network domain
      if (networkDomain !== req.hostname && StaticConfigs.IS_PROD) {
        res.redirect(`https://${networkDomain}${req?.url}`)
        res.end()
        return
      }
    } catch (error) {
      console.info('error parsing ssos state', state, error)
    }
  }

  const client = new TribeClient({
    graphqlUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
  })

  // let's redirect here
  const code = query?.code ? query.code : ''
  const hd = query?.hd ? query.hd : ''
  const prompt = query?.prompt ? query.prompt : ''
  const scope = query?.scope ? query.scope : ''
  const redirectUri = query?.redirect_uri ? query.redirect_uri : ''

  if (!code && !hd && !prompt && !scope && !state) {
    res.redirect('/')
    return
  }
  try {
    const authToken = await client.auth.ssoRedirect({
      input: {
        code,
        state: state || '',
        hd,
        prompt,
        scope,
      },
    })

    const { refreshToken, accessToken } = authToken || {}
    if (refreshToken || accessToken) {
      setSSRAuthCookies({ req, res, refreshToken, accessToken })

      res.redirect(redirectUri || '/')
      res.end()
      return
    }
  } catch (e) {
    console.info('error ssos oatuh', e)
  }

  res.redirect('/')
}
