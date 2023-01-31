import { MemberFields, memberGQLFields } from '../network'
import { PostFields, postGQLFields, TagFields, tagGQLFields } from '../post'
import { SpaceFields, spaceGQLFields } from '../space'

export type ReportableEntityFields =
  | 'basic'
  | 'all'
  | CustomReportableEntityFields

export interface CustomReportableEntityFields {
  onMember?: MemberFields
  onPost?: PostFields
  onSpace?: SpaceFields
  onTag?: TagFields
}

const BASIC_REPORTABLE_ENTITY_FIELDS: CustomReportableEntityFields = {}
const ALL_REPORTABLE_ENTITY_FIELDS: CustomReportableEntityFields = {
  onMember: 'basic',
  onPost: 'basic',
  onSpace: 'basic',
  onTag: 'basic',
}

export function reportableEntityGQLFields(
  fields: ReportableEntityFields,
): string {
  if (fields === 'basic') fields = BASIC_REPORTABLE_ENTITY_FIELDS
  if (fields === 'all') fields = ALL_REPORTABLE_ENTITY_FIELDS
  return `
    __typename
    ${
      fields.onMember
        ? `
      ... on Member {
        ${memberGQLFields(fields.onMember)}
      }
    `
        : ``
    }
    ${
      fields.onPost
        ? `
      ... on Post {
        ${postGQLFields(fields.onPost)}
      }
    `
        : ``
    }
    ${
      fields.onSpace
        ? `
      ... on Space {
        ${spaceGQLFields(fields.onSpace)}
      }
    `
        : ``
    }
    ${
      fields.onTag
        ? `
      ... on Tag {
        ${tagGQLFields(fields.onTag)}
      }
    `
        : ``
    }
  `
}
