import { mediaGQLFields } from '../media'

export const spaceNotificationSettingsFields = () => `
    __typename
    space {
      __typename
      id
      name
      slug
      image {
        ${mediaGQLFields('basic')}
      }
    }
    channel
    isDefault
    preference
    sameAsDefault
`
