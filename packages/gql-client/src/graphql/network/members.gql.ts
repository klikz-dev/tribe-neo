import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { MemberFields, memberGQLFields } from './member.fields'

export function getMembersGQLQuery(fields: MemberFields): DocumentNode {
  // TODO: Update the variables
  return gql`
    query GetMembers(
      $limit: Int!
      $query: String
      $after: String
      $orderBy: MemberListOrderByEnum
      $reverse: Boolean
    ) {
      members(
        limit: $limit
        query: $query
        after: $after
        orderBy: $orderBy
        reverse: $reverse
      ) {
        totalCount
        edges {
          node {
            ${memberGQLFields(fields)}
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
}

export function getMemberGQLQuery(fields: MemberFields): DocumentNode {
  return gql`
    query GetMember($id: ID!) {
      member(id: $id) {
        ${memberGQLFields(fields)}
      }
    }
  `
}

export function updateMemberGQLQuery(fields: MemberFields): DocumentNode {
  return gql`
    mutation UpdateMember($input: UpdateMemberInput!, $id: ID) {
      updateMember(id: $id, input: $input) {
        ${memberGQLFields(fields)}
      }
    }
  `
}

export function deleteMemberGQLMutation(): DocumentNode {
  return gql`
    mutation DeleteMember($id: ID!) {
      deleteMember(id: $id) {
        status
      }
    }
  `
}

export const cancelEmailUpdateGQLMutation = () => gql`
  mutation CancelEmailUpdate($id: ID) {
    cancelEmailUpdate(id: $id) {
      status
    }
  }
`
