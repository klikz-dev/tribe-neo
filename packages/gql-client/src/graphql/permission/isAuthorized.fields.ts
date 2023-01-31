export type IsAuthorizedFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isAuthorizedGQLFields(fields: IsAuthorizedFields): string {
  return `
    authorized
    reason
    requiredPlan
  `
}
