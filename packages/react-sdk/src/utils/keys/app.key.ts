import {
  QueryGlobalAppPublicationsArgs,
  QueryGlobalAppCollaboratorsArgs,
  QueryAppArgs,
  QueryAppsArgs,
  QueryGetAppNetworkSettingsArgs,
  QueryGetAppSpaceSettingsArgs,
  QueryGetNetworkAppInstallationsArgs,
} from '@tribeplatform/gql-client/types'

export const APP_KEY = 'app'
export const APPS_KEY = 'apps'
export const APP_NETWORK_SETTINGS = 'appNetworkSettings'
export const APP_SPACE_SETTINGS = 'appSpaceSettings'
export const CREATE_APP_KEY = 'createApp'
export const UPDATE_APP_KEY = 'updateApp'
export const APP_INSTALLATIONS_KEY = 'appInstallations'
export const APP_COLLABORATORS_KEY = 'appCollaborators'
export const APP_PUBLICATIONS_KEY = 'appPublications'

export const getAppKey = (args?: QueryAppArgs) =>
  args ? [APP_KEY, args] : [APP_KEY]

export const getAppsKey = (args?: QueryAppsArgs) =>
  args ? [APPS_KEY, args] : [APPS_KEY]

export const getAppNetworkSettingsKey = (
  args?: QueryGetAppNetworkSettingsArgs,
) => (args ? [APP_NETWORK_SETTINGS, args] : [APP_NETWORK_SETTINGS])

export const getAppSpaceSettingsKey = (args: QueryGetAppSpaceSettingsArgs) =>
  args ? [APP_SPACE_SETTINGS, args] : [APP_SPACE_SETTINGS]

export const getCreateAppKey = () => CREATE_APP_KEY
export const getUpdateAppKey = () => UPDATE_APP_KEY
export const getAppInstallationsKey = (
  args?: QueryGetNetworkAppInstallationsArgs,
) => (args ? [APP_INSTALLATIONS_KEY, args] : [APP_INSTALLATIONS_KEY])
export const getAppCollaboratorsKey = (
  args?: QueryGlobalAppCollaboratorsArgs,
) => (args ? [APP_COLLABORATORS_KEY, args] : [APP_COLLABORATORS_KEY])
export const getAppPublicationsKey = (args?: QueryGlobalAppPublicationsArgs) =>
  args ? [APP_PUBLICATIONS_KEY, args] : [APP_PUBLICATIONS_KEY]
