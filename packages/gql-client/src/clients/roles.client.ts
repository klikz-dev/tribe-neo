import { getRolesGQLQuery, RoleFields } from '../graphql'
import { QueryRolesArgs, Role } from '../types'
import { GraphqlClient } from './graphql.client'

export class RolesClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    variables: QueryRolesArgs,
    fields: RoleFields = 'basic',
    accessToken?: string,
  ): Promise<Array<Role>> {
    type QueryResult = { roles: Array<Role> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getRolesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.roles
  }
}
