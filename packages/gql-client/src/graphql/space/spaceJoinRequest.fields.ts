import { MemberFields, memberGQLFields } from '../network'

export type SpaceJoinRequestFields =
  | 'basic'
  | 'all'
  | CustomSpaceJoinRequestFields

export interface CustomSpaceJoinRequestFields {
  member?: MemberFields
}

const BASIC_SPACE_JOIN_REQUEST_FIELDS: CustomSpaceJoinRequestFields = {}
const ALL_SPACE_JOIN_REQUEST_FIELDS: CustomSpaceJoinRequestFields = {
  member: 'basic',
}

export const spaceJoinRequestGQLFields = (fields: SpaceJoinRequestFields) => {
  if (fields === 'basic') fields = BASIC_SPACE_JOIN_REQUEST_FIELDS
  if (fields === 'all') fields = ALL_SPACE_JOIN_REQUEST_FIELDS
  return `
    id
    spaceId
    status
    ${
      fields.member
        ? `
      member {
        ${memberGQLFields(fields.member)}
      }
    `
        : ``
    }
  `
}
