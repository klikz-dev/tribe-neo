import {
  actionPermissionGQLFields,
  ActionPermissionsFields,
} from './actionPermissions.fields'

export type MemberAuthMemberPropsFields =
  | 'basic'
  | 'all'
  | CustomMemberAuthMemberPropsFields

export interface CustomMemberAuthMemberPropsFields {
  permissions?: ActionPermissionsFields
}

const BASIC_MEMBER_AUTH_MEMBER_PROPS_FIELDS: CustomMemberAuthMemberPropsFields =
  {}
const ALL_MEMBER_AUTH_MEMBER_PROPS_FIELDS: CustomMemberAuthMemberPropsFields = {
  permissions: 'basic',
}

export function memberAuthMemberPropsGQLFields(
  fields: MemberAuthMemberPropsFields,
) {
  if (fields === 'basic') fields = BASIC_MEMBER_AUTH_MEMBER_PROPS_FIELDS
  if (fields === 'all') fields = ALL_MEMBER_AUTH_MEMBER_PROPS_FIELDS
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
