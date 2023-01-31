import {
  PaginatedSpaceFields,
  PostFields,
  SpaceFields,
  createSpaceGQLQuery,
  deleteSpaceGQLMutation,
  exploreSpacesGQLQuery,
  getSpaceGQLQuery,
  getSpacePinnedPostGQLQuery,
  getSpacesByIdsGQLQuery,
  getSpacesGQLQuery,
  joinSpaceGQLMutation,
  leaveSpaceGQLMutation,
  organizeSpacesInCollectionGQLMutation,
  updateSpaceGQLMutation,
  updateSpaceHighlightedTagsMutation,
} from '../graphql'
import {
  Action,
  ActionFields,
  MutationCreateSpaceArgs,
  MutationDeleteSpaceArgs,
  MutationJoinSpaceArgs,
  MutationLeaveSpaceArgs,
  MutationOrganizeSpacesInCollectionArgs,
  MutationUpdateSpaceArgs,
  MutationUpdateSpaceHighlightedTagsArgs,
  PaginatedSpace,
  Post,
  QueryExploreSpacesArgs,
  QuerySpaceArgs,
  QuerySpacePinnedPostsArgs,
  QuerySpacesArgs,
  QuerySpacesByIdsArgs,
  Space,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class SpacesClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async create(
    variables: MutationCreateSpaceArgs,
    fields: SpaceFields = 'basic',
    accessToken?: string,
  ): Promise<Space> {
    type QueryResult = { createSpace: Space }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createSpaceGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.createSpace
  }

  async list(
    variables: QuerySpacesArgs,
    fields: SpaceFields,
    accessToken?: string,
  ): Promise<PaginatedSpace> {
    type QueryResult = { spaces: PaginatedSpace }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpacesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spaces
  }

  async listByIds(
    variables: QuerySpacesByIdsArgs,
    fields: SpaceFields = 'basic',
    accessToken?: string,
  ): Promise<Space[]> {
    type QueryResult = { spacesByIds: Space[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpacesByIdsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spacesByIds
  }

  async organize(
    variables: MutationOrganizeSpacesInCollectionArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { organizeSpacesInCollection: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: organizeSpacesInCollectionGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.organizeSpacesInCollection
  }

  async get(
    variables: QuerySpaceArgs,
    fields: SpaceFields = 'basic',
    accessToken?: string,
  ): Promise<Space> {
    type QueryResult = { space: Space }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpaceGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.space
  }

  async update(
    variables: MutationUpdateSpaceArgs,
    fields: SpaceFields = 'basic',
  ): Promise<Space> {
    const result = await this.client.authorizedRequest<{ updateSpace: Space }>({
      query: updateSpaceGQLMutation(fields),
      variables,
    })

    return result.updateSpace
  }

  async join(variables: MutationJoinSpaceArgs): Promise<Action> {
    const result = await this.client.authorizedRequest<{
      joinSpace: Action
    }>({
      query: joinSpaceGQLMutation(),
      variables,
    })

    return result.joinSpace
  }

  async leave(variables: MutationLeaveSpaceArgs): Promise<Action> {
    const result = await this.client.authorizedRequest<{
      leaveSpace: Action
    }>({
      query: leaveSpaceGQLMutation(),
      variables,
    })

    return result.leaveSpace
  }

  async pinnedPosts(
    variables: QuerySpacePinnedPostsArgs,
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<Array<Post>> {
    type QueryResult = { spacePinnedPosts: Array<Post> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getSpacePinnedPostGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.spacePinnedPosts
  }

  async explore(
    variables: QueryExploreSpacesArgs,
    fields: PaginatedSpaceFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedSpace> {
    type QueryResult = { exploreSpaces: PaginatedSpace }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: exploreSpacesGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.exploreSpaces
  }

  async updateHighlightedTags(
    variables: MutationUpdateSpaceHighlightedTagsArgs,
    accessToken?: string,
  ): Promise<Action> {
    const result = await this.client.authorizedRequest<{
      updateSpaceHighlightedTags: Action
    }>({
      query: updateSpaceHighlightedTagsMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateSpaceHighlightedTags
  }

  async delete(
    variables: MutationDeleteSpaceArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { deleteSpace: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteSpaceGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.deleteSpace
  }
}
