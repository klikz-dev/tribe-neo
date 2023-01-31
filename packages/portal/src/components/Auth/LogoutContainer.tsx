import { useEffect } from 'react'

import { useLogout } from '../../hooks/useLogout'

export const LogoutContainer = () => {
  const { logout } = useLogout()

  useEffect(() => {
    logout()
  }, [])

  return null
}
