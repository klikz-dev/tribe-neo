import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { ReportFields, reportGQLFields } from './report.fields'

export function getReportGQLQuery(fields: ReportFields): DocumentNode {
  return gql`
    query getReport(
      $input: ReportInput!
      $spaceId: String
    ){
      report(input: $input, spaceId: $spaceId) {
        ${reportGQLFields(fields)}
      }
    }
  `
}
