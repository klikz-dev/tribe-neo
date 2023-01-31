import {
  SpaceMemberFields,
  addSpaceMemberGQLMutation,
  getMemberSpacesGQLQuery,
  getSpaceMembersGQLQuery,
  removeSpaceMembersGQLMutation,
} from '../graphql'
import {
  Action,
  MutationAddSpaceMembersArgs,
  MutationRemoveSpaceMembersArgs,
  PaginatedSpaceMember,
  QueryMemberSpacesArgs,
  QuerySpaceMembersArgs,
  SpaceMember,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class SpaceMembersClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async add(
    variables: MutationAddSpaceMembersArgs,
    fields: SpaceMemberFields = 'basic',
    accessToken?: string,
  ): Promise<Array<SpaceMember>> {
    type QueryResult = { addSpaceMembers: Array<SpaceMember> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: addSpaceMemberGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.addSpaceMembers
  }

  async listMembers(
    variables: QuerySpaceMembersArgs,
    fields: SpaceMemberFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedSpaceMember> {
    type QueryResult = { spaceMembers: PaginatedSpaceMember }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpaceMembersGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spaceMembers
  }

  async listSpaces(
    variables: QueryMemberSpacesArgs,
    fields: SpaceMemberFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedSpaceMember> {
    type QueryResult = { memberSpaces: PaginatedSpaceMember }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMemberSpacesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.memberSpaces
  }

  async remove(
    variables: MutationRemoveSpaceMembersArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { removeSpaceMembers: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: removeSpaceMembersGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.removeSpaceMembers
  }
}
