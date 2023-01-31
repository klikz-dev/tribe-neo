import {
  ModerationItemFields,
  moderationItemGQLQuery,
  ModerationItemReporterFields,
  moderationItemReportersGQLQuery,
  moderationItemsGQLQuery,
  moderationSettingsGQLQuery,
  updateModerationItemGQLMutation,
  updateModerationSettingsGQLMutation,
} from '../graphql'
import {
  Action,
  ModerationItem,
  ModerationSettings,
  MutationUpdateModerationItemArgs,
  MutationUpdateModerationSettingsArgs,
  PaginatedModeration,
  PaginatedModerationItemReporter,
  QueryModerationItemArgs,
  QueryModerationItemReportersArgs,
  QueryModerationItemsArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class ModerationClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async getItem(
    variables: QueryModerationItemArgs,
    fields: ModerationItemFields = 'basic',
    accessToken?: string,
  ): Promise<ModerationItem> {
    type QueryResult = { moderationItem: ModerationItem }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: moderationItemGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.moderationItem
  }

  async getItems(
    variables: QueryModerationItemsArgs,
    fields: ModerationItemFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedModeration> {
    type QueryResult = { moderationItems: PaginatedModeration }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: moderationItemsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.moderationItems
  }

  async getItemReporters(
    variables: QueryModerationItemReportersArgs,
    fields: ModerationItemReporterFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedModerationItemReporter> {
    type QueryResult = {
      moderationItemReporters: PaginatedModerationItemReporter
    }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: moderationItemReportersGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.moderationItemReporters
  }

  async settings(accessToken?: string): Promise<ModerationSettings> {
    type QueryResult = { moderationSettings: ModerationSettings }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: moderationSettingsGQLQuery(),
      customToken: accessToken,
    })
    return result.moderationSettings
  }

  async updateSettings(
    variables: MutationUpdateModerationSettingsArgs,
    accessToken?: string,
  ): Promise<ModerationSettings> {
    type QueryResult = { updateModerationSettings: ModerationSettings }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateModerationSettingsGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateModerationSettings
  }

  async updateItem(
    variables: MutationUpdateModerationItemArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { updateModerationItem: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateModerationItemGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateModerationItem
  }
}
