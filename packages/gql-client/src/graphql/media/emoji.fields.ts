export type EmojiFields = 'basic' | 'all'

export function emojiGQLFields(): string {
  return `
    __typename
    id
    text
  `
}
