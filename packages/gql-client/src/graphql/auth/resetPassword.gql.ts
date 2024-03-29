import gql from 'graphql-tag'

export const confirmResetPasswordGQLMutation = () => gql`
  mutation ConfirmResetPassword($input: ConfirmResetPasswordInput!) {
    confirmResetPassword(input: $input) {
      status
    }
  }
`

export const updatePasswordWithTokenGQLMutation = () => gql`
  mutation UpdatePasswordWithToken($input: UpdatePasswordWithTokenInput!) {
    updatePasswordWithToken(input: $input) {
      status
    }
  }
`

export const deleteSsoMembershipGQLMutation = () => gql`
  mutation UpdatePasswordWithToken($memberId: String!, $type: SsoType!) {
    deleteSsoMembership(memberId: $memberId, type: $type) {
      status
    }
  }
`
