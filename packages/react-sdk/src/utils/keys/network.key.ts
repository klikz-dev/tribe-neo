const NETWORK_KEY = 'network'
const UPDATE_NETWORK_KEY = 'updateNetwork'
const UPSERT_THEME_KEY = 'upsertTheme'
const DOMAIN_AVAILABILITY_KEY = 'domainAvailability'
const NEW_DOMAIN_STATUS_KEY = 'newDomainStatus'
const PAGES_KEY = 'pages'
const PAGE_KEY = 'page'
const CREATE_PAGE_KEY = 'create-page'
const UPDATE_PAGE_KEY = 'update-page'
const NETWORKS_KEY = 'networks'

export const getNetworkKey = () => NETWORK_KEY
export const getUpdateNetworkKey = () => UPDATE_NETWORK_KEY
export const getUpsertThemeKey = () => UPSERT_THEME_KEY
export const getPagesKey = () => PAGES_KEY
export const getPageKey = variables => [PAGE_KEY, variables]
export const getCreatePageKey = () => CREATE_PAGE_KEY
export const getUpdatePageKey = () => UPDATE_PAGE_KEY
export const getDomainAvailabilityKey = () => DOMAIN_AVAILABILITY_KEY
export const getNewDomainStatusKey = () => NEW_DOMAIN_STATUS_KEY
export const getNetworksKey = () => [NETWORKS_KEY]
