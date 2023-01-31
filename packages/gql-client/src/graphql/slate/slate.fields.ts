import { slateComponentGQLFields } from './slateComponent.fields'
import { slatePlaceholderGQLFields } from './slatePlaceholder.fields'

export type SlateFields = 'all'

export const slateGQLFields = (fields: SlateFields) => `
  id
  editable
  acceptsBefore
  acceptsAfter
  rootComponents
  components {
    ... on SlatePlaceholder {
      ${slatePlaceholderGQLFields(fields)}
    }
    ... on SlateComponent {
      ${slateComponentGQLFields(fields)}
    }
  }
`
