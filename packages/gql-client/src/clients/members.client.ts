import {
  cancelEmailUpdateGQLMutation,
  deleteMemberGQLMutation,
  getMemberGQLQuery,
  getMembersGQLQuery,
  MemberFields,
  updateMemberGQLQuery,
} from '../graphql'
import {
  Action,
  Member,
  MutationCancelEmailUpdateArgs,
  MutationDeleteMemberArgs,
  MutationUpdateMemberArgs,
  PaginatedMember,
  QueryMembersArgs,
  Scalars,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class MembersClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    variables: QueryMembersArgs,
    fields: MemberFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedMember> {
    type QueryResult = { members: PaginatedMember }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMembersGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.members
  }

  async get(
    id: Scalars['ID'],
    fields: MemberFields = 'basic',
    accessToken?: string,
  ): Promise<Member> {
    type QueryResult = { member: Member }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMemberGQLQuery(fields),
      variables: { id },
      customToken: accessToken,
    })
    return result.member
  }

  async update(
    variables: MutationUpdateMemberArgs,
    fields: MemberFields = 'basic',
    accessToken?: string,
  ): Promise<Member> {
    type QueryResult = { updateMember: Member }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateMemberGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.updateMember
  }

  async delete(
    variables: MutationDeleteMemberArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { deleteMember: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteMemberGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.deleteMember
  }

  async cancelEmailUpdate(
    variables: MutationCancelEmailUpdateArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { cancelEmailUpdate: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: cancelEmailUpdateGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.cancelEmailUpdate
  }
}
