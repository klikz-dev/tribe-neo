import {
  actionPermissionGQLFields,
  ActionPermissionsFields,
} from './actionPermissions.fields'

export type NetworkAuthMemberPropsFields =
  | 'basic'
  | 'all'
  | CustomNetworkAuthMemberPropsFields

export interface CustomNetworkAuthMemberPropsFields {
  permissions?: ActionPermissionsFields
}

const BASIC_NETWORK_AUTH_MEMBER_PROPS_FIELDS: CustomNetworkAuthMemberPropsFields =
  {}
const ALL_NETWORK_AUTH_MEMBER_PROPS_FIELDS: CustomNetworkAuthMemberPropsFields =
  {
    permissions: 'basic',
  }

export function networkAuthMemberPropsGQLFields(
  fields: NetworkAuthMemberPropsFields,
): string {
  if (fields === 'basic') fields = BASIC_NETWORK_AUTH_MEMBER_PROPS_FIELDS
  if (fields === 'all') fields = ALL_NETWORK_AUTH_MEMBER_PROPS_FIELDS
  return `
    context
    scopes
    ${
      fields.permissions
        ? `
      permissions {
        ${actionPermissionGQLFields(fields.permissions)}
      }
    `
        : ``
    }
  `
}
