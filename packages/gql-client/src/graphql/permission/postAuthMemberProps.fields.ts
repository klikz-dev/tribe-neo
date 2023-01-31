import { PostTypeFields, postTypeGQLFields } from '../post/postType.fields'
import {
  actionPermissionGQLFields,
  ActionPermissionsFields,
} from './actionPermissions.fields'

export type PostAuthMemberPropsFields =
  | 'basic'
  | 'all'
  | CustomPostAuthMemberPropsFields

export interface CustomPostAuthMemberPropsFields {
  permissions?: ActionPermissionsFields
  availableReplyTypes?: PostTypeFields
  canReact?: boolean
  memberPostNotificationSettingsEnabled?: boolean
}

const BASIC_POST_AUTH_MEMBER_PROPS_FIELDS: CustomPostAuthMemberPropsFields = {}
const ALL_POST_AUTH_MEMBER_PROPS_FIELDS: CustomPostAuthMemberPropsFields = {
  permissions: 'basic',
  availableReplyTypes: 'basic',
  canReact: true,
  memberPostNotificationSettingsEnabled: true,
}

export function postAuthMemberPropsGQLFields(
  fields: PostAuthMemberPropsFields,
): string {
  if (fields === 'basic') fields = BASIC_POST_AUTH_MEMBER_PROPS_FIELDS
  if (fields === 'all') fields = ALL_POST_AUTH_MEMBER_PROPS_FIELDS
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
      ${
        fields.availableReplyTypes
          ? `
          availableReplyTypes {
              ${postTypeGQLFields(fields.availableReplyTypes)}
          }
          `
          : ''
      }
      ${
        fields.canReact
          ? `
      canReact
      `
          : ''
      }
      ${
        fields.memberPostNotificationSettingsEnabled
          ? `
      memberPostNotificationSettingsEnabled
      `
          : ''
      }
    `
}
