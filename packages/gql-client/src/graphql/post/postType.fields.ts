export type PostTypeFields = 'basic' | 'all' | CustomPostTypeFields

export interface CustomPostTypeFields {
  validReplyTypes?: PostTypeFields
}

const BASIC_POST_TYPE_FIELDS: CustomPostTypeFields = {}
const ALL_POST_TYPE_FIELDS: CustomPostTypeFields = {
  validReplyTypes: 'basic',
}

export function postTypeGQLFields(fields: PostTypeFields) {
  if (fields === 'basic') fields = BASIC_POST_TYPE_FIELDS
  if (fields === 'all') fields = ALL_POST_TYPE_FIELDS

  return `
    context
    id
    name
    pluralName
    slug
    createdAt
    primaryReactionType
    singleChoiceReactions
    updatedAt
    mappings {
      key
      field
      type
      title
      description
      required
      isMainContent
      isSearchable
      default
    }
    ${
      fields.validReplyTypes
        ? `
      validReplyTypes {
        ${postTypeGQLFields(fields.validReplyTypes)}
      }
    `
        : ``
    }
  `
}
