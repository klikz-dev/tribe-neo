import gql from 'graphql-tag'

import { SpaceRoleFields, spaceRoleGQLFields } from './spaceRole.fields'

export function getSpaceRolesGQLQuery(fields: SpaceRoleFields) {
  return gql`
    query GetSpaceRoles(
      $spaceId: ID!
      $orderBy: SpaceRoleListOrderByEnum
      $reverse: Boolean
    ) {
      spaceRoles(spaceId: $spaceId, orderBy: $orderBy, reverse: $reverse) {
        ${spaceRoleGQLFields(fields)}
      }
    }
  `
}
