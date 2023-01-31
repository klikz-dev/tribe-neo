export type EventTypeFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function eventTypeGQLFields(fields: EventTypeFields) {
  return `
    name
    description
    noun
    requiredScope
    shortDescription
    verb
  `
}
