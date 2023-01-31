import {
  ReportDataValueFields,
  reportDataValueGQLFields,
} from './reportDataValue.fields'

export type ReportDataFields = 'basic' | 'all' | CustomReportDataFields

export interface CustomReportDataFields {
  previousValue?: ReportDataValueFields
  value?: ReportDataValueFields
}

const BASIC_REPORT_DATA_FIELDS: CustomReportDataFields = {}
const ALL_REPORT_DATA_FIELDS: CustomReportDataFields = {
  previousValue: 'basic',
  value: 'basic',
}

export function reportDataGQLFields(fields: ReportDataFields): string {
  if (fields === 'basic') fields = BASIC_REPORT_DATA_FIELDS
  if (fields === 'all') fields = ALL_REPORT_DATA_FIELDS
  return `
    description
    key
    type
    ${
      fields.value
        ? `
      value {
        ${reportDataValueGQLFields(fields.value)}
      }
    `
        : ``
    }
    ${
      fields.previousValue
        ? `
      previousValue {
        ${reportDataValueGQLFields(fields.previousValue)}
      }
    `
        : ``
    }
  `
}
