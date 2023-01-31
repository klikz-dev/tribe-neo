import { NewThemeFields, upsertThemeGQLMutation } from '../graphql'
import { MutationUpsertThemeArgs, NewTheme } from '../types'
import { GraphqlClient } from './graphql.client'

export class ThemeClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async upsert(
    variables: MutationUpsertThemeArgs,
    fields: NewThemeFields = 'basic',
    accessToken?: string,
  ): Promise<NewTheme> {
    type QueryResult = { upsertTheme: NewTheme }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: upsertThemeGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.upsertTheme
  }
}
