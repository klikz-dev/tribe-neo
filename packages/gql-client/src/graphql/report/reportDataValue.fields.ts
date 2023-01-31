import { ChartDataFields } from './chartData.fields'
import {
  EntityReportFields,
  entityReportGQLFields,
} from './entityReport.fields'
import { IntValueFields } from './intValue.fields'
import { StringValueFields } from './stringValue.fields'

export type ReportDataValueFields =
  | 'basic'
  | 'all'
  | CustomReportDataValueFields

export interface CustomReportDataValueFields {
  onIntValue?: IntValueFields
  onChartData?: ChartDataFields
  onEntityReport?: EntityReportFields
  onStringValue?: StringValueFields
}

const BASIC_REPORT_DATA_VALUE_FIELDS: CustomReportDataValueFields = {}
const ALL_REPORT_DATA_VALUE_FIELDS: CustomReportDataValueFields = {
  onChartData: 'basic',
  onEntityReport: 'basic',
  onIntValue: 'basic',
  onStringValue: 'basic',
}

export function reportDataValueGQLFields(
  fields: ReportDataValueFields,
): string {
  if (fields === 'basic') fields = BASIC_REPORT_DATA_VALUE_FIELDS
  if (fields === 'all') fields = ALL_REPORT_DATA_VALUE_FIELDS
  return `
    __typename
    ${
      fields.onIntValue
        ? `
      ... on IntValue {
        int
      }
    `
        : ``
    }
    ${
      fields.onChartData
        ? `
      ... on ChartData {
        label
        points
        value
      }
    `
        : ``
    }
    ${
      fields.onEntityReport
        ? `
      ... on EntityReport {
        ${entityReportGQLFields(fields.onEntityReport)}
      }
    `
        : ``
    }
    ${
      fields.onStringValue
        ? `
      ... on StringValue {
        string
      }
    `
        : ``
    }
  `
}
