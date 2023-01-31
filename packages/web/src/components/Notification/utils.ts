import { SpaceNotificationPreference } from '@tribeplatform/gql-client/types'

export const NotificationSettingOptions = [
  {
    value: SpaceNotificationPreference.ALL,
    label: 'All activity (new posts & replies)',
    description: 'Notify me about new posts and replies in this space',
  },
  {
    value: SpaceNotificationPreference.NEW_POST,
    label: 'New posts',
    description: 'Notify me about new posts in this space',
  },
  {
    value: SpaceNotificationPreference.NONE,
    label: 'Posts of Interest',
    description:
      'Notify me about new comments and reactions to my posts, and the posts I previously commented on',
  },
]
