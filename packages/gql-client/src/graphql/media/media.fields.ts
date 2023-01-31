import { EmojiFields, emojiGQLFields } from './emoji.fields'
import { ImageFields, imageGQLFields } from './image.fields'

export type MediaFields = 'basic' | 'all' | CustomMediaFields

export interface CustomMediaFields {
  onImage?: ImageFields
  onEmoji?: EmojiFields
}

const BASIC_MEDIA_FIELDS: CustomMediaFields = {
  onImage: 'basic',
  onEmoji: 'basic',
}
const ALL_MEDIA_FIELDS: CustomMediaFields = {
  onImage: 'all',
  onEmoji: 'all',
}

export function mediaGQLFields(fields: MediaFields): string {
  if (fields === 'basic') fields = BASIC_MEDIA_FIELDS
  if (fields === 'all') fields = ALL_MEDIA_FIELDS

  return `
      ... on Image {
        ${imageGQLFields()}
      }
      ... on Emoji {
        ${emojiGQLFields()}
      }
      ... on File {
        id
        name
        url
      }
  `
}
