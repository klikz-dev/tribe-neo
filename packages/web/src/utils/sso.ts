import { SsoType } from '@tribeplatform/gql-client/types'

import { RuntimeConfigs } from '../config'

export const getSsoCallbackUrl = (
  type,
  domain: string,
  redirect?: string,
): string => {
  const SsoCallbackUrl = RuntimeConfigs.SSOS_CALLBACK_URL
  let callbackUrl
  if (SsoCallbackUrl) {
    if (type === SsoType.OAUTH2) {
      callbackUrl = `https://${domain}/ssos/redirect${
        redirect ? `?redirect_uri=${redirect}` : ''
      }`
    } else {
      callbackUrl = `${SsoCallbackUrl}?redirect_uri=${redirect || '/'}`
    }
  }

  return callbackUrl
}
