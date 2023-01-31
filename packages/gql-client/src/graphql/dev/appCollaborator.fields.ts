import { GlobalAppFields, globalAppGQLFields } from './globalApp.fields'

export type AppCollaboratorFields =
  | 'basic'
  | 'all'
  | CustomAppCollaboratorFields

export interface CustomAppCollaboratorFields {
  app?: GlobalAppFields
}

const BASIC_APP_COLLABORATOR_FIELDS: CustomAppCollaboratorFields = {}
const ALL_APP_COLLABORATOR_FIELDS: CustomAppCollaboratorFields = {
  app: 'basic',
}

export const appCollaboratorGQLFields = (fields: AppCollaboratorFields) => {
  if (fields === 'basic') fields = BASIC_APP_COLLABORATOR_FIELDS
  if (fields === 'all') fields = ALL_APP_COLLABORATOR_FIELDS
  return `
    id
    appId
    email
    createdAt
    type
    ${
      fields.app
        ? `
      app {
        ${globalAppGQLFields(fields.app)}
      }
    `
        : ``
    }
  `
}
