import { ReactElement } from 'react'

import { IntercomProvider } from 'react-use-intercom'

import { AuthToken, RoleType } from '@tribeplatform/gql-client/types'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'

import { RuntimeConfigs } from '../../config'

export const Intercom: React.FC<{
  children: ReactElement
  authToken: AuthToken | null | undefined
}> = ({ children, authToken }): ReactElement | null => {
  const { data: clientAuthMember } = useAuthMember()
  const authUser = authToken?.member || clientAuthMember

  if (!authUser || authUser?.role?.type !== RoleType.ADMIN) {
    return children
  }

  const appId = RuntimeConfigs.INTERCOM_APP_ID

  if (!appId) {
    console.warn('intercom app id is not defined')
    return children
  }

  return <IntercomProvider appId={appId}>{children}</IntercomProvider>
}
