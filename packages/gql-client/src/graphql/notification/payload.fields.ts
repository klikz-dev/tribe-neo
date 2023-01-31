import { MediaFields, mediaGQLFields } from '../media'
import { MemberFields, memberGQLFields } from '../network'
import { PostFields, postGQLFields } from '../post'
import { SpaceFields, spaceGQLFields } from '../space'

export type PayloadFields = 'basic' | 'all' | CustomPayloadFields

export interface CustomPayloadFields {
  media?: MediaFields
  member?: MemberFields
  post?: PostFields
  space?: SpaceFields
}

const BASIC_PAYLOAD_FIELDS: CustomPayloadFields = {}
const ALL_PAYLOAD_FIELDS: CustomPayloadFields = {
  media: 'all',
  member: 'basic',
  post: 'basic',
  space: 'basic',
}

export function payloadGQLFields(fields: PayloadFields) {
  if (fields === 'basic') fields = BASIC_PAYLOAD_FIELDS
  if (fields === 'all') fields = ALL_PAYLOAD_FIELDS
  return `
    id
    name
    summary
    type
    ${
      fields.media
        ? `
      media {
        ${mediaGQLFields(fields.media)}
      }
    `
        : ``
    }
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
      fields.post
        ? `
      post {
        ${postGQLFields(fields.post)}
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
