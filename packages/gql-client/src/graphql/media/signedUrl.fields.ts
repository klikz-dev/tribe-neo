import { mediaURLGQLFields } from './mediaURL.fields'

export type SignedUrlFields = 'basic' | 'all'

export const signedUrlGQLFields = () => {
  return `
    fields
    mediaId
    mediaUrl
    signedUrl
    urls {
      ${mediaURLGQLFields()}
    }
  `
}
