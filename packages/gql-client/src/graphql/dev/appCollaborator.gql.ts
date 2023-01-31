import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ActionFields, actionGQLFields } from '../../types'
import {
  AppCollaboratorFields,
  appCollaboratorGQLFields,
} from './appCollaborator.fields'

export const globalAppCollaboratorsQuery = (
  fields: AppCollaboratorFields,
) => gql`
  query globalAppCollaborators($appId: String!) {
    globalAppCollaborators(appId: $appId) {
      ${appCollaboratorGQLFields(fields)}
    }
  }
`

export const globalAddAppCollaboratorGQLMutation = (
  fields: AppCollaboratorFields,
): DocumentNode => gql`
  mutation globalAddAppCollaborator($appId: String!, $input: AddAppCollaboratorInput!) {
    globalAddAppCollaborator(appId: $appId, input: $input) {
      ${appCollaboratorGQLFields(fields)}
    }
  }
`

export const globalRemoveAppCollaboratorGQLMutation = (
  fields: ActionFields,
): DocumentNode => gql`
  mutation globalRemoveAppCollaborator($appId: String!, $collaboratorId: String!) {
    globalRemoveAppCollaborator(appId: $appId, collaboratorId: $collaboratorId) {
      ${actionGQLFields(fields)}
    }
  }
`
