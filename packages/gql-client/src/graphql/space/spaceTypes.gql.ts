import gql from 'graphql-tag'

import { SpaceTypeFields, spaceTypeGQLFields } from './spaceType.fields'

export function getSpaceTypesGQLQuery(fields: SpaceTypeFields) {
  return gql`
    query GetSpaceTypes(
      $limit: Int!
      $orderBy: SpaceTypeListOrderByEnum
      $reverse: Boolean
    ) {
      spaceTypes(limit: $limit, orderBy: $orderBy, reverse: $reverse) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ${spaceTypeGQLFields(fields)}
          }
        }
      }
    }
  `
}

export const spaceTypeGQLQuery = (fields: SpaceTypeFields) => gql`
  query SpaceType($id: ID!) {
    spaceType(id: $id) {
      ${spaceTypeGQLFields(fields)}
    }
  }
`

export const createSpaceTypeGQLMutation = (fields: SpaceTypeFields) => gql`
  mutation CreateSpaceType($input: CreateSpaceTypeInput!) {
    createSpaceType(input: $input) {
      ${spaceTypeGQLFields(fields)}
    }
  }
`
