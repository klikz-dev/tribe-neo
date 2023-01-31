import gql from 'graphql-tag'

// eslint-disable-next-line import/no-cycle
import { SpaceMemberFields, spaceMemberGQLFields } from './spaceMember.fields'

export function getSpaceMembersGQLQuery(fields: SpaceMemberFields) {
  return gql`
    query GetSpaceMembers(
      $spaceId: ID!
      $roleIds: [ID!]
      $limit: Int!
      $after: String
      $orderBy: SpaceMemberListOrderByEnum
      $reverse: Boolean
    ) {
      spaceMembers(
        spaceId: $spaceId
        roleIds: $roleIds
        limit: $limit
        after: $after
        orderBy: $orderBy
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
            ${spaceMemberGQLFields(fields)}
          }
        }        
      }
    }
  `
}

export function addSpaceMemberGQLMutation(fields: SpaceMemberFields) {
  return gql`
    mutation AddSpaceMembers($input: [AddSpaceMemberInput!]!, $spaceId: ID!) {
      addSpaceMembers(input: $input, spaceId: $spaceId) {
        ${spaceMemberGQLFields(fields)}
      }
    }
  `
}

export function removeSpaceMembersGQLMutation() {
  return gql`
    mutation RemoveSpaceMembers($memberIds: [ID!]!, $spaceId: ID!) {
      removeSpaceMembers(memberIds: $memberIds, spaceId: $spaceId) {
        status
      }
    }
  `
}

export function getMemberSpacesGQLQuery(fields: SpaceMemberFields) {
  return gql`
    query GetMemberSpaces(
      $limit: Int!
      $after: String
      $memberId: ID!
      $collectionId: String
    ) {
      memberSpaces(
        limit: $limit
        after: $after
        memberId: $memberId
        collectionId: $collectionId
      ) {

        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ${spaceMemberGQLFields(fields)}
          }
        }
      }
    }
  `
}
