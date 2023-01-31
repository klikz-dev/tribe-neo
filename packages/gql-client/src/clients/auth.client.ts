import {
  ssoMembershipsGQLQuery,
  ssoUrlGQLQuery,
  updateCustomSsoGQLMutation,
  updateJwtSsoGQLMutation,
  updateDefaultSsoStatusGQLMutation,
  resendVerificationGQLQuery,
  deleteSsoMembershipGQLMutation,
  loginNetworkQuery,
  AuthTokenFields,
  joinNetworkMutation,
  joinNetworkWithInvitationLinkMutation,
  joinNetworkWithTokenMutation,
  ssosQuery,
  ssoRedirectMutation,
  verifyMemberMutation,
  sendResetPasswordEmailGQLMutation,
  confirmResetPasswordGQLMutation,
  updatePasswordWithTokenGQLMutation,
  authMemberQuery,
  logoutMutation,
} from '../graphql'
import { MemberFields } from '../graphql/network/member.fields'
import {
  AuthToken,
  Action,
  QueryLoginNetworkArgs,
  Sso,
  SsoUrl,
  QuerySsosArgs,
  MutationSsoRedirectArgs,
  MutationJoinNetworkArgs,
  MutationJoinNetworkWithTokenArgs,
  MutationJoinNetworkWithInvitationLinkArgs,
  MutationVerifyMemberArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdateCustomSsoArgs,
  MutationUpdateDefaultSsoStatusArgs,
  QuerySsoMembershipsArgs,
  SsoMembership,
  QuerySsoUrlArgs,
  MutationConfirmResetPasswordArgs,
  MutationUpdatePasswordWithTokenArgs,
  Member,
  MutationLogoutNetworkArgs,
  MutationDeleteSsoMembershipArgs,
  MutationUpdateJwtSsoArgs,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class AuthClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async resendVerification(accessToken?: string): Promise<Action> {
    type QueryResult = { resendVerification: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: resendVerificationGQLQuery(),
      customToken: accessToken,
    })
    return result.resendVerification
  }

  async login(
    variables: QueryLoginNetworkArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { loginNetwork: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: loginNetworkQuery(fields),
      variables,
    })
    return result.loginNetwork
  }

  async logout(variables: MutationLogoutNetworkArgs): Promise<Action> {
    const result = await this.client.authorizedRequest<{
      logoutNetwork: Action
    }>({
      query: logoutMutation(),
      variables,
    })

    return result.logoutNetwork
  }

  async authMember(fields: MemberFields = 'basic'): Promise<Member> {
    const result = await this.client.authorizedRequest<{ authMember: Member }>({
      query: authMemberQuery(fields),
    })

    return result.authMember
  }

  async ssoRedirect(
    variables: MutationSsoRedirectArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { ssoRedirect: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: ssoRedirectMutation(fields),
      variables,
    })
    return result.ssoRedirect
  }

  async joinNetwork(
    variables: MutationJoinNetworkArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { joinNetwork: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: joinNetworkMutation(fields),
      variables,
    })
    return result.joinNetwork
  }

  async joinNetworkWithInvitationLink(
    variables: MutationJoinNetworkWithInvitationLinkArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { joinNetworkWithInvitationLink: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: joinNetworkWithInvitationLinkMutation(fields),
      variables,
    })
    return result.joinNetworkWithInvitationLink
  }

  async joinNetworkWithToken(
    variables: MutationJoinNetworkWithTokenArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { joinNetworkWithToken: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: joinNetworkWithTokenMutation(fields),
      variables,
    })
    return result.joinNetworkWithToken
  }

  async verifyMember(
    variables: MutationVerifyMemberArgs,
    fields: AuthTokenFields = 'basic',
  ): Promise<AuthToken> {
    type QueryResult = { verifyMember: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: verifyMemberMutation(fields),
      variables,
    })
    return result.verifyMember
  }

  async ssos(variables: QuerySsosArgs): Promise<Sso[]> {
    type QueryResult = { ssos: Sso[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: ssosQuery(),
      variables,
    })
    return result.ssos
  }

  async sendResetPasswordEmail(
    variables: MutationSendResetPasswordEmailArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { sendResetPasswordEmail: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: sendResetPasswordEmailGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.sendResetPasswordEmail
  }

  async updateJwtSso(
    variables: MutationUpdateJwtSsoArgs,
    accessToken?: string,
  ): Promise<Sso> {
    type QueryResult = { updateJwtSso: Sso }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateJwtSsoGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateJwtSso
  }

  async updateCustomSso(
    variables: MutationUpdateCustomSsoArgs,
    accessToken?: string,
  ): Promise<Sso> {
    type QueryResult = { updateCustomSso: Sso }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateCustomSsoGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateCustomSso
  }

  async updateDefaultSsoStatus(
    variables: MutationUpdateDefaultSsoStatusArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { updateDefaultSsoStatus: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updateDefaultSsoStatusGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updateDefaultSsoStatus
  }

  async ssoMemberships(
    variables: QuerySsoMembershipsArgs,
  ): Promise<SsoMembership[]> {
    type QueryResult = { ssoMemberships: SsoMembership[] }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: ssoMembershipsGQLQuery(),
      variables,
    })
    return result.ssoMemberships
  }

  async ssoUrl(variables: QuerySsoUrlArgs): Promise<SsoUrl> {
    type QueryResult = { ssoUrl: SsoUrl }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: ssoUrlGQLQuery(),
      variables,
    })
    return result.ssoUrl
  }

  async confirmResetPassword(
    variables: MutationConfirmResetPasswordArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { confirmResetPassword: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: confirmResetPasswordGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.confirmResetPassword
  }

  async updatePasswordWithToken(
    variables: MutationUpdatePasswordWithTokenArgs,
    accessToken?: string,
  ): Promise<Action> {
    type QueryResult = { updatePasswordWithToken: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: updatePasswordWithTokenGQLMutation(),
      variables,
      customToken: accessToken,
    })
    return result.updatePasswordWithToken
  }

  async deleteSsoMembership(
    variables: MutationDeleteSsoMembershipArgs,
  ): Promise<Action> {
    type QueryResult = { deleteSsoMembership: Action }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: deleteSsoMembershipGQLMutation(),
      variables,
    })
    return result.deleteSsoMembership
  }
}
