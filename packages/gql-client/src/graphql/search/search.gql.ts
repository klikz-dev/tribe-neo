import gql from 'graphql-tag'

import {
  SearchEntityFields,
  searchEntityGQLFields,
} from './searchEntity.fields'

export function searchGQLQuery(fields: SearchEntityFields) {
  return gql`
    query search($input: SearchInput!) {
      search(input: $input) {
        totalCount
        hits {
          entityType
          hits {
            ${searchEntityGQLFields(fields)}
          }
        }
      }
    }
  `
}
