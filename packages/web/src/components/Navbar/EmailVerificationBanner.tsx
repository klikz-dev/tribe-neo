import { Link } from 'react-router-dom'

import { MemberStatus, RoleType } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

export const EmailVerificationBanner = () => {
  const { data: authToken } = useAuthToken()
  const { member } = authToken || {}
  const roleType = member?.role?.type

  const isUnverifiedAdmin =
    !!roleType &&
    !!member &&
    member?.status === MemberStatus.UNVERIFIED &&
    roleType === RoleType.ADMIN

  if (!isUnverifiedAdmin) return null

  return (
    <div className="relative bg-actionPrimary-500">
      <div className="max-w-8xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-medium text-white">
            Please{' '}
            <Link className="underline" to="/auth/verify">
              confirm your email address
            </Link>{' '}
            to invite members.
          </p>
        </div>
      </div>
    </div>
  )
}
