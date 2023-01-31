import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import { memberPostNotificationSettingsFields } from './memberPostNotificationSettings.fields'
import { networkNotificationSettingsFields } from './networkNotificationSettings.fields'
import {
  NotificationFields,
  notificationGQLFields,
} from './notification.fields'
import { spaceNotificationSettingsFields } from './spaceNotificationSettings.fields'

export function getNotificationsGQLQuery(
  fields: NotificationFields,
): DocumentNode {
  return gql`
    query getNotifications($after: String, $limit: Int!) {
      notifications(after: $after, limit: $limit) {
        edges {
          cursor
          node {
            ${notificationGQLFields(fields)}
          }
        }
        nodes {
          ${notificationGQLFields(fields)}
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  `
}

export function getNotificationsCountGQLQuery(): DocumentNode {
  return gql`
    query getNotificationsCount {
      notificationsCount {
        new
      }
    }
  `
}

export function getMemberNotificationSettingsGQLQuery(): DocumentNode {
  return gql`
    query memberNotificationSettings($id: ID) {
      memberNotificationSettings(id: $id) {
        __typename
        network {
          ${networkNotificationSettingsFields()}
        }
        spaces {
          ${spaceNotificationSettingsFields()}
        }
      }
    }
  `
}

export function getMemberPostNotificationSettingsGQLQuery(): DocumentNode {
  return gql`
    query memberPostNotificationSettings($memberId: ID, $postId: ID!) {
      memberPostNotificationSettings(memberId: $memberId, postId: $postId) {
        ${memberPostNotificationSettingsFields()}
      }
    }
  `
}

export function updateMemberPostNotificationSettingsGQLMutation(): DocumentNode {
  return gql`
    mutation updateMemberPostNotificationSettings(
      $input: UpdateMemberPostNotificationSettingsInput!
      $memberId: ID
      $postId: ID!
    ) {
      updateMemberPostNotificationSettings(
        input: $input
        memberId: $memberId
        postId: $postId
      ) {
        ${memberPostNotificationSettingsFields()}
      }
    }
  `
}

export const updateNetworkNotificationSettingsGQLMutation = () => gql`
  mutation updateNetworkNotificationSettings(
    $channel: NotificationChannel!
    $input: UpdateMemberNetworkNotificationSettingsInput!
    $memberId: ID
  ) {
    updateMemberNetworkNotificationSettings(
      channel: $channel
      input: $input
      memberId: $memberId
    ) {
      ${networkNotificationSettingsFields()}
    }
  }
`

export const updateSpaceNotificationSettingsGQLMutation = () => gql`
  mutation updateSpaceNotificationSettings(
    $channel: NotificationChannel!
    $input: UpdateMemberSpaceNotificationSettingsInput!
    $memberId: ID
    $spaceId: ID!
  ) {
    updateMemberSpaceNotificationSettings(
      channel: $channel
      input: $input
      memberId: $memberId
      spaceId: $spaceId
    ) {
      ${spaceNotificationSettingsFields()}
    }
  }
`

export const readNotificationGQLMutation = (fields: ActionFields) => gql`
  mutation ReadNotification($notificationId: ID!) {
    readNotification(notificationId: $notificationId) {
      ${actionGQLFields(fields)}
    }
  }
`

export const readNotificationsGQLMutation = (fields: ActionFields) => gql`
  mutation ReadNotifications($ids: [ID!]!) {
    readNotifications(ids: $ids) {
      ${actionGQLFields(fields)}
    }
  }
`

export const deleteNotificationGQLMutation = (fields: ActionFields) => gql`
  mutation DeleteNotification($notificationId: ID!) {
    deleteNotification(notificationId: $notificationId) {
      ${actionGQLFields(fields)} 
    }
  }
`

export const deleteNotificationsGQLMutation = (fields: ActionFields) => gql`
  mutation DeleteNotifications($ids: [ID!]!) {
    deleteNotifications(ids: $ids) {
      ${actionGQLFields(fields)}
    }
  }
`

export const clearNotificationsCountGQLMutation = (fields: ActionFields) => gql`
  mutation ClearNotificationsCount {
    clearNotificationsCount {
      ${actionGQLFields(fields)}
    }
  }
`

export const unsubscribeFromNotificationGQLMutation = (fields: ActionFields) =>
  gql`
    mutation UnsubscribeFromNotification($input: UnsubscribeWithTokenInput!) {
      unsubscribeFromNotification(input: $input) {
        ${actionGQLFields(fields)}
      }
    }
  `
