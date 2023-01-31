// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

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

export const isExpired = (jwtToken?: AccessToken): boolean => {
  if (!jwtToken) return true
  // Adding 10 seconds
  return Date.now() >= (jwtToken.exp + 10) * 1000
}

export const parseToken = (accessToken: string): AccessToken | undefined => {
  if (!accessToken) {
    return
  }
  try {
    return jwt_decode(accessToken) as AccessToken
  } catch (e) {
    console.error('error - parsing accessToken', accessToken, e)
  }
}
