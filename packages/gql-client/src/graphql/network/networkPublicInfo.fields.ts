import { MediaFields, mediaGQLFields } from '../media'

export type NetworkPublicInfoFields =
  | 'basic'
  | 'all'
  | CustomNetworkPublicInfoFields

export interface CustomNetworkPublicInfoFields {
  logo?: MediaFields
}

const BASIC_NETWORK_PUBLIC_INFO_FIELDS: CustomNetworkPublicInfoFields = {}
const ALL_NETWORK_PUBLIC_INFO_FIELDS: CustomNetworkPublicInfoFields = {
  logo: 'basic',
}

export function networkPublicInfoGQLFields(
  fields: NetworkPublicInfoFields,
): string {
  if (fields === 'basic') fields = BASIC_NETWORK_PUBLIC_INFO_FIELDS
  if (fields === 'all') fields = ALL_NETWORK_PUBLIC_INFO_FIELDS
  return `
    domain
    id
    membership
    name
    status
    visibility
    ${
      fields.logo
        ? `
      logo {
        ${mediaGQLFields(fields.logo)}
      }
    `
        : ``
    }
  `
}
