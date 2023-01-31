import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import { CollectionFields, collectionGQLFields } from './collection.fields'

export function getCollectionsGQLQuery(fields: CollectionFields) {
  return gql`
    query GetCollections(
      $orderBy: CollectionListOrderByEnum
      $reverse: Boolean
    ) {
      collections(orderBy: $orderBy, reverse: $reverse) {
        ${collectionGQLFields(fields)}
      }
    }
  `
}

export function getCollectionGQLQuery(fields: CollectionFields) {
  return gql`
    query GetCollection(
      $id: ID!
    ) {
      collection(id: $id) {
        ${collectionGQLFields(fields)}
      }
    }
  `
}

export function createCollectionGQLMutation(fields: CollectionFields) {
  return gql`
    mutation CreateCollection($input: CreateCollectionInput!) {
      createCollection(input: $input) {
        ${collectionGQLFields(fields)}
      }
    }
  `
}

export function updateCollectionGQLMutation() {
  return gql`
    mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
      updateCollection(id: $id, input: $input) {
        status
      }
    }
  `
}

export function deleteCollectionGQLMutation() {
  return gql`
    mutation DeleteCollection($id: ID!) {
      deleteCollection(id: $id) {
        status
      }
    }
  `
}

export const organizeCollectionsGQLMutation = (fields: ActionFields) => gql`
  mutation OrganizeCollections($ids: [String!]!) {
    organizeCollections(ids: $ids) {
      ${actionGQLFields(fields)}
    }
  }
`

export const organizeSpacesInCollectionMutation = (): DocumentNode => gql`
  mutation organizeSpacesInCollection(
    $collectionId: String!
    $spaceIds: [String!]!
  ) {
    organizeSpacesInCollection(
      collectionId: $collectionId
      spaceIds: $spaceIds
    ) {
      status
    }
  }
`
