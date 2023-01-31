import { MemberFields, memberGQLFields } from '../network'
import { PostFields, postGQLFields } from '../post'

export type ModerationItemEntityFields =
  | 'basic'
  | 'all'
  | CustomModerationItemEntityFields

export interface CustomModerationItemEntityFields {
  onMember?: MemberFields
  onPost?: PostFields
}

const BASIC_MODERATION_ITEM_ENTITY_FIELDS: CustomModerationItemEntityFields = {
  onMember: 'basic',
  onPost: 'basic',
}
const ALL_MODERATION_ITEM_ENTITY_FIELDS: CustomModerationItemEntityFields = {
  onMember: 'all',
  onPost: 'all',
}

export const moderationItemEntityGQLFields = (
  fields: ModerationItemEntityFields,
) => {
  if (fields === 'basic') fields = BASIC_MODERATION_ITEM_ENTITY_FIELDS
  if (fields === 'all') fields = ALL_MODERATION_ITEM_ENTITY_FIELDS

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
  `
}
