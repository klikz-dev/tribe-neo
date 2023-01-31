export type PlanFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const planGQLFields = (fields: PlanFields) => `
  createdAt
  endDate
  extendable
  memberCapacity
  name
  renewDate
  renewalType
  seatCapacity
  startDate
  trial
`
