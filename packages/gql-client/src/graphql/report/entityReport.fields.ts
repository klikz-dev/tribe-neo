import {
  ReportableEntityFields,
  reportableEntityGQLFields,
} from './reportableEntity.fields'
import { ReportDataFields, reportDataGQLFields } from './reportData.fields'

export type EntityReportFields = 'basic' | 'all' | CustomEntityReportFields

export interface CustomEntityReportFields {
  data?: ReportDataFields
  entity?: ReportableEntityFields
}

const BASIC_ENTITY_REPORT_FIELDS: CustomEntityReportFields = {}
const ALL_ENTITY_REPORT_FIELDS: CustomEntityReportFields = {
  entity: 'basic',
  data: 'basic',
}

export function entityReportGQLFields(fields: EntityReportFields): string {
  if (fields === 'basic') fields = BASIC_ENTITY_REPORT_FIELDS
  if (fields === 'all') fields = ALL_ENTITY_REPORT_FIELDS
  return `
    description
    endDate
    entityId
    entityType
    startDate
    tooltip
    ${
      fields.data
        ? `
      data {
        ${reportDataGQLFields(fields.data)}
      }
    `
        : ``
    }
    ${
      fields.entity
        ? `
      entity {
        ${reportableEntityGQLFields(fields.entity)}
      }
    `
        : ``
    }
  `
}
