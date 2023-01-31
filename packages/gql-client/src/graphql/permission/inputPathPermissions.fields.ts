import { isAuthorizedGQLFields } from './isAuthorized.fields'

export type InputPathPermissionsFields = 'basic' | 'all'

export function inputPathPermissionsGQLFields(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fields: InputPathPermissionsFields,
): string {
  return `
    path
    isAuthorized {
      ${isAuthorizedGQLFields('basic')}
    }
  `
}
