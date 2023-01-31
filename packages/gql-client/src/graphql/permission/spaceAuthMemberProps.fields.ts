import { PostTypeFields, postTypeGQLFields } from '..'
import {
  ActionPermissionsFields,
  actionPermissionGQLFields,
} from './actionPermissions.fields'

export type SpaceAuthMemberPropsFields =
  | 'basic'
  | 'all'
  | CustomSpaceAuthMemberPropsFields

export interface CustomSpaceAuthMemberPropsFields {
  permissions?: ActionPermissionsFields
  availablePostTypes?: PostTypeFields
}

const BASIC_SPACE_AUTH_MEMBER_PROPS_FIELDS: CustomSpaceAuthMemberPropsFields =
  {}
const ALL_SPACE_AUTH_MEMBER_PROPS_FIELDS: CustomSpaceAuthMemberPropsFields = {
  permissions: 'basic',
  availablePostTypes: 'basic',
}

export function spaceAuthMemberPropsGQLFields(
  fields: SpaceAuthMemberPropsFields,
): string {
  if (fields === 'basic') fields = BASIC_SPACE_AUTH_MEMBER_PROPS_FIELDS
  if (fields === 'all') fields = ALL_SPACE_AUTH_MEMBER_PROPS_FIELDS
  return `
    context
    scopes
    membershipStatus
    ${
      fields.permissions
        ? `
      permissions {
        ${actionPermissionGQLFields(fields.permissions)}
      }
    `
        : ``
    }
    ${
      fields.availablePostTypes
        ? `
      availablePostTypes {
        ${postTypeGQLFields(fields.availablePostTypes)}
      }`
        : ''
    }
  `
}
