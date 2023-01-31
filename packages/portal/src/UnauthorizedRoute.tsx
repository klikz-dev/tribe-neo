import { useEffect } from 'react'

import { getRuntimeConfigVariable } from './config'
import { getGlobalToken } from './utils/masterCookies.utils'

export const UnauthorizedRoute: React.FC = ({ children }) => {
  const globalToken = getGlobalToken()

  useEffect(() => {
    if (globalToken) {
      window.location.href = getRuntimeConfigVariable(
        'PORTAL_AUTHORIZED_REDIRECT_URL',
      )
    }
  }, [globalToken])

  return <>{children}</>
}
