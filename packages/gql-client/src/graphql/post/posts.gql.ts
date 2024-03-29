/* eslint-disable import/no-cycle */
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import { PostFields, postGQLFields } from './posts.fields'

export function getPostGQLQuery(fields: PostFields) {
  return gql`
    query GetPost(
      $id: ID!
    ) {
      post(id: $id) {
        ${postGQLFields(fields)}
      }
    }
  `
}

export function getPostsGQLQuery(fields: PostFields) {
  return gql`
    query GetPosts(
      $after: String
      $before: String
      $excludePins: Boolean
      $filterBy: [PostListFilterByInput!]
      $limit: Int!
      $offset: Int
      $orderBy: PostListOrderByEnum
      $postTypeIds: [String!]
      $reverse: Boolean
      $spaceIds: [ID!]!
    ) {
      posts(
        after: $after
        before: $before
        excludePins: $excludePins
        filterBy: $filterBy
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        postTypeIds: $postTypeIds
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
            ${postGQLFields(fields)}
          }
        }
        nodes {
          ${postGQLFields(fields)}
        }
      }
    }
  `
}

export function getRepliesGQLQuery(fields: PostFields) {
  return gql`
    query replies(
      $after: String
      $before: String
      $excludePins: Boolean
      $limit: Int!
      $offset: Int
      $orderBy: PostListOrderByEnum
      $postId: ID!
      $reverse: Boolean
    ) {
      replies(
        after: $after
        before: $before
        excludePins: $excludePins
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        postId: $postId
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
            ${postGQLFields(fields)}
          }
        }
        nodes {
          ${postGQLFields(fields)}
        }
      }
    }
  `
}

export function createPostGQLQuery(fields: PostFields) {
  return gql`
    mutation createPost($spaceId: ID!, $input: CreatePostInput!) {
      createPost(input: $input, spaceId: $spaceId) {
        ${postGQLFields(fields)}
      }
    }
  `
}

export function getFeedGQLQuery(fields: PostFields): DocumentNode {
  return gql`
    query getFeed(
      $after: String
      $before: String
      $filterBy: [PostListFilterByInput!]
      $limit: Int!
      $offset: Int
      $onlyMemberSpaces: Boolean
      $orderBy: PostListOrderByEnum
      $postTypeIds: [String!]
      $reverse: Boolean
    ) {
      feed(
        after: $after
        before: $before
        filterBy: $filterBy
        limit: $limit
        offset: $offset
        onlyMemberSpaces: $onlyMemberSpaces
        orderBy: $orderBy
        postTypeIds: $postTypeIds
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

export const addReactionGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      ${actionGQLFields(fields)}
    }
  }
`

export const removeReactionGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation removeReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      ${actionGQLFields(fields)}
    }
  }
`

export const deletePostGQLMutation = (fields: ActionFields) => gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      ${actionGQLFields(fields)}
    }
  }
`

export const updatePostGQLMutation = (fields: PostFields) => gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ${postGQLFields(fields)}
    }
  }
`

export const hidePostGQLMutation = () => gql`
  mutation hidePost($id: ID!) {
    hidePost(id: $id) {
      status
      __typename
    }
  }
`

export const unhidePostGQLMutation = () => gql`
  mutation unhidePost($id: ID!) {
    unhidePost(id: $id) {
      status
      __typename
    }
  }
`

export const pinPostToSpaceGQLMutation = (fields: ActionFields) => gql`
  mutation PinPostToSpace($postId: ID!) {
    pinPostToSpace(postId: $postId) {
      ${actionGQLFields(fields)}
    }
  }
`

export const unpinPostFromSpaceGQLMutation = (fields: ActionFields) => gql`
  mutation UnpinPostFromSpace($postId: ID!) {
    unpinPostFromSpace(postId: $postId) {
      ${actionGQLFields(fields)}
    }
  }
`
