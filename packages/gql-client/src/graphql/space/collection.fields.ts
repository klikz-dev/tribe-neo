import { SpaceFields, spaceGQLFields } from './space.fields'

export type CollectionFields = 'basic' | 'all' | CustomCollectionFields

export interface CustomCollectionFields {
  space?: SpaceFields
}

const BASIC_COLLECTION_FIELDS: CustomCollectionFields = {}
const ALL_COLLECTION_FIELDS: CustomCollectionFields = {
  space: 'basic',
}

export function collectionGQLFields(fields: CollectionFields) {
  if (fields === 'basic') fields = BASIC_COLLECTION_FIELDS
  if (fields === 'all') fields = ALL_COLLECTION_FIELDS

  return `
    id
    slug
    name
    description
    createdAt
    ${
      fields.space
        ? `
      spaces(limit: 100) {
        totalCount
        edges {
          node {
            ${spaceGQLFields(fields.space)}
          }
        }
        nodes {
          ${spaceGQLFields(fields.space)}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    `
        : ``
    }
  `
}
