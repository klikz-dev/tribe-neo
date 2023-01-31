import {
  EmbedFields,
  embedGQLFields,
  MediaFields,
  mediaGQLFields,
} from '../media'
import {
  MemberFields,
  memberGQLFields,
  NetworkFields,
  networkGQLFields,
} from '../network'

export type AppFields = 'basic' | 'all' | CustomAppFields

export interface CustomAppFields {
  banner?: MediaFields
  createdBy?: MemberFields
  customCodes?: 'basic'
  embeds?: EmbedFields
  favicon?: MediaFields
  image?: MediaFields
  images?: MediaFields
  network?: NetworkFields
  updatedBy?: MemberFields
}

const BASIC_APP_FIELDS: CustomAppFields = {}
const ALL_APP_FIELDS: CustomAppFields = {
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

export const appGQLFields = (fields: AppFields) => {
  if (fields === 'basic') fields = BASIC_APP_FIELDS
  if (fields === 'all') fields = ALL_APP_FIELDS
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
      banner {
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
      embeds {
        ${embedGQLFields(fields.embeds)}
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
      fields.image
        ? `
      image {
        ${mediaGQLFields(fields.image)}
      }
    `
        : ``
    }
    ${
      fields.images
        ? `
      images {
        ${mediaGQLFields(fields.images)}
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
