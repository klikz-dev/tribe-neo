/* eslint-disable import/no-cycle */
import gql from 'graphql-tag'

import {
  SpacePostTypeFields,
  spacePostTypeGQLFields,
} from './space-post-type.fields'

export function getSpacePostTypeGQLQuery(fields: SpacePostTypeFields) {
  return gql`
    query GetSpacePostType(
      $spaceId: ID!
      $postTypeId: ID!
    ) {
      spacePostType(
          spaceId: $spaceId
          postTypeId: $postTypeId
    ) {
        ${spacePostTypeGQLFields(fields)}
      }
    }
  `
}

export function getSpacePostTypesGQLQuery(fields: SpacePostTypeFields) {
  return gql`
    query GetSpacePostTypes(
      $after: String
      $before: String
      $limit: Int!
      $offset: Int
      $reverse: Boolean
      $spaceId: ID!
    ) {
      spacePostTypes(
        after: $after
        before: $before
        limit: $limit
        offset: $offset
        reverse: $reverse
        spaceIds: $spaceIds
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ${spacePostTypeGQLFields(fields)}
          }
        }
        nodes {
          ${spacePostTypeGQLFields(fields)}
        }
      }
    }
  `
}
export const updateSpacePostTypeGQLMutation = (
  fields: SpacePostTypeFields,
) => gql`
  mutation UpdateSpacePostType($spaceId: ID!, $input: UpdateSpacePostTypeInput!) {
    updatePost(id: $id, input: $input) {
      ${spacePostTypeGQLFields(fields)}
    }
  }
`
