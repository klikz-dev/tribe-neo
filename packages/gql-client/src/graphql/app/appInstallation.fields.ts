import {
  MemberFields,
  memberGQLFields,
  NetworkFields,
  networkGQLFields,
} from '../network'
import { AppFields, appGQLFields } from './app.fields'

export type AppInstallationFields =
  | 'basic'
  | 'all'
  | CustomAppInstallationFields

export interface CustomAppInstallationFields {
  app?: AppFields
  installedBy?: MemberFields
  network?: NetworkFields
}

const BASIC_APP_INSTALLAION_FIELDS: CustomAppInstallationFields = {}
const ALL_APP_INSTALLATION_FIELDS: CustomAppInstallationFields = {
  app: 'basic',
  installedBy: 'basic',
  network: 'basic',
}

export const appInstallationGQLFields = (fields: AppInstallationFields) => {
  if (fields === 'basic') fields = BASIC_APP_INSTALLAION_FIELDS
  if (fields === 'all') fields = ALL_APP_INSTALLATION_FIELDS
  return `
    appVersion
    context
    createdAt
    id
    installedAt
    permissions
    status
    updatedAt
    ${
      fields.app
        ? `
      app {
        ${appGQLFields(fields.app)}
      }
    `
        : ``
    }
    ${
      fields.installedBy
        ? `
      installedBy {
        ${memberGQLFields(fields.installedBy)}
      }
    `
        : ``
    }
    ${
      fields.network
        ? `
      network {
        ${networkGQLFields(fields.network)}
      }
    `
        : ``
    }
  `
}
