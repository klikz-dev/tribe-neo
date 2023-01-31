import { useEffect } from 'react'

import { useLocation } from 'wouter'

import { useSearchParam } from './hooks'
import { getGlobalToken } from './utils/masterCookies.utils'

export const AuthorizedRoute: React.FC = ({ children }) => {
  const globalToken = getGlobalToken()
  const [, setLocation] = useLocation()
  const redirectParam = useSearchParam('redirect')

  useEffect(() => {
    if (!globalToken) {
      setLocation(
        `/auth/login${
          redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''
        }`,
      )
    }
  }, [globalToken, setLocation, redirectParam])

  return <>{children}</>
}
