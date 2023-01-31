import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'

import { isAdminEmailNotConfirmed } from './utils'

export const EmailVerificationBanner = () => {
  const { data: authToken } = useAuthToken()

  if (!isAdminEmailNotConfirmed(authToken.member)) {
    return null
  }

  return (
    <Alert status="info" title="Admin email address is not verified">
      Please{' '}
      <a
        className="underline"
        href={`/auth/verify?memberId=${authToken.member?.id}`}
      >
        confirm your email address
      </a>{' '}
      to invite members.
    </Alert>
  )
}
