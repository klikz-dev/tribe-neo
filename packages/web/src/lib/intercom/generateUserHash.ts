import crypto from 'crypto'

import { ServerOnlyConfigs } from '../../config'
import { parseToken } from '../accessToken'

export const generateIntercomUserHash = (
  accessToken: string,
): string | undefined => {
  if (!accessToken) return

  const parsedToken = parseToken(accessToken)
  const userId = parsedToken?.id

  if (!accessToken || !parsedToken || !userId) return

  const verificationSecret = ServerOnlyConfigs.INTERCOM_VERIFICATION_SECRET

  if (!verificationSecret) {
    console.warn('intercom verificationSecret is not defined')
    return
  }

  const hmac = crypto.createHmac('sha256', verificationSecret)
  return hmac.update(userId).digest('hex')
}
