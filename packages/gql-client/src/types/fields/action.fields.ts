export type ActionFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const actionGQLFields = (fields: ActionFields): string => {
  return `
    status
  `
}
