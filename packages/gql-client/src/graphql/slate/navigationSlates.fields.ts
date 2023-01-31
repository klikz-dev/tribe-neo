import { slateGQLFields } from './slate.fields'

export type navigationSlatesFields = 'all'

export const navigationSlatesGQLFields = (fields: navigationSlatesFields) => `
  header {
    ${slateGQLFields(fields)}
  }
  sidebar1 {
    ${slateGQLFields(fields)}
  }
  sidebar2 {
    ${slateGQLFields(fields)}
  }
  footer {
    ${slateGQLFields(fields)}
  }
`
