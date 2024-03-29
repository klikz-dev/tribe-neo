import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import { signedUrlGQLFields } from '../media'
import {
  PluralNetworkFields,
  pluralNetworkGQLFields,
} from '../network/pluralNetwork.fields'
import { GlobalAppFields, globalAppGQLFields } from './globalApp.fields'

export const globalAppsGQLQuery = (fields: GlobalAppFields) => gql`
  query GlobalApps(
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
    $status: StoreItemStatus
  ) {
    globalApps(
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
          ${globalAppGQLFields(fields)}
        }
      }
      nodes {
        ${globalAppGQLFields(fields)}
      }
    }
  }
`

export const globalAppGQLQuery = (fields: GlobalAppFields) => gql`
  query GlobalApp($id: ID, $slug: String) {
    globalApp(
      id: $id, slug: $slug
    ) {
      ${globalAppGQLFields(fields)}
    }
  }
`

export const globalCreateAppGQLMutation = (fields: GlobalAppFields) => gql`
  mutation globalCreateApp($input: CreateAppInput!) {
    globalCreateApp(input: $input) {
      ${globalAppGQLFields(fields)}
    }
  }
`

export const globalUpdateAppGQLMutation = (fields: GlobalAppFields) => gql`
  mutation globalUpdateApp($id: ID!, $input: UpdateAppInput!) {
    globalUpdateApp(id: $id, input: $input) {
      ${globalAppGQLFields(fields)}
    }
  }
`

export const globalDeleteAppGQLMutation = (fields: GlobalAppFields) => gql`
  mutation globalDeleteApp($id: ID!) {
    globalDeleteApp(id: $id) {
      ${globalAppGQLFields(fields)}
    }
  }
`

export const globalNetworksGQLQuery = (fields: PluralNetworkFields) => gql`
  query GlobalNetworks(
    $after: String
    $before: String
    $limit: Int!
    $offset: Int
    $reverse: Boolean
    $query: String
    $roleType: RoleType
  ) {
    globalNetworks(
      after: $after
      before: $before
      limit: $limit
      offset: $offset
      reverse: $reverse
      query: $query
      roleType: $roleType
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ${pluralNetworkGQLFields(fields)}
        }
      }
      nodes {
        ${pluralNetworkGQLFields(fields)}
      }
    }
  }
`

export function globalRegenerateClientSecret(
  fields: GlobalAppFields,
): DocumentNode {
  return gql`
    mutation globalRegenerateClientSecret($appId: ID!) {
      globalRegenerateClientSecret(appId: $appId) {
        ${globalAppGQLFields(fields)}
      }
    }
  `
}

export const globalCreateImageGQLMutation = () => gql`
  mutation globalCreateImages($input: [CreateImageInput!]!) {
    globalCreateImages(input: $input) {
      ${signedUrlGQLFields()}
    }
  }
`

export const globalTestAppWebhookGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation globalTestAppWebhook($appId: ID!, $input: TestAppWebhookInput!) {
    globalTestAppWebhook(appId: $appId, input: $input) {
      ${actionGQLFields(fields)}
    }
  }
`
