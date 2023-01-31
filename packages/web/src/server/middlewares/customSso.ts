import { Request, Response, NextFunction } from 'express'

import { SsoStatus, SsoType } from '@tribeplatform/gql-client/types'
import { Keys } from '@tribeplatform/react-sdk/lib'

import { getSsoCallbackUrl } from '../../utils/sso'

export const redirectToCustomSsoFromAuthPages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { queryClient, client, appInitialProps } = res.locals

    const result = await client.auth.ssos({ status: SsoStatus.ENABLE })
    queryClient?.setQueryData(Keys.getSsosKey(), result)

    const oauth2 = result?.find(sso => sso.type === SsoType.OAUTH2)

    // check oauth2 is the only provider
    if (
      result?.length === 1 &&
      oauth2 &&
      appInitialProps.authToken.network.hideDefaultAuthenticationForm
    ) {
      const callbackUrl = getSsoCallbackUrl(
        oauth2.type,
        appInitialProps.authToken.networkPublicInfo.domain,
        req.query?.redirect ? String(req.query?.redirect) : undefined,
      )

      const response = await client.auth.ssoUrl({
        input: {
          type: oauth2.type,
          callbackUrl,
        },
      })

      if (response?.url) {
        res.redirect(response?.url)
        return
      }
    }
  } catch (e) {
    console.warn('error in redirect auth pages', e)
  }

  next()
}
