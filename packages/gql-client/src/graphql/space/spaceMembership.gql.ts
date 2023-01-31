import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import {
  SpaceJoinRequestFields,
  spaceJoinRequestGQLFields,
} from './spaceJoinRequest.fields'

export const getMemberSpaceMembershipRequestGQLQuery = (
  fields: SpaceJoinRequestFields,
) => gql`
  query GetMemberSpaceMembershipRequest($status: SpaceJoinRequestStatus) {
    memberSpaceMembershipRequest(status: $status) {
      ${spaceJoinRequestGQLFields(fields)}
    }
  }
`

export const requestSpaceMembershipGQLMutation = (
  fields: SpaceJoinRequestFields,
) => gql`
  mutation RequestSpaceMemberShip($spaceId: ID!) {
    requestSpaceMembership(spaceId: $spaceId) {
      ${spaceJoinRequestGQLFields(fields)}
    }
  }
`

export const approveSpaceMembershipRequestGQLMutation = (
  fields: ActionFields,
) => gql`
  mutation ApproveSpaceMembershipRequest(
    $spaceId: ID!
    $spaceMembershipRequestId: ID!
  ) {
    approveSpaceMembershipRequest(
      spaceId: $spaceId
      spaceMembershipRequestId: $spaceMembershipRequestId
    ) {
      ${actionGQLFields(fields)}
    }
  }
`

export const declineSpaceMembershipRequestGQLMutation = (
  fields: ActionFields,
) => gql`
  mutation DeclineSpaceMembershipRequest(
    $spaceId: ID!
    $spaceMembershipRequestId: ID!
  ) {
    declineSpaceMembershipRequest(
      spaceId: $spaceId
      spaceMembershipRequestId: $spaceMembershipRequestId
    ) {
      ${actionGQLFields(fields)}
    }
  }
`

export const spaceMembershipRequestsGQLQuery = (
  fields: SpaceJoinRequestFields,
) => gql`
  query SpaceMembershipRequests(
    $spaceId: ID!
    $status: SpaceJoinRequestStatus
  ) {
    spaceMembershipRequests(spaceId: $spaceId, status: $status) {
      ${spaceJoinRequestGQLFields(fields)}
    }
  }
`
