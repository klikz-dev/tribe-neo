import { parseGlobalToken } from '../utils/jwt.utils'
import { getGlobalToken } from '../utils/masterCookies.utils'

export const useGlobalToken = () => {
  const globalToken = getGlobalToken()
  const parsedToken = parseGlobalToken(globalToken)

  return {
    isLoggedIn: !!globalToken,
    globalToken,
    email: parsedToken?.email,
  }
}
