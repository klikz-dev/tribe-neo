import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { PostFields, postGQLFields } from './posts.fields'

export function createReplyGQLQuery(fields: PostFields): DocumentNode {
  return gql`
    mutation createReply($postId: ID!, $input: CreatePostInput!) {
      createReply(postId: $postId, input: $input) {
        ${postGQLFields(fields)}
      }
    }
  `
}
