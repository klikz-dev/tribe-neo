import {
  QuerySearchArgs,
  QueryPostsArgs,
  QueryRepliesArgs,
  QueryMemberPostsArgs,
  QueryTagsArgs,
  QueryTagPostsArgs,
  QueryPostReactionParticipantsArgs,
} from '@tribeplatform/gql-client/types'

export const SEARCH_KEY = 'search'
export const POST_KEY = 'post'
export const POSTS_KEY = 'posts'
export const CREATE_POST_KEY = 'createPost'
export const REPLY_KEY = 'reply'
export const ADD_REPLY_KEY = 'addReply'
export const ADD_POST_KEY = 'addPost'
export const UPDATE_POST_KEY = 'updatePost'
export const DELETE_POST_KEY = 'deletePost'
export const PIN_POST_TO_SPACE_KEY = 'pinPostToSpace'
export const UNPIN_POST_FROM_SPACE_KEY = 'unpinPostFromSpace'
export const TAGS_KEY = 'tags'
export const POST_REACTION_PARTICIPANTS_KEY = 'postReactionParticipants'

export const getSearchKey = (args: QuerySearchArgs) => [SEARCH_KEY, args]
export const getPostKey = (id?: string) => (id ? [POST_KEY, id] : [POST_KEY])
export const getPostsKey = (
  args?:
    | Partial<QueryPostsArgs>
    | Partial<QueryTagPostsArgs>
    | Partial<QueryRepliesArgs>
    | Partial<QueryMemberPostsArgs>,
) => (args ? [POSTS_KEY, args] : [POSTS_KEY])
export const getCreatePostKey = () => CREATE_POST_KEY
export const getReplyKey = (replyId: string) => [REPLY_KEY, replyId]
export const getAddReplyKey = () => ADD_REPLY_KEY
export const getAddPostKey = () => ADD_POST_KEY
export const getUpdatePostKey = () => UPDATE_POST_KEY
export const getDeletePostKey = () => DELETE_POST_KEY
export const getPinPostToSpaceKey = () => PIN_POST_TO_SPACE_KEY
export const getUnpinPostFromSpaceKey = () => UNPIN_POST_FROM_SPACE_KEY
export const getTagsKey = (args: QueryTagsArgs) => [TAGS_KEY, args]
export const getPostReactionParticipantsKey = (
  args?: QueryPostReactionParticipantsArgs,
) =>
  args
    ? [POST_REACTION_PARTICIPANTS_KEY, args]
    : [POST_REACTION_PARTICIPANTS_KEY]
