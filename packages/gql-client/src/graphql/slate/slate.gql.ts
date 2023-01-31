import gql from 'graphql-tag'

import { SlateFields, slateGQLFields } from './slate.fields'

export const updateSlatesGQLMutation = (fields: SlateFields) => gql`
  mutation UpdateSlates($input: [UpdateSlateInput!]!) {
    updateSlates(input: $input) {
      ${slateGQLFields(fields)}
    }
  }
`
