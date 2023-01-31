import { isAuthorizedGQLFields } from './isAuthorized.fields'

export type PathPermissionsFields = 'basic' | 'all'

export function pathPermissionsGQLFields(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fields: PathPermissionsFields,
): string {
  return `
    path
    isAuthorized {
      ${isAuthorizedGQLFields('basic')}
    }
  `
}
