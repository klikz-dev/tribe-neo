import { TagFields, tagGQLFields } from '../post/tag.fields'

export type HighlightedTagFields = 'basic' | 'all' | CustomHighlightedTagFields

export interface CustomHighlightedTagFields {
  tag?: TagFields
}

const BASIC_HIGHLIGHTED_TAG_FIELDS: CustomHighlightedTagFields = {
  tag: 'basic',
}
const ALL_HIGHLIGHTED_TAG_FIELDS: CustomHighlightedTagFields = {
  tag: 'all',
}

export function highlightedTagGQLFields(fields: HighlightedTagFields): string {
  if (fields === 'basic') fields = BASIC_HIGHLIGHTED_TAG_FIELDS
  if (fields === 'all') fields = ALL_HIGHLIGHTED_TAG_FIELDS

  return `
    indent
    text
    type
    ${
      fields.tag
        ? `
      tag {
        ${tagGQLFields(fields.tag)}
      }`
        : ``
    }
  `
}
