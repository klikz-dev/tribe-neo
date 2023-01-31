import { MediaFields, mediaGQLFields } from '../media/media.fields'
import { slateGQLFields } from '../slate/slate.fields'

export type PageFields = 'basic' | 'all' | CustomPageFields

export interface CustomPageFields {
  image?: MediaFields
}

const BASIC_PAGE_FIELDS: CustomPageFields = {}
const ALL_PAGE_FIELDS: CustomPageFields = {
  image: 'all',
}

export const pageGQLFields = (fields: PageFields) => {
  if (fields === 'basic') fields = BASIC_PAGE_FIELDS
  if (fields === 'all') fields = ALL_PAGE_FIELDS

  return `
    id
    networkId
    slug
    type
    createdAt
    updatedAt
    layout
    address {
      path
      exact
      editable
    }
    seoDetail {
      title
      description
      imageId
      ${
        fields.image
          ? `
        image {
          ${mediaGQLFields(fields.image)}
        }`
          : ``
      }
    }
    slate {
      ${slateGQLFields('all')}
    }
  `
}
