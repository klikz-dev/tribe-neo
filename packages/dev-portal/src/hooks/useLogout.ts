import { getRuntimeConfigVariable } from '../config'

export const useLogout = () => {
  const logout = async () => {
    window.location.href = `${getRuntimeConfigVariable(
      'DEV_PORTAL_UNAUTHORIZED_REDIRECT_URL',
    )}/auth/logout`
  }

  return {
    logout,
  }
}
