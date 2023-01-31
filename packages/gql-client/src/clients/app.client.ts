import {
  AppFields,
  appGQLQuery,
  AppInstallationFields,
  appInstallationsGQLQuery,
  appsGQLQuery,
  getAppNetworkSettingsGQLQuery,
  getAppSpaceSettingsGQLQuery,
  installAppGQLMutation,
  uninstallAppGQLMutation,
  updateAppNetworkSettingsGQLMutation,
} from '../graphql'
import {
  App,
  AppAction,
  AppInstallation,
  MutationInstallAppArgs,
  MutationUninstallAppArgs,
  MutationUpdateAppNetworkSettingsArgs,
  PaginatedApp,
  PaginatedAppInstallation,
  QueryAppArgs,
  QueryAppsArgs,
  QueryGetAppNetworkSettingsArgs,
  QueryGetAppSpaceSettingsArgs,
  QueryGetNetworkAppInstallationsArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class AppClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async get(
    variables: QueryAppArgs,
    fields: AppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { app: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: appGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.app
  }

  async list(
    variables: QueryAppsArgs,
    fields: AppFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedApp> {
    type QueryResult = { apps: PaginatedApp }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: appsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.apps
  }

  async networkSettings(
    variables: QueryGetAppNetworkSettingsArgs,
    accessToken?: string,
  ): Promise<string> {
    type QueryResult = { getAppNetworkSettings: string }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getAppNetworkSettingsGQLQuery(),
      variables,
      customToken: accessToken,
    })
    return result.getAppNetworkSettings
  }

  async updateNetworkSettings(
    variables: MutationUpdateAppNetworkSettingsArgs,
    accessToken?: string,
  ): Promise<AppAction> {
    type QueryResult = { updateAppNetworkSettings: AppAction }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateAppNetworkSettingsGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateAppNetworkSettings
  }

  async spaceSettings(
    variables: QueryGetAppSpaceSettingsArgs,
    accessToken?: string,
  ): Promise<string> {
    type QueryResult = { getAppSpaceSettings: string }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getAppSpaceSettingsGQLQuery(),
      variables,
      customToken: accessToken,
    })
    return result.getAppSpaceSettings
  }

  async install(
    variables: MutationInstallAppArgs,
    fields: AppInstallationFields = 'basic',
    accessToken?: string,
  ): Promise<AppInstallation> {
    type QueryResult = { installApp: AppInstallation }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: installAppGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.installApp
  }

  async uninstall(
    variables: MutationUninstallAppArgs,
    fields: AppInstallationFields = 'basic',
    accessToken?: string,
  ): Promise<AppInstallation> {
    type QueryResult = { uninstallApp: AppInstallation }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: uninstallAppGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.uninstallApp
  }

  async appInstallations(
    variables: QueryGetNetworkAppInstallationsArgs,
    fields: AppInstallationFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedAppInstallation> {
    type QueryResult = { getNetworkAppInstallations: PaginatedAppInstallation }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: appInstallationsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.getNetworkAppInstallations
  }
}
