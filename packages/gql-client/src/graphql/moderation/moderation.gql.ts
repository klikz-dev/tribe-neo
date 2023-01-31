import gql from 'graphql-tag'

import {
  ModerationItemFields,
  moderationItemGQLFields,
} from './moderationItem.fields'
import {
  ModerationItemReporterFields,
  moderationItemReporterGQLFields,
} from './moderationItemReporter.fields'

export const moderationItemGQLQuery = (fields: ModerationItemFields) => gql`
  query ModerationItem($id: ID!) {
    moderationItem(id: $id) {
      ${moderationItemGQLFields(fields)}
    }
  }
`

export const moderationItemsGQLQuery = (fields: ModerationItemFields) => gql`
  query ModerationItems(
    $after: String
    $before: String
    $entityId: String
    $entityType: ModerationEntityType
    $flaggedBy: FlaggedType
    $limit: Int!
    $offset: Int
    $reverse: Boolean
    $spaceId: String
    $status: ModerationStatus
  ) {
    moderationItems(
      after: $after
      before: $before
      entityId: $entityId
      entityType: $entityType
      flaggedBy: $flaggedBy
      limit: $limit
      offset: $offset
      reverse: $reverse
      spaceId: $spaceId
      status: $status
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ${moderationItemGQLFields(fields)}
        }
      }
      nodes {
        ${moderationItemGQLFields(fields)}
      }
    }
  }
`

export const moderationItemReportersGQLQuery = (
  fields: ModerationItemReporterFields,
) => gql`
  query ModerationItemReporters(
    $after: String
    $before: String
    $limit: Int!
    $moderationId: String!
    $offset: Int
    $reverse: Boolean
  ) {
    moderationItemReporters(
      after: $after
      before: $before
      limit: $limit
      moderationId: $moderationId
      offset: $offset
      reverse: $reverse
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ${moderationItemReporterGQLFields(fields)}
        }
      }
      nodes {
        ${moderationItemReporterGQLFields(fields)}
      }
    }
  }
`

export const moderationSettingsGQLQuery = () => gql`
  query ModerationSettings {
    moderationSettings {
      customBlacklist
      enableBlacklisting
      useDefaultBlacklisting
    }
  }
`

export const updateModerationSettingsGQLMutation = () => gql`
  mutation UpdateModerationSettings($input: UpdateModerationSettingsInput!) {
    updateModerationSettings(input: $input) {
      customBlacklist
      enableBlacklisting
      useDefaultBlacklisting
    }
  }
`

export const updateModerationItemGQLMutation = () => gql`
  mutation UpdateModerationItem($id: ID!, $input: UpdateModerationItemInput!) {
    updateModerationItem(id: $id, input: $input) {
      status
    }
  }
`
