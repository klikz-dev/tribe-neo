import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import {
  AppPublicationFields,
  appPublicationGQLFields,
} from './appPublication.fields'

export const globalAppPublicationsQuery = (fields: AppPublicationFields) => gql`
  query globalAppPublications($appId: ID!) {
    globalAppPublications(appId: $appId) {
      ${appPublicationGQLFields(fields)}
    }
  }
`

export const globalPublishAppPrivatelyGQLMutation = (
  fields: AppPublicationFields,
): DocumentNode => gql`
  mutation globalPublishAppPrivately($appId: ID!, $networkId: ID!) {
    globalPublishAppPrivately(appId: $appId, networkId: $networkId) {
      ${appPublicationGQLFields(fields)}
    }
  }
`

export const globalUnPublishAppPrivatelyGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation globalUnPublishAppPrivately($appId: ID!, $networkId: ID!) {
    globalUnPublishAppPrivately(appId: $appId, networkId: $networkId) {
      ${actionGQLFields(fields)}
    }
  }
`
