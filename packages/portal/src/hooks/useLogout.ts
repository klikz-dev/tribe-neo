import { resetGlobalAuthCookies } from '../utils/masterCookies.utils'

export const useLogout = () => {
  const logout = async () => {
    resetGlobalAuthCookies()
    window.location.href = '/auth/login'
  }

  return {
    logout,
  }
}
