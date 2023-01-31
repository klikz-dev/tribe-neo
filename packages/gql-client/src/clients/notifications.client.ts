import {
  getNotificationsCountGQLQuery,
  getNotificationsGQLQuery,
  NotificationFields,
  getMemberNotificationSettingsGQLQuery,
  updateSpaceNotificationSettingsGQLMutation,
  updateNetworkNotificationSettingsGQLMutation,
  readNotificationGQLMutation,
  readNotificationsGQLMutation,
  deleteNotificationGQLMutation,
  deleteNotificationsGQLMutation,
  clearNotificationsCountGQLMutation,
  unsubscribeFromNotificationGQLMutation,
  getMemberPostNotificationSettingsGQLQuery,
  updateMemberPostNotificationSettingsGQLMutation,
} from '../graphql'
import {
  MemberNotificationSettings,
  MemberSpaceNotificationSettings,
  MemberNetworkNotificationSettings,
  MutationUpdateMemberNetworkNotificationSettingsArgs,
  MutationUpdateMemberSpaceNotificationSettingsArgs,
  PaginatedNotification,
  QueryMemberNotificationSettingsArgs,
  QueryNotificationsArgs,
  Scalars,
  MutationReadNotificationArgs,
  ActionFields,
  Action,
  MutationReadNotificationsArgs,
  MutationDeleteNotificationArgs,
  MutationDeleteNotificationsArgs,
  MutationUnsubscribeFromNotificationArgs,
  MemberPostNotificationSettings,
  QueryMemberPostNotificationSettingsArgs,
  MutationUpdateMemberPostNotificationSettingsArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class NotificationsClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async count(accessToken?: string): Promise<Scalars['Float']> {
    type QueryResult = { notificationsCount: { new: Scalars['Float'] } }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getNotificationsCountGQLQuery(),
      customToken: accessToken,
    })
    return result.notificationsCount.new
  }

  async list(
    variables: QueryNotificationsArgs = { limit: 10 },
    fields: NotificationFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedNotification> {
    type QueryResult = { notifications: PaginatedNotification }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getNotificationsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.notifications
  }

  async readNotification(
    variables: MutationReadNotificationArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { readNotification: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: readNotificationGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.readNotification
  }

  async readNotifications(
    variables: MutationReadNotificationsArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { readNotifications: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: readNotificationsGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.readNotifications
  }

  async deleteNotification(
    variables: MutationDeleteNotificationArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { deleteNotification: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteNotificationGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.deleteNotification
  }

  async deleteNotifications(
    variables: MutationDeleteNotificationsArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { deleteNotifications: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteNotificationsGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.deleteNotifications
  }

  async clearNotificationsCount(
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { clearNotificationsCount: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: clearNotificationsCountGQLMutation(fields),
      customToken: accessToken,
    })
    return result.clearNotificationsCount
  }

  async memberSettings(
    variables: QueryMemberNotificationSettingsArgs,
  ): Promise<MemberNotificationSettings> {
    const result = await this.client.authorizedRequest<{
      memberNotificationSettings: MemberNotificationSettings
    }>({
      variables,
      query: getMemberNotificationSettingsGQLQuery(),
    })

    return result.memberNotificationSettings
  }

  async memberPostNotificationSettings(
    variables: QueryMemberPostNotificationSettingsArgs,
  ): Promise<MemberPostNotificationSettings> {
    const result = await this.client.authorizedRequest<{
      memberPostNotificationSettings: MemberPostNotificationSettings
    }>({
      variables,
      query: getMemberPostNotificationSettingsGQLQuery(),
    })

    return result.memberPostNotificationSettings
  }

  async updateMemberPostNotificationSettings(
    variables: MutationUpdateMemberPostNotificationSettingsArgs,
  ): Promise<MemberPostNotificationSettings> {
    const result = await this.client.authorizedRequest<{
      updateMemberPostNotificationSettings: MemberPostNotificationSettings
    }>({
      variables,
      query: updateMemberPostNotificationSettingsGQLMutation(),
    })

    return result.updateMemberPostNotificationSettings
  }

  async updateSpaceSettings(
    variables: MutationUpdateMemberSpaceNotificationSettingsArgs,
  ): Promise<MemberSpaceNotificationSettings> {
    const result = await this.client.authorizedRequest<{
      updateMemberSpaceNotificationSettings: MemberSpaceNotificationSettings
    }>({
      variables,
      query: updateSpaceNotificationSettingsGQLMutation(),
    })

    return result.updateMemberSpaceNotificationSettings
  }

  async updateNetworkSettings(
    variables: MutationUpdateMemberNetworkNotificationSettingsArgs,
  ): Promise<MemberNetworkNotificationSettings> {
    const result = await this.client.authorizedRequest<{
      updateMemberNetworkNotificationSettings: MemberNetworkNotificationSettings
    }>({
      variables,
      query: updateNetworkNotificationSettingsGQLMutation(),
    })

    return result.updateMemberNetworkNotificationSettings
  }

  async unsubscribe(
    variables: MutationUnsubscribeFromNotificationArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { unsubscribeFromNotification: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: unsubscribeFromNotificationGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.unsubscribeFromNotification
  }
}
