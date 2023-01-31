import {
  CustomFieldSchemaFields,
  customFieldSchemaGQLFields,
} from './customFieldSchema.fields'

export type CustomFieldsSchemaFields =
  | 'basic'
  | 'all'
  | CustomCustomFieldsSchemaFields

export interface CustomCustomFieldsSchemaFields {
  fields?: CustomFieldSchemaFields
}

const BASIC_CUSTOM_FIELDS_SCHEMA_FIELDS: CustomFieldsSchemaFields = {}
const ALL_CUSTOM_FIELDS_SCHEMA_FIELDS: CustomCustomFieldsSchemaFields = {
  fields: 'basic',
}

export const customFieldsSchemaGQLFields = (
  fields: CustomFieldsSchemaFields,
) => {
  if (fields === 'basic') fields = BASIC_CUSTOM_FIELDS_SCHEMA_FIELDS
  if (fields === 'all') fields = ALL_CUSTOM_FIELDS_SCHEMA_FIELDS

  return `
  __typename
  ${
    fields.fields
      ? `
    fields {
      ${customFieldSchemaGQLFields(fields.fields)}
    }
  `
      : ``
  } 
`
}
