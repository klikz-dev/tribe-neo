import { Paginated } from '../../types'

export type TagFields = 'basic' | 'all'
export type PaginatedTagFields = Paginated<TagFields>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function tagGQLFields(fields: TagFields) {
  return `
    description
    id
    slug
    title
  `
}
