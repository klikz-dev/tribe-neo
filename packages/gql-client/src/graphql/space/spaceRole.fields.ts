export type SpaceRoleFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function spaceRoleGQLFields(fields: SpaceRoleFields) {
  return `
    id
    name
    type
    description
  `
}
