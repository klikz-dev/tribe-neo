import { useEffect } from 'react'

import { useLocation } from 'wouter'

import { getRuntimeConfigVariable } from '../../config'
import { getGlobalToken } from '../../utils/masterCookies.utils'

export const AuthorizedRoute: React.FC = ({ children }) => {
  const globalToken = getGlobalToken()
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!globalToken) {
      window.location.href = `${getRuntimeConfigVariable(
        'DEV_PORTAL_UNAUTHORIZED_REDIRECT_URL',
      )}?redirect=${encodeURIComponent(window.location.href)}`
    }
  }, [globalToken, setLocation])

  if (!globalToken) {
    return null
  }

  return <>{children}</>
}
