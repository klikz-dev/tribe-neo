import { billingGQLQuery } from '../graphql'
import { BillingDetails } from '../types'
import { GraphqlClient } from './graphql.client'

export class BillingClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async details(accessToken?: string): Promise<BillingDetails> {
    type QueryResult = { billingDetails: BillingDetails }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: billingGQLQuery(),
      customToken: accessToken,
    })
    return result.billingDetails
  }
}
