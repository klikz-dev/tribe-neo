import gql from 'graphql-tag'

import { MemberFields, memberGQLFields } from '../network'

export const postReactionParticipantsGQLQuery = (fields: MemberFields) => gql`
  query PostReactionParticipants(
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $postId: ID!
    $reaction: ID!
    $reverse: Boolean
  ) {
    postReactionParticipants(
      after: $after
      before: $before
      limit: $limit
      offset: $offset
      postId: $postId
      reaction: $reaction
      reverse: $reverse
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          participant {
            ${memberGQLFields(fields)}
          }
        }
      }
      nodes {
        participant {
          ${memberGQLFields(fields)}
        }
      }
    }
  }
`
