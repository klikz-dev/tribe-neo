import {
  SpacePostTypeFields,
  getSpacePostTypeGQLQuery,
  getSpacePostTypesGQLQuery,
  updateSpacePostTypeGQLMutation,
} from '../graphql'
import {
  MutationUpdateSpacePostTypesArgs,
  PaginatedSpacePostType,
  QuerySpacePostTypeArgs,
  QuerySpacePostTypesArgs,
  SpacePostType,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class SpacePostTypeClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    variables: QuerySpacePostTypesArgs,
    fields: SpacePostTypeFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedSpacePostType> {
    type QueryResult = { spacePostTypes: PaginatedSpacePostType }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpacePostTypesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spacePostTypes
  }

  async get(
    variables: QuerySpacePostTypeArgs,
    fields: SpacePostTypeFields = 'basic',
    accessToken?: string,
  ): Promise<SpacePostType> {
    type QueryResult = { spacePostType: SpacePostType }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpacePostTypeGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spacePostType
  }

  async update(
    variables: MutationUpdateSpacePostTypesArgs,
    fields: SpacePostTypeFields = 'basic',
    accessToken?: string,
  ): Promise<SpacePostType> {
    type QueryResult = { updatedSpacePostType: SpacePostType }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateSpacePostTypeGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updatedSpacePostType
  }
}
