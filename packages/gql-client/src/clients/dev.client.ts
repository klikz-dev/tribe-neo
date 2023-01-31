import {
  AppCollaboratorFields,
  AppPublicationFields,
  EventTypeFields,
  globalAddAppCollaboratorGQLMutation,
  globalAppCollaboratorsQuery,
  GlobalAppFields,
  globalAppGQLQuery,
  globalAppPublicationsQuery,
  globalAppsGQLQuery,
  globalCreateAppGQLMutation,
  globalCreateImageGQLMutation,
  globalDeleteAppGQLMutation,
  globalEventTypesQuery,
  globalNetworksGQLQuery,
  globalPublishAppPrivatelyGQLMutation,
  globalRegenerateClientSecret,
  globalRemoveAppCollaboratorGQLMutation,
  globalTestAppWebhookGQLMutation,
  globalUnPublishAppPrivatelyGQLMutation,
  globalUpdateAppGQLMutation,
  PluralNetworkFields,
} from '../graphql'
import {
  Action,
  ActionFields,
  App,
  AppCollaborator,
  CreateImageInput,
  Image,
  MutationGlobalAddAppCollaboratorArgs,
  MutationGlobalCreateAppArgs,
  MutationGlobalRegenerateClientSecretArgs,
  MutationGlobalUpdateAppArgs,
  MutationGlobalDeleteAppArgs,
  MutationGlobalRemoveAppCollaboratorArgs,
  PaginatedApp,
  PaginatedNetwork,
  QueryGlobalAppArgs,
  QueryGlobalAppCollaboratorsArgs,
  QueryGlobalAppsArgs,
  QueryGlobalNetworksArgs,
  SignedUrl,
  UploadImagesArgs,
  QueryGlobalAppPublicationsArgs,
  AppPublication,
  MutationGlobalPublishAppPrivatelyArgs,
  MutationGlobalUnPublishAppPrivatelyArgs,
  MutationGlobalTestAppWebhookArgs,
  EventType,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class DevClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async apps(
    variables: QueryGlobalAppsArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedApp> {
    type QueryResult = { globalApps: PaginatedApp }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalAppsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalApps
  }

  async app(
    variables: QueryGlobalAppArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { globalApp: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalAppGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalApp
  }

  async createApp(
    variables: MutationGlobalCreateAppArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { globalCreateApp: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalCreateAppGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalCreateApp
  }

  async updateApp(
    variables: MutationGlobalUpdateAppArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { globalUpdateApp: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalUpdateAppGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalUpdateApp
  }

  async deleteApp(
    variables: MutationGlobalDeleteAppArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { globalDeleteApp: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalDeleteAppGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalDeleteApp
  }

  async networks(
    variables: QueryGlobalNetworksArgs,
    fields: PluralNetworkFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedNetwork> {
    type QueryResult = { globalNetworks: PaginatedNetwork }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalNetworksGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalNetworks
  }

  async regenerateClientSecret(
    variables: MutationGlobalRegenerateClientSecretArgs,
    fields: GlobalAppFields = 'basic',
    accessToken?: string,
  ): Promise<App> {
    type QueryResult = { globalRegenerateClientSecret: App }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalRegenerateClientSecret(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalRegenerateClientSecret
  }

  async createImages(variables: CreateImageInput[]): Promise<Array<SignedUrl>> {
    type QueryResult = { globalCreateImages: Array<SignedUrl> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalCreateImageGQLMutation(),
      variables: {
        input: variables,
      },
    })

    return result?.globalCreateImages
  }

  async uploadImages(input: UploadImagesArgs[]): Promise<Array<Image>> {
    const output: Image[] = []
    const signedUrls = await this.createImages(
      input.map(({ file, ...rest }) => ({
        contentType: file.type,
        ...rest,
      })),
    )

    const promises = signedUrls.map((signedUrl, index) => {
      const { file } = input[index]
      const formData = new FormData()
      const parsedFields = JSON.parse(signedUrl.fields)
      // The order of appended key-value into the formData matters.
      Object.entries(parsedFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return fetch(signedUrl.signedUrl, {
        method: 'POST',
        body: formData,
      })
        .then(r => r.text())
        .then(() => {
          output.push({
            id: signedUrl.mediaId,
            url: signedUrl.mediaUrl,
            urls: signedUrl.urls,
            cropX: input[index].cropX,
            cropY: input[index].cropY,
            cropZoom: input[index].cropZoom,
            name: input[index].name,
            cropHeight: input[index].cropHeight,
            cropWidth: input[index].cropWidth,
            downloadUrl: signedUrl.mediaDownloadUrl,
          })
        })
        .catch(e => {
          console.debug({ e })
        })
    })

    await Promise.all(promises.filter(Boolean))

    return output
  }

  async appCollaborators(
    variables: QueryGlobalAppCollaboratorsArgs,
    fields: AppCollaboratorFields = 'basic',
    accessToken?: string,
  ): Promise<Array<AppCollaborator>> {
    type QueryResult = { globalAppCollaborators: Array<AppCollaborator> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalAppCollaboratorsQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalAppCollaborators
  }

  async addAppCollaborator(
    variables: MutationGlobalAddAppCollaboratorArgs,
    fields: AppCollaboratorFields = 'basic',
    accessToken?: string,
  ): Promise<AppCollaborator> {
    type QueryResult = { globalAddAppCollaborator: AppCollaborator }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalAddAppCollaboratorGQLMutation(fields),
      variables,
      customToken: accessToken,
    })

    return result.globalAddAppCollaborator
  }

  async removeAppCollaborator(
    variables: MutationGlobalRemoveAppCollaboratorArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { globalRemoveAppCollaborator: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalRemoveAppCollaboratorGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalRemoveAppCollaborator
  }

  async appPublications(
    variables: QueryGlobalAppPublicationsArgs,
    fields: AppPublicationFields = 'basic',
    accessToken?: string,
  ): Promise<Array<AppPublication>> {
    type QueryResult = { globalAppPublications: Array<AppPublication> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalAppPublicationsQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalAppPublications
  }

  async publishAppPrivately(
    variables: MutationGlobalPublishAppPrivatelyArgs,
    fields: AppPublicationFields = 'basic',
    accessToken?: string,
  ): Promise<AppPublication> {
    type QueryResult = { globalPublishAppPrivately: AppPublication }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalPublishAppPrivatelyGQLMutation(fields),
      variables,
      customToken: accessToken,
    })

    return result.globalPublishAppPrivately
  }

  async unPublishAppPrivately(
    variables: MutationGlobalUnPublishAppPrivatelyArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { globalUnPublishAppPrivately: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalUnPublishAppPrivatelyGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalUnPublishAppPrivately
  }

  async testAppWebhook(
    variables: MutationGlobalTestAppWebhookArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { globalTestAppWebhook: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalTestAppWebhookGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalTestAppWebhook
  }

  async eventTypes(
    variables: any,
    fields: EventTypeFields = 'basic',
    accessToken?: string,
  ): Promise<Array<EventType>> {
    type QueryResult = { globalEventTypes: Array<EventType> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: globalEventTypesQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.globalEventTypes
  }
}
