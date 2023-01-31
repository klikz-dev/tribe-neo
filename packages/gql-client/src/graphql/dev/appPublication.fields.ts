export type AppPublicationFields = 'basic'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const appPublicationGQLFields = (fields: AppPublicationFields) => {
  return `
    id
    addedById
    itemId
    networkId
    createdAt
  `
}
