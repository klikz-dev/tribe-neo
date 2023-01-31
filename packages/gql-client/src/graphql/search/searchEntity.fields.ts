import { MediaFields, mediaGQLFields } from '../media'
import { MemberFields, memberGQLFields } from '../network'
import { SpaceFields, spaceGQLFields } from '../space'

export type SearchEntityFields = 'basic' | 'all' | CustomSearchEntityFields

export interface CustomSearchEntityFields {
  in?: SpaceFields
  by?: MemberFields
  media?: MediaFields
}

const BASIC_SEARCH_ENTITY_FIELDS: CustomSearchEntityFields = {}
const ALL_SEARCH_ENTITY_FIELDS: CustomSearchEntityFields = {
  in: 'basic',
  by: 'basic',
  media: 'basic',
}

export function searchEntityGQLFields(fields: SearchEntityFields) {
  if (fields === 'basic') fields = BASIC_SEARCH_ENTITY_FIELDS
  if (fields === 'all') fields = ALL_SEARCH_ENTITY_FIELDS

  return `
    content
    created
    entityId
    id
    subtitle
    title
    entityType
    ${
      fields.in
        ? `
      in {
        ... on Space {
          ${spaceGQLFields(fields.in)}
        }
      }
    `
        : ``
    }
    ${
      fields.by
        ? `
      by {
        ... on Member {
          ${memberGQLFields(fields.by)}
        }
      }
    `
        : ``
    }
    ${
      fields.media
        ? `
      media {
        ${mediaGQLFields(fields.media)}
      }
    `
        : ``
    }    
  `
}
