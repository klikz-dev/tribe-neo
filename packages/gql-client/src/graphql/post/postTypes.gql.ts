import gql from 'graphql-tag'

import { PostTypeFields, postTypeGQLFields } from './postType.fields'

export function getPostTypeGQLQuery(fields: PostTypeFields) {
  return gql`
    query GetPostType($id: ID!) {
      postType(id: $id) {
        __typename
        ${postTypeGQLFields(fields)}
      }
    }
  `
}

export function getPostTypesGQLQuery(fields: PostTypeFields) {
  return gql`
    query GetPostTypes(
      $after: String
      $before: String
      $limit: Int!
      $offset: Int
      $reverse: Boolean
      $context: PostTypeContext
      $query: String
    ) {
      postTypes(
        after: $after
        before: $before
        limit: $limit
        offset: $offset
        reverse: $reverse
        context: $context
        query: $query
      ) {
        edges {
          cursor
          node {
            __typename
            ${postTypeGQLFields(fields)}
          }
        }
        nodes {
          __typename
          ${postTypeGQLFields(fields)}
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  `
}
