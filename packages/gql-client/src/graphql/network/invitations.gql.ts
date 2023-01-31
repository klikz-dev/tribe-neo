import gql from 'graphql-tag'

import {
  MemberInvitationFields,
  memberInvitationGQLFields,
} from './memberInvitation.fields'

export function inviteMembersGQLQuery(fields: MemberInvitationFields) {
  return gql`
    mutation InviteMembers($input: InviteMembersInput!) {
      inviteMembers(input: $input) {
        ${memberInvitationGQLFields(fields)}
      }
    }
`
}

export function memberInvitationValidityGQLQuery(
  fields: MemberInvitationFields,
) {
  return gql`
    query memberInvitationValidity($token: String!) {
      memberInvitationValidity(token: $token) {
        ${memberInvitationGQLFields(fields)}
      }
    }
  `
}

export function invitationLinkValidityGQLQuery() {
  return gql`
    query invitationLinkValidity($id: String!) {
      invitationLinkValidity(id: $id) {
        id
        link
      }
    }
  `
}

export function getMemberInvitationsGQLQuery(fields: MemberInvitationFields) {
  return gql`
    query GetMemberInvitations(
      $limit: Int!
      $query: String
      $after: String
      $status: MemberInvitationStatus
    ) {
      memberInvitations(
        limit: $limit
        query: $query
        after: $after
        status: $status
      ) {
        totalCount
        edges {
          node {
            ${memberInvitationGQLFields(fields)}
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

export function getInvitationLinkGQLQuery() {
  return gql`
    query getInvitationLink {
      memberInvitationLink {
        link
      }
    }
  `
}
