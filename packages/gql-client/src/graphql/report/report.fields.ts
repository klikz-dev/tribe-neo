import { ReportDataFields, reportDataGQLFields } from './reportData.fields'

export type ReportFields = 'basic' | 'all' | CustomReportFields

export interface CustomReportFields {
  data?: ReportDataFields
}

const BASIC_REPORT_FIELDS: CustomReportFields = {}
const ALL_REPORT_FIELDS: CustomReportFields = {
  data: 'basic',
}

export function reportGQLFields(fields: ReportFields): string {
  if (fields === 'basic') fields = BASIC_REPORT_FIELDS
  if (fields === 'all') fields = ALL_REPORT_FIELDS
  return `
    description
    endDate
    previousValue
    slug
    startDate
    title
    tooltip
    value
    ${
      fields.data
        ? `
      data {
        ${reportDataGQLFields(fields.data)}
      }
    `
        : ``
    }
  `
}
