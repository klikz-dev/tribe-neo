import { getReportGQLQuery, ReportFields } from '../graphql'
import { MemberFields } from '../graphql/network'
import { getLeaderboardGQLQuery } from '../graphql/report'
import { Member, QueryLeaderboardArgs, QueryReportArgs, Report } from '../types'
import { GraphqlClient } from './graphql.client'

export class ReportClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async get(
    variables: QueryReportArgs,
    fields: ReportFields = 'basic',
    accessToken?: string,
  ): Promise<Report> {
    type QueryResult = { report: Report }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getReportGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.report
  }

  async getLeaderboard(
    variables: QueryLeaderboardArgs,
    fields: MemberFields = 'basic',
    accessToken?: string,
  ): Promise<Member[]> {
    type QueryResult = { leaderboard: Member[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getLeaderboardGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.leaderboard
  }
}
