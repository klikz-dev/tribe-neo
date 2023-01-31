import { useMemo } from 'react'

import ClockIcon from '@heroicons/react/outline/ClockIcon'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import {
  Space,
  SpaceJoinRequestStatus,
  SpaceMembershipStatus,
} from '@tribeplatform/gql-client/types'
import {
  useJoinSpace,
  useLeaveSpace,
  useMemberSpaceMembershipRequest,
  useRequestSpaceMembership,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { useLogin } from '../../hooks/useLogin'

const getButtonProps = (
  state: SpaceMembershipStatus | SpaceJoinRequestStatus,
  permission,
) => {
  switch (state) {
    case SpaceMembershipStatus.JOINED:
      return { label: 'Leave' }
    case SpaceMembershipStatus.NOT_JOINED:
      if (permission.canJoinSpace || !permission.isLoggedIn)
        return { label: 'Join' }
      if (permission.canRequestSpaceMembership)
        return { label: 'Request to Join' }
      return undefined
    case SpaceJoinRequestStatus.PENDING:
    case SpaceMembershipStatus.REQUESTED:
      return { label: 'Pending', icon: <ClockIcon />, disabled: true }
    default:
      return undefined
  }
}

export const SpaceMembershipButton = ({ space }: { space: Space }) => {
  const { mutate: join, isLoading: joining } = useJoinSpace({
    spaceSlug: space?.slug,
  })
  const { mutate: leave, isLoading: leaving } = useLeaveSpace({
    spaceSlug: space?.slug,
  })
  const { data } = useMemberSpaceMembershipRequest({
    variables: {
      status: SpaceJoinRequestStatus.PENDING,
    },
    useQueryOptions: {
      refetchOnMount: 'always',
    },
  })
  const spaceJoinRequest = useMemo(
    () => data?.find(d => d.spaceId === space.id),
    [data, space.id],
  )
  const { mutate: requestSpaceMembership } = useRequestSpaceMembership()
  const { isLoggedIn, showLogin } = useLogin()

  const [canJoinSpace, canRequestSpaceMembership] = hasScopesPermission(space, [
    'joinSpace',
    'requestSpaceMembership',
  ])

  if (!space) return null

  const { membershipStatus } = space?.authMemberProps || {}
  const btnProps = getButtonProps(
    spaceJoinRequest?.status ||
      membershipStatus ||
      SpaceMembershipStatus.NOT_JOINED,
    { canJoinSpace, canRequestSpaceMembership, isLoggedIn },
  )
  if (!btnProps) return null

  return (
    <Button
      disabled={btnProps.disabled || joining || leaving}
      loading={joining || leaving}
      variant="outline"
      leadingIcon={btnProps.icon}
      onClick={() => {
        if (!isLoggedIn) return showLogin()
        const spaceId = space.id

        if (membershipStatus === SpaceMembershipStatus.JOINED) {
          leave({
            spaceId,
          })
          return
        }
        if (membershipStatus === SpaceMembershipStatus.NOT_JOINED) {
          if (canJoinSpace) {
            join({
              spaceId,
            })
          } else {
            requestSpaceMembership({
              spaceId,
            })
          }
        }
      }}
    >
      {btnProps.label}
    </Button>
  )
}
