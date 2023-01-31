import {
  getInvitationLinkGQLQuery,
  getMemberInvitationsGQLQuery,
  invitationLinkValidityGQLQuery,
  inviteMembersGQLQuery,
  MemberInvitationFields,
  memberInvitationValidityGQLQuery,
} from '../graphql'
import {
  MemberInvitation,
  MemberInvitationLink,
  MutationInviteMembersArgs,
  PaginatedMemberInvitation,
  QueryInvitationLinkValidityArgs,
  QueryMemberInvitationsArgs,
  QueryMemberInvitationValidityArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class InvitationsClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async getLink(accessToken?: string): Promise<MemberInvitationLink> {
    type QueryResult = { memberInvitationLink: MemberInvitationLink }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getInvitationLinkGQLQuery(),
      customToken: accessToken,
    })
    return result.memberInvitationLink
  }

  async validateLink(
    variables: QueryInvitationLinkValidityArgs,
    accessToken?: string,
  ): Promise<MemberInvitationLink> {
    type QueryResult = { invitationLinkValidity: MemberInvitationLink }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: invitationLinkValidityGQLQuery(),
      variables,
      customToken: accessToken,
    })
    return result.invitationLinkValidity
  }

  async invite(
    variables: MutationInviteMembersArgs,
    fields: MemberInvitationFields = 'basic',
    accessToken?: string,
  ): Promise<Array<MemberInvitation>> {
    type QueryResult = { inviteMembers: Array<MemberInvitation> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: inviteMembersGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.inviteMembers
  }

  async validate(
    variables: QueryMemberInvitationValidityArgs,
    fields: MemberInvitationFields = 'basic',
    accessToken?: string,
  ): Promise<MemberInvitation> {
    type QueryResult = { memberInvitationValidity: MemberInvitation }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: memberInvitationValidityGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.memberInvitationValidity
  }

  async list(
    variables: QueryMemberInvitationsArgs,
    fields: MemberInvitationFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedMemberInvitation> {
    type QueryResult = { memberInvitations: PaginatedMemberInvitation }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMemberInvitationsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.memberInvitations
  }
}
