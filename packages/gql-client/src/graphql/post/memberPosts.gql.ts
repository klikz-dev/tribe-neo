import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { PostFields, postGQLFields } from './posts.fields'

export function getMemberPostsGQLQuery(fields: PostFields): DocumentNode {
  return gql`
    query getMemberPost(
      $after: String
      $before: String
      $limit: Int!
      $memberId: ID!
      $offset: Int
      $reverse: Boolean
    ) {
      memberPosts(
        after: $after
        before: $before
        limit: $limit
        memberId: $memberId
        offset: $offset
        reverse: $reverse
      ) {
        edges {
          cursor
          node {
            ${postGQLFields(fields)}
          }
        }
        nodes {
          ${postGQLFields(fields)}
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
