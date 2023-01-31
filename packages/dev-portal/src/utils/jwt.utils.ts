import jwtDecode from 'jwt-decode'

import { logger } from '../lib/logger'

interface AccessToken {
  id: string
  networkId: string
  networkDomain: string
  role: string
  roleId: string
  roleType: string
  iat: number
  exp: number
}

interface GlobalToken {
  email: string
  iat: number
  exp: number
}

export const parseAccessToken = (
  token: string | undefined,
): AccessToken | undefined => {
  if (!token) {
    return
  }
  try {
    return jwtDecode(token) as AccessToken
  } catch (e) {
    logger.error('error - parsing accessToken', token, e)
  }
}

export const parseGlobalToken = (
  token: string | undefined,
): GlobalToken | undefined => {
  if (!token) {
    return
  }
  try {
    return jwtDecode(token) as GlobalToken
  } catch (e) {
    logger.error('error - parsing accessToken', token, e)
  }
}

export const isExpired = (jwtToken: AccessToken) => {
  return Date.now() >= jwtToken.exp * 1000
}
