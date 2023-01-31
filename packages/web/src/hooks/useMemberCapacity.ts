import { useEffect, useState } from 'react'

import { Plan, PlanName } from '@tribeplatform/gql-client/types'
import { useTribeClient } from '@tribeplatform/react-sdk'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

export interface UseMemberCapacity {
  didReachLimit: boolean
  isApproachingLimit: boolean
  isLoading: boolean
  memberCapacity: number
  memberCapacityDeclared: number
  totalInvitationCount: number
}

export const getLimitTreshold = (plan: Plan): number => {
  if (plan?.trial) {
    return 0.75
  }

  switch (plan?.name) {
    default:
    case PlanName.BASIC:
      return 0.75

    case PlanName.PLUS:
    case PlanName.PREMIUM:
    case PlanName.ENTERPRISE:
      return 0.9
  }
}

export const useMemberCapacity = (): UseMemberCapacity => {
  const {
    data: { network },
    isLoading: isNetworkLoading,
  } = useAuthToken()
  const { client } = useTribeClient()
  const [totalInvitationCount, setTotalInvitationCount] = useState(0)

  useEffect(() => {
    ;(async () => {
      const memberInvitations = await client.invitations.list({ limit: 0 })
      setTotalInvitationCount(memberInvitations.totalCount)
    })()
  }, [client])

  const memberCapacity = network?.memberCapacity
  const memberCapacityDeclared = network?.memberCapacityDeclared

  const didReachLimit =
    memberCapacityDeclared + totalInvitationCount >= memberCapacity
  const isApproachingLimit = !!(
    network?.subscriptionPlan &&
    memberCapacityDeclared + totalInvitationCount >=
      getLimitTreshold(network?.subscriptionPlan) * memberCapacity &&
    memberCapacityDeclared + totalInvitationCount < memberCapacity
  )

  const isLoading = isNetworkLoading

  return {
    didReachLimit,
    isApproachingLimit,
    isLoading,
    memberCapacity: network?.memberCapacity,
    memberCapacityDeclared: network?.memberCapacityDeclared,
    totalInvitationCount,
  }
}
