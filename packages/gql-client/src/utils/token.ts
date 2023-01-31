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

export const parseToken = (accessToken: string): AccessToken | undefined => {
  if (!accessToken) {
    return
  }
  try {
    return jwt_decode(accessToken) as AccessToken
  } catch (e) {
    console.error('error - parsing token', accessToken, e)
  }
}
