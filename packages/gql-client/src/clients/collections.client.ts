import {
  CollectionFields,
  createCollectionGQLMutation,
  deleteCollectionGQLMutation,
  getCollectionGQLQuery,
  getCollectionsGQLQuery,
  organizeCollectionsGQLMutation,
  organizeSpacesInCollectionMutation,
  updateCollectionGQLMutation,
} from '../graphql'
import {
  Action,
  Collection,
  MutationCreateCollectionArgs,
  MutationOrganizeCollectionsArgs,
  MutationUpdateCollectionArgs,
  QueryCollectionsArgs,
  Scalars,
  ActionFields,
  QueryCollectionArgs,
  MutationOrganizeSpacesInCollectionArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class CollectionsClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async create(
    variables: MutationCreateCollectionArgs,
    fields: CollectionFields = 'basic',
    accessToken?: string,
  ): Promise<Collection> {
    type QueryResult = { createCollection: Collection }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createCollectionGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.createCollection
  }

  async list(
    variables?: QueryCollectionsArgs,
    fields: CollectionFields = 'basic',
    accessToken?: string,
  ): Promise<Collection[]> {
    type QueryResult = { collections: Collection[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getCollectionsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.collections
  }

  async get(
    variables: QueryCollectionArgs,
    fields: CollectionFields = 'basic',
    accessToken?: string,
  ): Promise<Collection> {
    type QueryResult = { collection: Collection }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getCollectionGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.collection
  }

  async update(
    variables: MutationUpdateCollectionArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { updateCollection: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateCollectionGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateCollection
  }

  async delete(id: Scalars['ID'], accessToken?: string): Promise<Action> {
    type QueryResult = { deleteCollection: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteCollectionGQLMutation(),
      variables: { id },
      customToken: accessToken,
    })
    return result.deleteCollection
  }

  async organize(
    variables: MutationOrganizeCollectionsArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { organizeCollections: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: organizeCollectionsGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.organizeCollections
  }

  async organizeSpaces(
    variables: MutationOrganizeSpacesInCollectionArgs,
  ): Promise<Action> {
    type QueryResult = { organizeSpacesInCollection: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: organizeSpacesInCollectionMutation(),
      variables,
    })
    return result.organizeSpacesInCollection
  }
}
