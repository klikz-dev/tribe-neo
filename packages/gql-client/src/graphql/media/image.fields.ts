import { mediaURLGQLFields } from './mediaURL.fields'

export type ImageFields = 'basic' | 'all'

export function imageGQLFields(): string {
  return `
    __typename
    id
    url
    width
    height
    dominantColorHex
    dpi
    cropHeight
    cropWidth
    cropX
    cropY
    cropZoom
    urls {
      ${mediaURLGQLFields()}
    }
  `
}
