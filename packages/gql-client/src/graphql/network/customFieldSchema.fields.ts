import {
  BaseCustomFieldSchemaFields,
  baseCustomFieldSchemaGQLFields,
} from './baseCustomFieldSchema.fields'

export type CustomFieldSchemaFields =
  | 'basic'
  | 'all'
  | CustomCustomFieldSchemaFields

export interface CustomCustomFieldSchemaFields {
  items?: BaseCustomFieldSchemaFields
  properties?: BaseCustomFieldSchemaFields
}

const BASIC_CUSTOM_FIELD_SCHEMA_FIELDS: CustomCustomFieldSchemaFields = {}
const ALL_CUSTOM_FIELD_SCHEMA_FIELDS: CustomCustomFieldSchemaFields = {
  items: 'basic',
  properties: 'all',
}

export const customFieldSchemaGQLFields = (fields: CustomFieldSchemaFields) => {
  if (fields === 'basic') fields = BASIC_CUSTOM_FIELD_SCHEMA_FIELDS
  if (fields === 'all') fields = ALL_CUSTOM_FIELD_SCHEMA_FIELDS

  return `
    default
    description
    key
    name
    readPrivacy {
      allow
    }
    required
    searchable
    settings {
      key
      value
    }
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
    writePrivacy {
      allow
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
