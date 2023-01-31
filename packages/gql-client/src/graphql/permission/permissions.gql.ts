import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import {
  actionPermissionGQLFields,
  ActionPermissionsFields,
} from './actionPermissions.fields'

export function getPermissionsGQLQuery(
  fields: ActionPermissionsFields,
): DocumentNode {
  return gql`
    query GetPermissions($contexts: [PermissionsContextInput!] = []) {
      permissions(contexts: $contexts) {
        contextAwareActions {
          context
          entityActions {
            id
            actions {
              ${actionPermissionGQLFields(fields)}
            }
          }
        }
      }
    }
  `
}
