import { Paginated } from '../../types'
import { PostTypeFields, postTypeGQLFields } from '../post'

export type SpaceTypeFields = 'basic' | 'all' | CustomSpaceTypeFields
export type PaginatedSpaceTypeFields = Paginated<SpaceTypeFields>

export interface CustomSpaceTypeFields {
  availablePostTypes?: PostTypeFields
}

const BASIC_SPACE_TYPE_FIELDS: CustomSpaceTypeFields = {}
const ALL_SPACE_TYPE_FIELDS: CustomSpaceTypeFields = {
  availablePostTypes: 'basic',
}

export function spaceTypeGQLFields(fields: SpaceTypeFields) {
  if (fields === 'basic') fields = BASIC_SPACE_TYPE_FIELDS
  if (fields === 'all') fields = ALL_SPACE_TYPE_FIELDS

  return `
    id
    name
    ${
      fields.availablePostTypes
        ? `
      availablePostTypes {
        ${postTypeGQLFields(fields.availablePostTypes)}
      }
    `
        : ``
    }
  `
}
