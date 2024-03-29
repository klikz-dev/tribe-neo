import gql from 'graphql-tag'

import { ssoGQLFields } from './sso.fields'

export const updateCustomSsoGQLMutation = () => gql`
  mutation UpdateCustomSso($input: UpdateCustomSsoInput!) {
    updateCustomSso(input: $input) {
      ${ssoGQLFields()}
    }
  }
`

export const updateJwtSsoGQLMutation = () => gql`
  mutation updateJwtSso($input: UpdateJwtSsoInput!) {
    updateJwtSso(input: $input) {
      ${ssoGQLFields()}
    }
  }
`

export const updateDefaultSsoStatusGQLMutation = () => gql`
  mutation UpdateDefaultSsoStatus($sso: DefaultSsoType!, $status: SsoStatus!) {
    updateDefaultSsoStatus(sso: $sso, status: $status) {
      status
    }
  }
`

export const ssoMembershipsGQLQuery = () => gql`
  query SsoMemberships($memberId: String!) {
    ssoMemberships(memberId: $memberId) {
      id
      memberId
      ssoType
    }
  }
`

export const ssoUrlGQLQuery = () => gql`
  query SsoUrl($input: SsoUrlInput!) {
    ssoUrl(input: $input) {
      url
    }
  }
`
