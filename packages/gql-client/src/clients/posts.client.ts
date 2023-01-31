import { DocumentNode } from 'graphql'

import {
  PostFields,
  PostTypeFields,
  addReactionGQLMutation,
  createPostGQLQuery,
  createReplyGQLQuery,
  deletePostGQLMutation,
  getFeedGQLQuery,
  getMemberPostsGQLQuery,
  getPostGQLQuery,
  getPostTypeGQLQuery,
  getPostTypesGQLQuery,
  getPostsGQLQuery,
  getRepliesGQLQuery,
  getSpaceTaggedPostsGQLQuery,
  hidePostGQLMutation,
  pinPostToSpaceGQLMutation,
  removeReactionGQLMutation,
  unhidePostGQLMutation,
  unpinPostFromSpaceGQLMutation,
  updatePostGQLMutation,
  MemberFields,
  postReactionParticipantsGQLQuery,
} from '../graphql'
import {
  Action,
  ActionFields,
  MutationAddReactionArgs,
  MutationCreatePostArgs,
  MutationCreateReplyArgs,
  MutationDeletePostArgs,
  MutationHidePostArgs,
  MutationPinPostToSpaceArgs,
  MutationRemoveReactionArgs,
  MutationUnhidePostArgs,
  MutationUnpinPostFromSpaceArgs,
  MutationUpdatePostArgs,
  PaginatedPost,
  PaginatedPostReactionParticipant,
  PaginatedPostType,
  Post,
  PostType,
  QueryFeedArgs,
  QueryGetPostsArgs,
  QueryMemberPostsArgs,
  QueryPostReactionParticipantsArgs,
  QueryPostTypesArgs,
  QueryRepliesArgs,
  QueryTagPostsArgs,
  Scalars,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class PostsClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async listPostTypes(
    variables: QueryPostTypesArgs,
    fields: PostTypeFields = 'basic',
    customToken?: string,
  ): Promise<PaginatedPostType> {
    type QueryResult = { postTypes: PaginatedPostType }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getPostTypesGQLQuery(fields),
      variables,
      customToken,
    })
    return result.postTypes
  }

  async getPostType(
    id: Scalars['ID'],
    fields: PostTypeFields = 'basic',
  ): Promise<PostType> {
    type QueryResult = { postType: PostType }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getPostTypeGQLQuery(fields),
      variables: { id },
    })
    return result.postType
  }

  async create(
    variables: MutationCreatePostArgs,
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<Post> {
    type QueryResult = { createPost: Post }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createPostGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.createPost
  }

  async list(
    variables: QueryGetPostsArgs | QueryTagPostsArgs,
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedPost> {
    type QueryResult = { posts: PaginatedPost } | { tagPosts: PaginatedPost }

    let query: DocumentNode
    if ('tagId' in variables) {
      query = getSpaceTaggedPostsGQLQuery(fields)
    } else {
      query = getPostsGQLQuery(fields)
    }

    const result = await this.client.authorizedRequest<QueryResult>({
      query,
      variables,
      customToken: accessToken,
    })
    if ('tagPosts' in result) {
      return result.tagPosts
    }
    return result.posts
  }

  async get(
    id: Scalars['ID'],
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<Post> {
    type QueryResult = { post: Post }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getPostGQLQuery(fields),
      variables: { id },
      customToken: accessToken,
    })
    return result.post
  }

  async feed(
    variables: QueryFeedArgs = { limit: 10 },
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedPost> {
    type QueryResult = { feed: PaginatedPost }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getFeedGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.feed
  }

  async reply(
    postId: Scalars['ID'],
    variables: Omit<MutationCreateReplyArgs, 'postId'>,
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<Post> {
    type QueryResult = { createReply: Post }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createReplyGQLQuery(fields),
      variables: {
        postId,
        ...variables,
      },
      customToken: accessToken,
    })
    return result.createReply
  }

  async byMember(
    memberId: Scalars['ID'],
    variables: Omit<QueryMemberPostsArgs, 'memberId'> = { limit: 10 },
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedPost> {
    type QueryResult = { memberPosts: PaginatedPost }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getMemberPostsGQLQuery(fields),
      variables: {
        memberId,
        ...variables,
      },
      customToken: accessToken,
    })
    return result.memberPosts
  }

  async replies(
    variables: QueryRepliesArgs,
    fields: PostFields = 'basic',
  ): Promise<PaginatedPost> {
    const result = await this.client.authorizedRequest<{
      replies: PaginatedPost
    }>({
      query: getRepliesGQLQuery(fields),
      variables,
    })

    return result.replies
  }

  async addReaction(
    variables: MutationAddReactionArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { addReaction: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: addReactionGQLMutation(fields),
      variables,
      customToken: accessToken,
    })

    return result.addReaction
  }

  async removeReaction(
    variables: MutationRemoveReactionArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { removeReaction: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: removeReactionGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.removeReaction
  }

  async hide(
    variables: MutationHidePostArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { hidePost: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: hidePostGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.hidePost
  }

  async unhide(
    variables: MutationUnhidePostArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { unhidePost: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: unhidePostGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.unhidePost
  }

  async delete(
    variables: MutationDeletePostArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { deletePost: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deletePostGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.deletePost
  }

  async update(
    variables: MutationUpdatePostArgs,
    fields: PostFields = 'basic',
    accessToken?: string,
  ): Promise<Post> {
    type QueryResult = { updatePost: Post }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updatePostGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.updatePost
  }

  async pinToSpace(
    variables: MutationPinPostToSpaceArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { pinPostToSpace: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: pinPostToSpaceGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.pinPostToSpace
  }

  async unpinFromSpace(
    variables: MutationUnpinPostFromSpaceArgs,
    fields: ActionFields = 'basic',
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { unpinPostFromSpace: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: unpinPostFromSpaceGQLMutation(fields),
      variables,
      customToken: accessToken,
    })
    return result.unpinPostFromSpace
  }

  async reactionParticipants(
    variables: QueryPostReactionParticipantsArgs,
    fields: MemberFields = 'basic',
    accessToken?: string,
  ): Promise<PaginatedPostReactionParticipant> {
    type QueryResult = {
      postReactionParticipants: PaginatedPostReactionParticipant
    }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: postReactionParticipantsGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.postReactionParticipants
  }
}
