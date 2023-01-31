export type MediaURLFields = 'basic' | 'all'

export const mediaURLGQLFields = () => {
  return `
    __typename
      full
      large
      medium
      small
      thumb
  `
}
