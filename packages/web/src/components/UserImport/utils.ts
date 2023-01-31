import {
  RoleType,
  Member,
  MemberStatus,
  Role,
} from '@tribeplatform/gql-client/types'

export const isAdminEmailNotConfirmed = (
  member: Member,
  role?: Role,
): boolean => {
  const roleType = member?.role?.type || role?.type

  return (
    !!roleType &&
    !!member?.status &&
    member.status !== MemberStatus.VERIFIED &&
    roleType === RoleType.ADMIN
  )
}
