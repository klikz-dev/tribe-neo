import { getSpaceRolesGQLQuery, SpaceRoleFields } from '../graphql'
import { QuerySpaceRolesArgs, SpaceRole } from '../types'
import { GraphqlClient } from './graphql.client'

export class SpaceRolesClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    variables: QuerySpaceRolesArgs,
    fields: SpaceRoleFields = 'basic',
    accessToken?: string,
  ): Promise<Array<SpaceRole>> {
    type QueryResult = { spaceRoles: Array<SpaceRole> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpaceRolesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spaceRoles
  }
}
