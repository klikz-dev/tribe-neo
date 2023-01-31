import { useHistory, useLocation } from 'react-router'

import { Types } from '@tribeplatform/gql-client'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

export const useLogin = () => {
  const { data: authToken } = useAuthToken()
  const isGuest = authToken?.role?.type === Types.RoleType.GUEST
  const location = useLocation()
  const { push } = useHistory()

  const showLogin = () => {
    if (!isGuest) return false
    push(
      `/auth/login${
        location?.pathname
          ? `?redirect=${encodeURIComponent(location.pathname)}`
          : ''
      }`,
    )
  }

  const isLoggedIn = !isGuest

  return {
    showLogin,
    isLoggedIn,
  }
}
