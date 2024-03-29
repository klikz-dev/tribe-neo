export type EmbedFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function embedGQLFields(fields: EmbedFields): string {
  return `
    author
    author_url
    description
    html
    id
    provider_name
    thumbnail_height
    thumbnail_url
    thumbnail_width
    title
    type
    url  
  `
}
