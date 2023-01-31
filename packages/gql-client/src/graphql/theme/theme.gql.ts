import gql from 'graphql-tag'

import { NewThemeFields, newThemesGQLFields } from './newTheme.fields'

export const upsertThemeGQLMutation = (fields: NewThemeFields) => gql`
  mutation UpsertTheme($input: UpsertTheme!) {
    upsertTheme(input: $input) {
      ${newThemesGQLFields(fields)}
    }
  }
`
