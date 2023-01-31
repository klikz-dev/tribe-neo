import gql from 'graphql-tag'

import { PageFields, pageGQLFields } from './page.fields'

export const getPagesGQLQuery = (fields: PageFields) => gql`
  query GetPages() {
    pages() {
      ${pageGQLFields(fields)}
    }
  }
`

export const createPageGQLMutation = (fields: PageFields) => gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ${pageGQLFields(fields)}
    }
  }
`

export const updatePageGQLMutation = (fields: PageFields) => gql`
  mutation UpdatePage($id: String!, $input: UpdatePageInput!) {
    updatePage(id: $id, input: $input) {
      ${pageGQLFields(fields)}
    }
  }
`
