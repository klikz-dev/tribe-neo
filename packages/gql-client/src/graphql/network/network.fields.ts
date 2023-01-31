import { MediaFields, mediaGQLFields } from '../media'
import { PageFields, pageGQLFields } from '../page'
import {
  NetworkAuthMemberPropsFields,
  networkAuthMemberPropsGQLFields,
} from '../permission'
import { navigationSlatesFields, navigationSlatesGQLFields } from '../slate'
import { SpaceFields, spaceGQLFields } from '../space'
import {
  NewThemeFields,
  newThemesGQLFields,
  ThemesFields,
  themesGQLFields,
} from '../theme'
import { CustomCodeFields } from './customCode.fields'
import {
  CustomFieldsSchemaFields,
  customFieldsSchemaGQLFields,
} from './customFieldsSchema.fields'
import { customCodeGQLFields, topNavigationGQLFields } from './network.gql'
import { PlanFields, planGQLFields } from './plan.fields'
import { RoleFields, roleGQLFields } from './role.fields'
import { TopNavigationFields } from './topNavigation.fields'

export type NetworkFields = 'basic' | 'all' | 'default' | CustomNetworkFields

export interface CustomNetworkFields {
  navigationSlates?: navigationSlatesFields
  activeTheme?: NewThemeFields
  themes?: ThemesFields
  topNavigation?: TopNavigationFields
  logo?: MediaFields
  favicon?: MediaFields
  whoCanInvite?: RoleFields
  defaultSpaces?: SpaceFields
  roles?: RoleFields
  customCode?: CustomCodeFields
  authMemberProps?: NetworkAuthMemberPropsFields
  subscriptionPlan?: PlanFields
  pages?: PageFields
  memberFields?: CustomFieldsSchemaFields
}

const BASIC_NETWORK_FIELDS: CustomNetworkFields = {}
const ALL_NETWORK_FIELDS: CustomNetworkFields = {
  activeTheme: 'basic',
  themes: 'basic',
  topNavigation: 'basic',
  logo: 'basic',
  favicon: 'basic',
  whoCanInvite: 'basic',
  defaultSpaces: 'basic',
  roles: 'basic',
  customCode: 'basic',
  authMemberProps: 'basic',
  subscriptionPlan: 'basic',
  pages: 'basic',
  memberFields: 'basic',
}
const DEFAULT_NETWORK_FIELDS: CustomNetworkFields = {
  authMemberProps: 'all',
  customCode: 'all',
  defaultSpaces: 'basic',
  favicon: 'all',
  logo: 'all',
  roles: 'all',
  navigationSlates: 'all',
  themes: 'all',
  activeTheme: 'all',
  topNavigation: 'all',
  whoCanInvite: 'all',
  subscriptionPlan: 'all',
  pages: 'all',
  memberFields: 'all',
}

export function networkGQLFields(fields: NetworkFields): string {
  if (fields === 'basic') fields = BASIC_NETWORK_FIELDS
  if (fields === 'all') fields = ALL_NETWORK_FIELDS
  if (fields === 'default') fields = DEFAULT_NETWORK_FIELDS

  return `
    id
    companyName
    name
    description
    visibility
    membership
    logoId
    faviconId
    locale
    domain
    newDomain
    incidentEmails
    privacyPolicyUrl
    termsOfServiceUrl
    brandColor
    billingEmail
    status
    memberCapacity
    memberCapacityDeclared
    seatsCapacity
    additionalSeatsCapacity
    seatCapacityDeclared
    tribeBranding
    whoCanInviteIds
    hideDefaultAuthenticationForm
    releaseChannel
    activeSso {
      logoutUrl
      settingsUrl
    }
    ${
      fields.navigationSlates
        ? `
      navigationSlates {
        ${navigationSlatesGQLFields(fields.navigationSlates)}
      }
    `
        : ``
    }
    ${
      fields.activeTheme
        ? `
      activeTheme {
        ${newThemesGQLFields(fields.activeTheme)}
      }
    `
        : ``
    }
    ${
      fields.themes
        ? `
      themes {
        ${themesGQLFields(fields.themes)}
      }
    `
        : ``
    }
    ${
      fields.topNavigation
        ? `
      topNavigation {
        ${topNavigationGQLFields(fields.topNavigation)}
      }
    `
        : ``
    }
    ${
      fields.logo
        ? `
      logo {
        ${mediaGQLFields(fields.logo)}
      }
    `
        : ``
    }
    ${
      fields.favicon
        ? `
      favicon {
        ${mediaGQLFields(fields.favicon)}
      }
    `
        : ``
    }
    ${
      fields.whoCanInvite
        ? `
      whoCanInvite {
        ${roleGQLFields(fields.whoCanInvite)}
      }
    `
        : ``
    }
    ${
      fields.defaultSpaces
        ? `
      defaultSpaces {
        ${spaceGQLFields(fields.defaultSpaces)}
      }
    `
        : ``
    }
    ${
      fields.roles
        ? `
      roles {
        ${roleGQLFields(fields.roles)}
      }
    `
        : ``
    }
    ${
      fields.customCode
        ? `
      customCodes(anonymize: false) {
        ${customCodeGQLFields(fields.customCode)}
      }
    `
        : ``
    }
    ${
      fields.authMemberProps
        ? `
      authMemberProps {
        ${networkAuthMemberPropsGQLFields(fields.authMemberProps)}
      }
    `
        : ``
    }
    ${
      fields.subscriptionPlan
        ? `
      subscriptionPlan {
        ${planGQLFields(fields.subscriptionPlan)}
      }
    `
        : ``
    }
    ${
      fields.pages
        ? `
      pages {
        ${pageGQLFields(fields.pages)}
      }
    `
        : ``
    }
    ${
      fields.memberFields
        ? `
      memberFields {
        ${customFieldsSchemaGQLFields(fields.memberFields)}
      }
    `
        : ``
    }
  `
}
