import { gql } from 'graphql-request'

import { NetworkFields, networkGQLFields } from './network.fields'

export const addMemberSchemaFieldGQLMutation = (fields: NetworkFields) => gql`
  mutation AddMemberSchemaField($input: CustomFieldSchemaInput!) {
    addMemberSchemaField(input: $input) {
      ${networkGQLFields(fields)}
    }
  }
`

export const updateMemberSchemaFieldGQLMutation = (
  fields: NetworkFields,
) => gql`
  mutation UpdateMemberSchemaField($input: UpdateCustomFieldSchemaInput!) {
    updateMemberSchemaField(input: $input) {
      ${networkGQLFields(fields)}
    }
  }
`

export const archiveMemberSchemaFieldGQLMutation = (
  fields: NetworkFields,
) => gql`
  mutation ArchiveMemberSchemaField($key: String!) {
    archiveMemberSchemaField(key: $key) {
      ${networkGQLFields(fields)}
    }
  }
`
