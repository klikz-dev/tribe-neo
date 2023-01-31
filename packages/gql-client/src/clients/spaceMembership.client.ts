import { SpaceJoinRequestFields } from '../graphql'
import {
  approveSpaceMembershipRequestGQLMutation,
  declineSpaceMembershipRequestGQLMutation,
  getMemberSpaceMembershipRequestGQLQuery,
  requestSpaceMembershipGQLMutation,
  spaceMembershipRequestsGQLQuery,
} from '../graphql/space/spaceMembership.gql'
import {
  Action,
  ActionFields,
  MutationApproveSpaceMembershipRequestArgs,
  MutationDeclineSpaceMembershipRequestArgs,
  MutationRequestSpaceMembershipArgs,
  QueryMemberSpaceMembershipRequestArgs,
  QuerySpaceMembershipRequestsArgs,
  SpaceJoinRequest,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class SpaceMembershipClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async getMemberRequests(
    variables: QueryMemberSpaceMembershipRequestArgs,
    fields: SpaceJoinRequestFields = 'basic',
    accessToken?: string,
  ): Promise<Array<SpaceJoinRequest>> {
    type QueryResult = { memberSpaceMembershipRequest: Array<SpaceJoinRequest> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMemberSpaceMembershipRequestGQLQuery(fields),
      customToken: accessToken,
      variables,
    })
    return result.memberSpaceMembershipRequest
  }

  async getRequests(
    variables: QuerySpaceMembershipRequestsArgs,
    fields: SpaceJoinRequestFields = 'basic',
    accessToken?: string,
  ): Promise<Array<SpaceJoinRequest>> {
    type QueryResult = { spaceMembershipRequests: Array<SpaceJoinRequest> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: spaceMembershipRequestsGQLQuery(fields),
      customToken: accessToken,
      variables,
    })
    return result.spaceMembershipRequests
  }

  async request(
    variables: MutationRequestSpaceMembershipArgs,
    fields: SpaceJoinRequestFields = 'basic',
    accessToken?: string,
  ): Promise<SpaceJoinRequest> {
    type QueryResult = { requestSpaceMembership: SpaceJoinRequest }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: requestSpaceMembershipGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.requestSpaceMembership
  }

  async approveRequest(
    variables: MutationApproveSpaceMembershipRequestArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { approveSpaceMembershipRequest: Action }
    const request = await this.client.authorizedRequest<QueryResult>({
      query: approveSpaceMembershipRequestGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return request.approveSpaceMembershipRequest
  }

  async declineRequest(
    variables: MutationDeclineSpaceMembershipRequestArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { declineSpaceMembershipRequest: Action }
    const request = await this.client.authorizedRequest<QueryResult>({
      query: declineSpaceMembershipRequestGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return request.declineSpaceMembershipRequest
  }
}
