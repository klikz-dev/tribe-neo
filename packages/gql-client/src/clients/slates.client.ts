import { SlateFields, updateSlatesGQLMutation } from '../graphql'
import { MutationUpdateSlatesArgs, Slate } from '../types'
import { GraphqlClient } from './graphql.client'

export class SlatesClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async update(
    variables: MutationUpdateSlatesArgs,
    fields: SlateFields = 'all',
    accessToken?: string,
  ): Promise<Slate[]> {
    type QueryResult = { updateSlates: Slate[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateSlatesGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updateSlates
  }
}
