import { QuerySpaceMembershipRequestsArgs } from '@tribeplatform/gql-client/types'

export const REQUEST_SPACE_MEMBERSHIP_KEY = 'requestSpaceMembership'
export const APPROVE_SPACE_MEMBERSHIP_REQUEST_KEY =
  'approveSpaceMembershipRequest'
export const DECLINE_SPACE_MEMBERSHIP_REQUEST_KEY =
  'declineSpaceMembershipRequest'
export const MEMBER_SPACE_MEMBERSHIP_REQUEST = 'memberSpaceMembershipRequest'
export const SPACE_MEMBERSHIP_REQUEST = 'spaceMembershipRequest'

export const getRequestSpaceMembershipKey = () => REQUEST_SPACE_MEMBERSHIP_KEY
export const getApproveSpaceMembershipRequestKey = () =>
  APPROVE_SPACE_MEMBERSHIP_REQUEST_KEY
export const getDeclineSpaceMembershipRequestKey = () =>
  DECLINE_SPACE_MEMBERSHIP_REQUEST_KEY
export const getMemberSpaceMembershipRequest = () =>
  MEMBER_SPACE_MEMBERSHIP_REQUEST
export const getSpaceMembershipRequest = (
  args: QuerySpaceMembershipRequestsArgs,
) => [SPACE_MEMBERSHIP_REQUEST, args]
