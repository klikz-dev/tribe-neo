import jwtDecode from 'jwt-decode'

interface GlobalToken {
  email: string
  iat: number
  exp: number
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
    console.error('error - parsing globalToken', token, e)
  }
}
