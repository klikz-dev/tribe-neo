import {
  QuerySpaceArgs,
  QuerySpacePinnedPostsArgs,
  QuerySpacesArgs,
  QuerySpacesByIdsArgs,
  QueryTagPostsArgs,
} from '@tribeplatform/gql-client/types'

export const SPACE_KEY = 'space'
export const SPACES_KEY = 'spaces'
export const SPACES_BY_IDS_KEY = 'spacesByIds'
export const CREATE_SPACE_KEY = 'createSpace'
export const UPDATE_SPACE_KEY = 'updateSpace'
export const SPACE_TYPES_KEY = 'spaceTypes'
export const PINNED_POSTS_KEY = 'pinnedPosts'
export const TAGGED_POSTS_KEY = 'taggedPosts'

export const getSpaceKey = (args?: QuerySpaceArgs) =>
  args ? [SPACE_KEY, args] : [SPACE_KEY]
export const getSpacesKey = (args?: QuerySpacesArgs) =>
  args ? [SPACES_KEY, args] : [SPACES_KEY]
export const getSpacesByIdsKey = (args: QuerySpacesByIdsArgs) => [
  SPACES_BY_IDS_KEY,
  args,
]
export const getCreateSpaceKey = () => CREATE_SPACE_KEY
export const getSpaceTypesKey = () => SPACE_TYPES_KEY
export const getUpdateSpaceKey = () => UPDATE_SPACE_KEY
export const getPinnedPostsKey = (args?: QuerySpacePinnedPostsArgs) =>
  args ? [PINNED_POSTS_KEY, args] : [PINNED_POSTS_KEY]
export const getTaggedPostsKey = (args?: QueryTagPostsArgs) =>
  args ? [TAGGED_POSTS_KEY, args] : [TAGGED_POSTS_KEY]
