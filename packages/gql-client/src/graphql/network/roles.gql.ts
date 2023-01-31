import gql from 'graphql-tag'

import { RoleFields, roleGQLFields } from './role.fields'

export function getRolesGQLQuery(fields: RoleFields) {
  return gql`
    query GetRoles($orderBy: RoleListOrderByEnum, $reverse: Boolean) {
      roles(orderBy: $orderBy, reverse: $reverse) {
        ${roleGQLFields(fields)}
      }
    }
  `
}
