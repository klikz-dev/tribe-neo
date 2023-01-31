import { Paginated } from '../../types'
import { MemberFields, memberGQLFields } from '../network'
import { SpaceFields, spaceGQLFields } from './space.fields'
import { SpaceRoleFields, spaceRoleGQLFields } from './spaceRole.fields'

export type SpaceMemberFields = 'basic' | 'all' | CustomSpaceMemberFields
export type PaginatedSpaceMemberFields = Paginated<SpaceMemberFields>

export interface CustomSpaceMemberFields {
  member?: MemberFields
  role?: SpaceRoleFields
  space?: SpaceFields
}

const BASIC_SPACE_MEMBER_FIELDS: CustomSpaceMemberFields = {}
const ALL_SPACE_MEMBER_FIELDS: CustomSpaceMemberFields = {
  member: 'basic',
  role: 'basic',
  space: 'basic',
}

export function spaceMemberGQLFields(fields: SpaceMemberFields) {
  if (fields === 'basic') fields = BASIC_SPACE_MEMBER_FIELDS
  if (fields === 'all') fields = ALL_SPACE_MEMBER_FIELDS

  return `
    __typename
    ${
      fields.member
        ? `
      member {
        ${memberGQLFields(fields.member)}
      }
    `
        : ``
    }
    ${
      fields.role
        ? `
      role {
        ${spaceRoleGQLFields(fields.role)}
      }
    `
        : ``
    }
    ${
      fields.space
        ? `
        space {
          ${spaceGQLFields(fields.space)}
        }
    `
        : ``
    }
  `
}
