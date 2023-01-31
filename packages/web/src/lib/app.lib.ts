import {
  AuthToken,
  Role,
  MemberEmailStatus,
  RoleType,
  NetworkStatus,
} from '@tribeplatform/gql-client/types'

export const isMemberNotConfirmed = (member, role?: Role): boolean =>
  !!member &&
  member.emailStatus !== MemberEmailStatus.VERIFIED &&
  role?.type === RoleType.GUEST

export const isUrlPointsWithinApp = (url: string): boolean =>
  url.startsWith('/auth') === false &&
  url.startsWith('/manifest.json') === false

export const isRestricted = (authToken: AuthToken, url: string): boolean => {
  const isAdmin = authToken?.role?.type === RoleType.ADMIN
  const isUnpublished =
    authToken?.networkPublicInfo?.status === NetworkStatus.UNPUBLISHED
  const isArchived =
    authToken?.networkPublicInfo?.status === NetworkStatus.ARCHIVED

  if (isArchived && !url.startsWith('/auth/restricted')) {
    return true
  }

  // For admins everything is allowed.
  // For guests and regular members, only login page is allowed.
  const isURLAllowed =
    isAdmin ||
    url.startsWith('/auth/login') ||
    url.startsWith('/auth/restricted')

  return isUnpublished && !isURLAllowed
}
