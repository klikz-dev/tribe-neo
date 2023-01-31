import {
  createPageGQLMutation,
  getPagesGQLQuery,
  PageFields,
  updatePageGQLMutation,
} from '../graphql'
import { MutationCreatePageArgs, MutationUpdatePageArgs, Page } from '../types'
import { GraphqlClient } from './graphql.client'

export class PagesClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    fields: PageFields = 'basic',
    accessToken?: string,
  ): Promise<Page[]> {
    type QueryResult = { pages: Page[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getPagesGQLQuery(fields),
      customToken: accessToken,
    })
    return result.pages
  }

  async create(
    variables: MutationCreatePageArgs,
    fields: PageFields = 'basic',
    accessToken?: string,
  ): Promise<Page> {
    type QueryResult = { createPage: Page }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createPageGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.createPage
  }

  async update(
    variables: MutationUpdatePageArgs,
    fields: PageFields = 'basic',
    accessToken?: string,
  ): Promise<Page> {
    type QueryResult = { updatePage: Page }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updatePageGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updatePage
  }
}
