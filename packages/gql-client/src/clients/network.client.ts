import {
  addMemberSchemaFieldGQLMutation,
  archiveMemberSchemaFieldGQLMutation,
  clearNewDomainGQLMutation,
  domainAvailabilityGQLQuery,
  getNetworkGQLQuery,
  NetworkFields,
  newDomainStatusGQLQuery,
  transferToNewDomainGQLMutation,
  updateMemberSchemaFieldGQLMutation,
  updateNetworkGQLQuery,
  updateNewDomainGQLMutation,
} from '../graphql'
import {
  Action,
  DomainAvailability,
  DomainTransferStatus,
  MutationAddMemberSchemaFieldArgs,
  MutationArchiveMemberSchemaFieldArgs,
  MutationUpdateMemberSchemaFieldArgs,
  MutationUpdateNetworkArgs,
  MutationUpdateNewDomainArgs,
  Network,
  QueryDomainAvailabilityArgs,
  QueryNewDomainStatusArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class NetworkClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async get(
    fields: NetworkFields = 'basic',
    accessToken?: string,
  ): Promise<Network> {
    type QueryResult = { network: Network }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getNetworkGQLQuery(fields),
      customToken: accessToken,
    })
    return result.network
  }

  async update(
    variables: MutationUpdateNetworkArgs,
    fields: NetworkFields = 'basic',
    accessToken?: string,
  ): Promise<Network> {
    type QueryResult = { updateNetwork: Network }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateNetworkGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.updateNetwork
  }

  async clearNewDomain(accessToken?: string): Promise<Action> {
    type QueryResult = { clearNewDomain: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: clearNewDomainGQLMutation(),
      customToken: accessToken,
    })
    return result.clearNewDomain
  }

  async updateNewDomain(
    variables: MutationUpdateNewDomainArgs,
    accessToken?: string,
  ): Promise<DomainTransferStatus> {
    type QueryResult = { updateNewDomain: DomainTransferStatus }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateNewDomainGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateNewDomain
  }

  async transferToNewDomain(accessToken?: string): Promise<Action> {
    type QueryResult = { transferToNewDomain: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: transferToNewDomainGQLMutation(),
      customToken: accessToken,
    })
    return result.transferToNewDomain
  }

  async domainAvailability(
    variables: QueryDomainAvailabilityArgs,
    accessToken?: string,
  ): Promise<DomainAvailability> {
    type QueryResult = { domainAvailability: DomainAvailability }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: domainAvailabilityGQLQuery(),
      variables,
      customToken: accessToken,
    })
    return result.domainAvailability
  }

  async newDomainStatus(
    variables: QueryNewDomainStatusArgs,
    accessToken?: string,
  ): Promise<DomainTransferStatus> {
    type QueryResult = { newDomainStatus: DomainTransferStatus }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: newDomainStatusGQLQuery(),
      variables,
      customToken: accessToken,
    })
    return result.newDomainStatus
  }

  async addMemberSchemaField(
    variables: MutationAddMemberSchemaFieldArgs,
    fields: NetworkFields = 'basic',
    accessToken?: string,
  ): Promise<Network> {
    type QueryResult = { addMemberSchemaField: Network }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: addMemberSchemaFieldGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.addMemberSchemaField
  }

  async updateMemberSchemaField(
    variables: MutationUpdateMemberSchemaFieldArgs,
    fields: NetworkFields = 'basic',
    accessToken?: string,
  ): Promise<Network> {
    type QueryResult = { updateMemberSchemaField: Network }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateMemberSchemaFieldGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updateMemberSchemaField
  }

  async archiveMemberSchemaField(
    variables: MutationArchiveMemberSchemaFieldArgs,
    fields: NetworkFields = 'basic',
    accessToken?: string,
  ): Promise<Network> {
    type QueryResult = { archiveMemberSchemaField: Network }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: archiveMemberSchemaFieldGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.archiveMemberSchemaField
  }
}
