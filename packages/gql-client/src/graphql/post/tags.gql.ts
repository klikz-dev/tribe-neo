import gql from 'graphql-tag'

import { TagFields, tagGQLFields } from './tag.fields'

export function getTagsGQLQuery(fields: TagFields) {
  return gql`
    query GetTags(
      $spaceId: ID
      $limit: Int!
      $orderBy: TagListOrderByEnum
      $reverse: Boolean
      $query: String
    ) {
      tags(
        spaceId: $spaceId
        limit: $limit
        orderBy: $orderBy
        reverse: $reverse
        query: $query
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ${tagGQLFields(fields)}
          }
        }
        nodes {
          ${tagGQLFields(fields)}
        }
      }
    }
  `
}

export const createTagGQLMutation = (fields: TagFields) => gql`
  mutation CreateTag($spaceId: ID!, $input: CreateTagInput!) {
    createTag(spaceId: $spaceId, input: $input) {
      ${tagGQLFields(fields)}
    }
  }
`

export const updateTagGQLMutation = (fields: TagFields) => gql`
  mutation UpdateTag($id: ID!, $spaceId: ID!, $input: UpdateTagInput!) {
    updateTag(id: $id, spaceId: $spaceId, input: $input) {
      ${tagGQLFields(fields)}
    }
  }
`
