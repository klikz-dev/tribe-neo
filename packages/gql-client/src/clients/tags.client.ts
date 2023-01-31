import {
  createTagGQLMutation,
  getTagsGQLQuery,
  TagFields,
  updateTagGQLMutation,
} from '../graphql'
import {
  MutationCreateTagArgs,
  MutationUpdateTagArgs,
  PaginatedTag,
  QueryTagsArgs,
  Tag,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class TagsClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async list(
    variables: QueryTagsArgs,
    fields: TagFields,
    accessToken?: string,
  ): Promise<PaginatedTag> {
    type QueryResult = { tags: PaginatedTag }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getTagsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.tags
  }

  async create(
    variables: MutationCreateTagArgs,
    fields: TagFields = 'basic',
    accessToken?: string,
  ): Promise<Tag> {
    type QueryResult = { createTag: Tag }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createTagGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.createTag
  }

  async update(
    variables: MutationUpdateTagArgs,
    fields: TagFields = 'basic',
    accessToken?: string,
  ): Promise<Tag> {
    type QueryResult = { updateTag: Tag }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateTagGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updateTag
  }
}
