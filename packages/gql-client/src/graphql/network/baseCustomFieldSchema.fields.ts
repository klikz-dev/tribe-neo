export type BaseCustomFieldSchemaFields =
  | 'basic'
  | 'all'
  | CustomBaseCustomFieldSchemaFields

export interface CustomBaseCustomFieldSchemaFields {
  items?: BaseCustomFieldSchemaFields
  properties?: BaseCustomFieldSchemaFields
}

const BASIC_CUSTOM_FIELD_SCHEMA_FIELDS: BaseCustomFieldSchemaFields = {}
const ALL_CUSTOM_FIELD_SCHEMA_FIELDS: BaseCustomFieldSchemaFields = {
  items: 'basic',
  properties: 'basic',
}

export const baseCustomFieldSchemaGQLFields = (
  fields: BaseCustomFieldSchemaFields,
) => {
  if (fields === 'basic') fields = BASIC_CUSTOM_FIELD_SCHEMA_FIELDS
  if (fields === 'all') fields = ALL_CUSTOM_FIELD_SCHEMA_FIELDS

  return `
    description
    key
    name
    required
    type
    typeOptions {
      dateType
      numberType
      relationType
      richTextType
      textType
    }
    validators {
      customErrorMessage
      validation
      value
    }
    ${
      fields.items
        ? `
      items {
        ${baseCustomFieldSchemaGQLFields(fields.items)}
      }
    `
        : ``
    }
    ${
      fields.properties
        ? `
      properties {
        ${baseCustomFieldSchemaGQLFields(fields.properties)}
      }
    `
        : ``
    }
  `
}
