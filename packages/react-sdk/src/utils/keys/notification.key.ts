import {
  QueryMemberNotificationSettingsArgs,
  QueryMemberPostNotificationSettingsArgs,
  QueryNotificationsArgs,
} from '@tribeplatform/gql-client/types'

export const NOTIFICATIONS_KEY = 'notifications'
export const NOTIFICATIONS_COUNT_KEY = 'notificationsCount'
export const MEMBER_NOTIFICATION_SETTINGS = 'memberNotificationSettings'
export const MEMBER_POST_NOTIFICATION_SETTINGS =
  'memberPostNotificationSettings'
export const READ_NOTIFICATION_KEY = 'readNotification'
export const READ_NOTIFICATIONS_KEY = 'readNotifications'
export const DELETE_NOTIFICATION_KEY = 'deleteNotification'
export const DELETE_NOTIFICATIONS_KEY = 'deleteNotifications'
export const CLEAR_NOTIFICATIONS_COUNT_KEY = 'clearNotificationsCount'
export const UNSUBSCRIBE_FROM_NOTIFICATION_KEY = 'unsubscribeFromNotification'

export const getMemberNotificationSettingsKey = (
  args?: QueryMemberNotificationSettingsArgs,
) =>
  args ? [MEMBER_NOTIFICATION_SETTINGS, args] : [MEMBER_NOTIFICATION_SETTINGS]

export const getMemberPostNotificationSettingsKey = (
  args: QueryMemberPostNotificationSettingsArgs = {
    postId: undefined,
  },
) => [MEMBER_POST_NOTIFICATION_SETTINGS, args]

export const getNotificationsKey = (args?: QueryNotificationsArgs) =>
  args ? [NOTIFICATIONS_KEY, args] : [NOTIFICATIONS_KEY]

export const getNotificationsCountKey = () => NOTIFICATIONS_COUNT_KEY
export const getReadNotificationKey = () => READ_NOTIFICATION_KEY
export const getReadNotificationsKey = () => READ_NOTIFICATIONS_KEY
export const getDeleteNotificationKey = () => DELETE_NOTIFICATION_KEY
export const getDeleteNotificationsKey = () => DELETE_NOTIFICATIONS_KEY
export const getClearNotificationsCountKey = () => CLEAR_NOTIFICATIONS_COUNT_KEY
export const getUnsubscribeFromNotificationKey = () =>
  UNSUBSCRIBE_FROM_NOTIFICATION_KEY
