import merge from 'lodash.merge'

import {
  PermissionContext,
  Post,
  PostStatus,
  ReactionType,
} from '@tribeplatform/gql-client/types'

export const post = (customPost?: Partial<Post>): Post => {
  let shortContent = ''
  let title = ''
  try {
    shortContent = JSON.parse(
      customPost?.mappingFields.find(
        a => a.key === 'content' || a.key === 'answer',
      )?.value || null,
    )
    title = JSON.parse(
      customPost?.mappingFields.find(
        a => a.key === 'title' || a.key === 'question',
      )?.value || null,
    )
  } catch (e) {
    console.info(e)
  }

  const defaultPost: Post = {
    ownerId: '',
    postTypeId: '',
    spaceId: '',
    attachmentIds: [],
    attachments: [],
    createdById: null,
    embedIds: [],
    imageIds: [],
    isAnonymous: false,
    mentionedMembers: [],
    negativeReactionsCount: 0,
    networkId: '',
    pinnedInto: null,
    positiveReactionsCount: 0,
    primaryReactionType: ReactionType.LIKE_BASE,
    reactionsCount: 0,
    seoDetail: null,
    singleChoiceReactions: [],
    topRepliers: [],
    id: `something-new-${new Date().getTime()}`,
    createdAt: new Date().toISOString(),
    embeds: null,
    mentions: null,
    authMemberProps: {
      context: PermissionContext.POST,
      memberPostNotificationSettingsEnabled: false,
      permissions: [],
    },
    shortContent,
    hasMoreContent: false,
    repliedToIds: [],
    repliesCount: 0,
    totalRepliesCount: 0,
    status: PostStatus.PUBLISHED,
    tags: [],
    reactions: [],
    title,
  }

  return merge(defaultPost, customPost)
}
