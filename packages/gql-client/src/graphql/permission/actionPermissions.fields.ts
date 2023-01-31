import { inputPathPermissionsGQLFields } from './inputPathPermissions.fields'
import { isAuthorizedGQLFields } from './isAuthorized.fields'
import { pathPermissionsGQLFields } from './pathPermissions.fields'

export type ActionPermissionsFields = 'basic' | 'all'

export function actionPermissionGQLFields(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fields: ActionPermissionsFields,
): string {
  return `
    name
    isAuthorized {
      ${isAuthorizedGQLFields('basic')}
    }
    inputPermissions {
      ${inputPathPermissionsGQLFields('basic')}
    }
    outputPermissions {
      ${pathPermissionsGQLFields('basic')}
    }
  `
}
