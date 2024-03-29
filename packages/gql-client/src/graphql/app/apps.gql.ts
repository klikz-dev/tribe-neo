import gql from 'graphql-tag'

import { AppFields, appGQLFields } from './app.fields'
import {
  AppInstallationFields,
  appInstallationGQLFields,
} from './appInstallation.fields'
import { LimitedTokenFields } from './limitedToken.fields'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getLimitedTokenGQLQuery(fields: LimitedTokenFields) {
  return gql`
    query limitedToken(
      $networkId: String!
      $context: PermissionContext!
      $entityId: String!
      $impersonateMemberId: String
    ) {
      limitedToken(
        networkId: $networkId
        context: $context
        entityId: $entityId
        impersonateMemberId: $impersonateMemberId
      ) {
        accessToken
      }
    }
  `
}

export const appGQLQuery = (fields: AppFields) => gql`
  query App($id: ID, $slug: String) {
    app(id: $id, slug: $slug) {
      ${appGQLFields(fields)}
    }
  }
`

export const appsGQLQuery = (fields: AppFields) => gql`
  query Apps(
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
    $status: StoreItemStatus
  ) {
    apps(
      after: $after
      before: $before
      limit: $limit
      offset: $offset
      reverse: $reverse
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
          ${appGQLFields(fields)}
        }
      }
      nodes {
        ${appGQLFields(fields)}
      }
    }
  }
`

export const getAppNetworkSettingsGQLQuery = () => gql`
  query GetAppNetworkSettings($appId: ID!) {
    getAppNetworkSettings(appId: $appId)
  }
`

export const updateAppNetworkSettingsGQLMutation = () => gql`
  mutation UpdateAppNetworkSettings($appId: ID!, $settings: String!) {
    updateAppNetworkSettings(appId: $appId, settings: $settings) {
      data
      status
    }
  }
`

export const getAppSpaceSettingsGQLQuery = () => gql`
  query GetAppSpaceSettings($appId: ID!, $spaceId: ID!) {
    getAppSpaceSettings(appId: $appId, spaceId: $spaceId)
  }
`

export const installAppGQLMutation = (fields: AppInstallationFields) => gql`
  mutation InstallApp($appId: ID!, $input: InstallAppInput!) {
    installApp(appId: $appId, input: $input) {
      ${appInstallationGQLFields(fields)}
    }
  }
`

export const uninstallAppGQLMutation = (fields: AppInstallationFields) => gql`
  mutation UninstallApp($appInstallationId: ID!, $reason: String) {
    uninstallApp(appInstallationId: $appInstallationId, reason: $reason) {
      ${appInstallationGQLFields(fields)}
    }
  }
`

export const appInstallationsGQLQuery = (fields: AppInstallationFields) => gql`
  query NetworkAppInstallations(
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
    $status: AppInstallationStatus
  ) {
    getNetworkAppInstallations(
      after: $after
      before: $before
      limit: $limit
      offset: $offset
      reverse: $reverse
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
          ${appInstallationGQLFields(fields)}
        }
      }
      nodes {
        ${appInstallationGQLFields(fields)}
      }
    }
  }
`
