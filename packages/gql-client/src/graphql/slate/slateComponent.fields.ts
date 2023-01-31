export type SlateComponentFields = 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const slateComponentGQLFields = (fields: SlateComponentFields) => `
  id
  name
  removable
  acceptsAfter
  acceptsBefore
  acceptsChildren
  props
  children
  output
`
