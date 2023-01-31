import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { AuthTokenFields, authTokenGQLFields } from './authToken.fields'
import { MemberFields, memberGQLFields } from './member.fields'

export function getTokensGQLQuery(fields: AuthTokenFields): DocumentNode {
  return gql`
    query getTokens(
      $networkDomain: String
      $networkId: ID
      $otp: String
      $ssoToken: String
      $refreshToken: String
    ) {
      tokens(
        networkDomain: $networkDomain
        networkId: $networkId
        otp: $otp
        ssoToken: $ssoToken
        refreshToken: $refreshToken
      ) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function resendVerificationGQLQuery(): DocumentNode {
  return gql`
    mutation resendVerification {
      resendVerification {
        status
      }
    }
  `
}

export function loginNetworkQuery(fields: AuthTokenFields): DocumentNode {
  return gql`
    query loginNetwork($input: LoginNetworkWithPasswordInput!) {
      loginNetwork(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function ssoRedirectMutation(fields: AuthTokenFields): DocumentNode {
  return gql`
    mutation ssoRedirect(
      $input: LoginWithSsoCodeInput!
    ) {
      ssoRedirect(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function joinNetworkMutation(fields: AuthTokenFields): DocumentNode {
  return gql`
    mutation joinNetwork(
      $input: JoinNetworkInput!
    ) {
      joinNetwork(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function joinNetworkWithInvitationLinkMutation(
  fields: AuthTokenFields,
): DocumentNode {
  return gql`
    mutation joinNetworkWithInvitationLink(
      $input: JoinNetworkWithLinkInput!
    ) {
      joinNetworkWithInvitationLink(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function joinNetworkWithTokenMutation(
  fields: AuthTokenFields,
): DocumentNode {
  return gql`
    mutation joinNetworkWithToken(
      $input: JoinNetworkWithTokenInput!
    ) {
      joinNetworkWithToken(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}

export function verifyMemberMutation(fields: AuthTokenFields): DocumentNode {
  return gql`
    mutation verifyMember(
      $input: VerifyMemberInput!
    ) {
      verifyMember(input: $input) {
        ${authTokenGQLFields(fields)}
      }
    }
  `
}
export function ssosQuery(): DocumentNode {
  return gql`
    query ssos($status: SsoStatus) {
      ssos(status: $status) {
        authorizationUrl
        status
        tokenUrl
        type
        userProfileUrl
        buttonText
        clientId
        clientSecret
        idpUrl
        logoutUrl
        name
        provider
        scopes
        settingsUrl
      }
    }
  `
}

export const sendResetPasswordEmailGQLMutation = () => gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      status
    }
  }
`

export const authMemberQuery = (fields: MemberFields) => gql`
  query AuthMember {
    authMember {
      ${memberGQLFields(fields)}
    }
  }
`

export const logoutMutation = () => gql`
  mutation logoutNetwork($input: LogoutNetworkInput) {
    logoutNetwork(input: $input) {
      status
    }
  }
`
