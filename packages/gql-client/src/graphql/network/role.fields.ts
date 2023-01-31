export type RoleFields = 'basic' | 'all'

export function roleGQLFields(fields: RoleFields) {
  return `
    id
    name
    type
    description
    visible
    ${fields === 'all' ? 'scopes' : ''}
  `
}
