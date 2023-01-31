import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { paginatedGQLFields } from '../../types'
import { ActionFields, actionGQLFields } from '../../types/fields'
import { PostFields, postGQLFields } from '../post'
import {
  PaginatedSpaceFields,
  SpaceFields,
  spaceGQLFields,
} from './space.fields'

export function createSpaceGQLQuery(fields: SpaceFields): DocumentNode {
  return gql`
    mutation CreateSpace($input: CreateSpaceInput!) {
      createSpace(input: $input) {
        ${spaceGQLFields(fields)}
      }
    }
  `
}

export function getSpacesGQLQuery(fields: SpaceFields): DocumentNode {
  return gql`
    query GetSpaces(
      $after: String
      $before: String
      $collectionId: String
      $limit: Int!
      $memberId: ID
      $offset: Int
      $orderBy: SpaceListOrderByEnum
      $query: String
      $reverse: Boolean
    ) {
      spaces(
        after: $after
        before: $before
        collectionId: $collectionId
        limit: $limit
        memberId: $memberId
        offset: $offset
        orderBy: $orderBy
        query: $query
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
            ${spaceGQLFields(fields)}
          }
        }
        nodes {
          ${spaceGQLFields(fields)}
        }
      }
    }
  `
}

export function getSpacesByIdsGQLQuery(fields: SpaceFields): DocumentNode {
  return gql`
    query GetSpacesByIds($ids: [ID!]!) {
      spacesByIds(ids: $ids) {
        ${spaceGQLFields(fields)}
      }
    }
  `
}

export function getSpaceGQLQuery(fields: SpaceFields): DocumentNode {
  return gql`
    query GetSpace($id: ID, $slug: ID) {
      space(id: $id, slug: $slug) {
        ${spaceGQLFields(fields)}
      }
    }
  `
}

export const organizeSpacesInCollectionGQLMutation = (
  fields: ActionFields,
) => gql`
  mutation OrganizeSpacesInCollection(
    $collectionId: String!
    $spaceIds: [String!]!
  ) {
    organizeSpacesInCollection(
      collectionId: $collectionId
      spaceIds: $spaceIds
    ) {
      ${actionGQLFields(fields)}
    }
  }
`

export const updateSpaceGQLMutation = (
  fields: SpaceFields,
): DocumentNode => gql`
    mutation updateSpace($id: ID!, $input: UpdateSpaceInput!) {
      updateSpace(id: $id input: $input) {
        ${spaceGQLFields(fields)}
      }
    }
  `

export const joinSpaceGQLMutation = (): DocumentNode => gql`
  mutation joinSpace($spaceId: ID!) {
    joinSpace(spaceId: $spaceId) {
      status
      __typename
    }
  }
`

export const leaveSpaceGQLMutation = (): DocumentNode => gql`
  mutation leaveSpace($spaceId: ID!) {
    leaveSpace(spaceId: $spaceId) {
      status
      __typename
    }
  }
`

export const getSpacePinnedPostGQLQuery = (
  fields: PostFields,
): DocumentNode => gql`
  query GetSpacePinnedPosts($spaceId: ID!) {
    spacePinnedPosts(spaceId: $spaceId) {
      ${postGQLFields(fields)}
    }
  }
`

export const getSpaceTaggedPostsGQLQuery = (
  fields: PostFields,
): DocumentNode => gql`
  query GetPostsByTag(
    $spaceId: ID!
    $tagId: ID!
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
  ) {
    tagPosts(
      spaceId: $spaceId
      tagId: $tagId
      after: $after
      before: $before
      limit: $limit
      offset: $offset
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

export const updateSpaceHighlightedTagsMutation = (): DocumentNode => gql`
  mutation updateSpaceHighlightedTags(
    $input: UpdateHighlightedTags!
    $spaceId: ID!
  ) {
    updateSpaceHighlightedTags(input: $input, spaceId: $spaceId) {
      status
      __typename
    }
  }
`

export const exploreSpacesGQLQuery = (
  fields: PaginatedSpaceFields,
): DocumentNode => gql`
  query ExploreSpaces(
    $after: String
    $before: String
    $collectionId: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
  ) {
    exploreSpaces(
      after: $after
      before: $before
      collectionId: $collectionId
      limit: $limit
      offset: $offset
      reverse: $reverse
    ) {
      ${paginatedGQLFields(fields, spaceGQLFields)}
    }
  }
`

export const deleteSpaceGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation DeleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      ${actionGQLFields(fields)}
    }
  }
`
