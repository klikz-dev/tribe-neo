import {
  EmbedFields,
  embedGQLFields,
  MediaFields,
  mediaGQLFields,
} from '../media'
import {
  MemberFields,
  memberGQLFields,
  PluralNetworkFields,
  pluralNetworkGQLFields,
} from '../network'

export type GlobalAppFields = 'basic' | 'all' | CustomGlobalAppFields

export interface CustomGlobalAppFields {
  banner?: MediaFields
  createdBy?: MemberFields
  customCodes?: 'basic'
  embeds?: EmbedFields
  favicon?: MediaFields
  image?: MediaFields
  images?: MediaFields
  network?: PluralNetworkFields
  updatedBy?: MemberFields
}

const BASIC_GLOBAL_APP_FIELDS: CustomGlobalAppFields = {}
const ALL_GLOBAL_APP_FIELDS: CustomGlobalAppFields = {
  banner: 'basic',
  createdBy: 'basic',
  customCodes: 'basic',
  embeds: 'basic',
  favicon: 'basic',
  image: 'basic',
  images: 'basic',
  network: 'basic',
  updatedBy: 'basic',
}

export const globalAppGQLFields = (fields: GlobalAppFields) => {
  if (fields === 'basic') fields = BASIC_GLOBAL_APP_FIELDS
  if (fields === 'all') fields = ALL_GLOBAL_APP_FIELDS
  return `
    about
    authorName
    authorUrl
    clientId
    clientSecret
    comingSoon
    createdAt
    description
    docsUrl
    enabledContexts
    id
    imageId
    installed
    locked
    name
    networkId
    privacyPolicyUrl
    requiredPermissions
    requiredPlan
    secretToken
    slug
    standing
    status
    termsOfServiceUrl
    updatedAt
    webhookSignSecret
    webhookSubscriptions
    webhookUrl
    ${
      fields.banner
        ? `
      globalBanner {
        ${mediaGQLFields(fields.banner)}
      }
    `
        : ``
    }
    ${
      fields.createdBy
        ? `
      createdBy {
        ${memberGQLFields(fields.createdBy)}
      }
    `
        : ``
    }
    ${
      fields.customCodes
        ? `
      customCodes {
        body
        head
      }
    `
        : ``
    }
    ${
      fields.embeds
        ? `
      globalEmbeds {
        ${embedGQLFields(fields.embeds)}
      }
    `
        : ``
    }
    ${
      fields.favicon
        ? `
      globalFavicon {
        ${mediaGQLFields(fields.favicon)}
      }
    `
        : ``
    }
    ${
      fields.image
        ? `
      globalImage {
        ${mediaGQLFields(fields.image)}
      }
    `
        : ``
    }
    ${
      fields.images
        ? `
      globalImages {
        ${mediaGQLFields(fields.images)}
      }
    `
        : ``
    }
    ${
      fields.network
        ? `
      globalNetwork {
        ${pluralNetworkGQLFields(fields.network)}
      }
    `
        : ``
    }
    ${
      fields.updatedBy
        ? `
      updatedBy {
        ${memberGQLFields(fields.updatedBy)}
      }
    `
        : ``
    }
  `
}
