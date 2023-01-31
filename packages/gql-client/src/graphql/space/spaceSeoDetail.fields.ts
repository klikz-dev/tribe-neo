import { MediaFields, mediaGQLFields } from '../media'

export type SpaceSeoDetailFields = 'basic' | 'all' | CustomSpaceSeoDetailFields

export interface CustomSpaceSeoDetailFields {
  image?: MediaFields
}

const BASIC_SPACE_SEO_DETAIL_FIELDS: CustomSpaceSeoDetailFields = {}
const ALL_SPACE_SEO_DETAIL_FIELDS: CustomSpaceSeoDetailFields = {
  image: 'basic',
}

export function spaceSeoDetailGQLFields(fields: SpaceSeoDetailFields): string {
  if (fields === 'basic') fields = BASIC_SPACE_SEO_DETAIL_FIELDS
  if (fields === 'all') fields = ALL_SPACE_SEO_DETAIL_FIELDS

  return `
    description
    title
    ${
      fields.image
        ? `
      image {
        ${mediaGQLFields(fields.image)}
      }
    `
        : ``
    }
  `
}
