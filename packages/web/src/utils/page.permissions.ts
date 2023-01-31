import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { RoleType } from '@tribeplatform/gql-client/types'

export const pageQueriesMapping = {
  login: {
    query: 'loginNetwork',
    authorizedRoles: [RoleType.GUEST],
  },
  signup: {
    query: 'joinNetwork',
    authorizedRoles: [RoleType.GUEST],
  },
  search: {
    query: 'search',
  },
  notifications: {
    query: 'notifications',
  },
  collections: {
    query: 'collections',
  },
  members: {
    query: 'members',
  },
  spaces: {
    query: 'spaces',
  },
  profile: {
    query: 'authMember',
  },
}

export const getPagePermissions = ({ network, roleType }) => {
  const pageScopes = Object.keys(pageQueriesMapping).map(key => [
    key,
    pageQueriesMapping[key],
  ])
  const permissions = hasScopesPermission(
    network,
    pageScopes.map(p => p[1].query),
  )
  const pagePermissions: Record<string, boolean> = permissions
    .map((queryAuthorized, idx) => {
      let authorized = queryAuthorized
      const pageMapping = pageScopes[idx][1]
      if (
        pageMapping?.authorizedRoles &&
        !pageMapping?.authorizedRoles?.includes(roleType)
      )
        authorized = false
      return { [pageScopes[idx][0]]: authorized }
    })
    .reduce((preValue, value) => ({ ...preValue, ...value }), {})
  return pagePermissions
}
