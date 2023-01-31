import { useEffect, useRef } from 'react'

import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Form, FormRef } from '@tribeplatform/react-sdk/components'
import {
  useAuthToken,
  useSignup,
  useValidateLink,
  useValidateToken,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { useRefreshToken } from '../../hooks/useRefreshToken'
import { isMemberNotConfirmed } from '../../lib/app.lib'
import { EMAIL_PATTERN } from '../../lib/validator.utils'
import { ComposerReadonly } from '../Composer'
import { SignUpSettings } from './settings/SignUpSettings'
import { Ssos } from './Ssos'

export const SignUp = ({
  invitationLinkId,
  primaryMessage,
  secondaryMessage,
}) => {
  const formRef = useRef<FormRef>()
  const history = useHistory()
  const { data: authToken } = useAuthToken()
  const { network } = authToken
  const { update } = useRefreshToken()
  // get the invitation token if there is any
  const query = useQuery()
  const invitationToken = query.token

  // validate the invitation link if there is any
  const { error: linkValidationError } = useValidateLink({
    variables: { id: invitationLinkId },
    useQueryOptions: { enabled: !!invitationLinkId, retry: false },
  })

  // validate the token if there is any
  const { data: tokenStatus, error: tokenValidationError } = useValidateToken({
    variables: { token: invitationToken },
    useQueryOptions: { enabled: !!invitationToken, retry: false },
  })

  useEffect(() => {
    if (
      formRef.current.methods &&
      tokenStatus?.inviteeEmail &&
      tokenStatus?.inviteeName
    ) {
      formRef.current.methods.setValue('name', tokenStatus.inviteeName)
      formRef.current.methods.setValue('email', tokenStatus.inviteeEmail)
    }
  }, [formRef, tokenStatus])

  const { mutateAsync: signup, isLoading } = useSignup({
    invitationLinkId,
    invitationToken,
  })

  const [
    canLoginNetwork,
    canJoinNetwork,
    canJoinNetworkWithToken,
    canJoinNetworkWithLink,
  ] = hasScopesPermission(network, [
    'loginNetwork',
    'joinNetwork',
    'joinNetworkWithToken',
    'joinNetworkWithInvitationLink',
  ])

  const onSubmit = async data => {
    delete data.checkbox
    await signup(
      {
        input: data,
      },
      {
        onSuccess: async authToken => {
          const newAuthToken = await update(authToken)
          const { refreshToken, accessToken, member, role } = newAuthToken || {}
          if (accessToken || refreshToken) {
            if (!isMemberNotConfirmed(member, role)) {
              if (accessToken) {
                window.location.href = '/'
              }
            } else {
              history.replace(`/auth/verify?memberId=${member?.id}`)
            }
          }
        },
      },
    )
  }

  // in case of invitation link corruption redirect to generic sign up page
  if (linkValidationError && invitationLinkId) {
    return <Redirect to="/auth/signup" />
  }

  // if token is invalid redirect to generic sign up page
  if (tokenValidationError && invitationToken) {
    return <Redirect to="/auth/signup" />
  }

  if (!canJoinNetwork && !invitationLinkId && !invitationToken) {
    return <Redirect to="/auth/login" />
  }

  if (!canJoinNetwork && !canJoinNetworkWithLink && !canJoinNetworkWithToken) {
    return <Redirect to="/auth/login" />
  }

  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex flex-col space-y-5">
          {primaryMessage ? (
            <Card className="p-4">
              <article>
                <ComposerReadonly content={primaryMessage} />
              </article>
            </Card>
          ) : null}

          <Card className="py-8 px-4">
            <Form
              className="space-y-6"
              onSubmit={onSubmit}
              defaultValues={{
                name: tokenStatus?.inviteeName || '',
                email: tokenStatus?.inviteeEmail || '',
              }}
              ref={formRef}
            >
              <Form.Input name="name" autoComplete="name" label="Name" />
              <Form.Input
                disabled={tokenStatus?.inviteeEmail}
                validation={{
                  required: 'Email is required',
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: 'Invalid email address',
                  },
                }}
                name="email"
                autoComplete="email"
                label="Email"
              />

              <Form.Input
                validation={{
                  required: 'Your password must be less than 4 characters.',
                }}
                type="password"
                label="Create a password"
                name="password"
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Form.Checkbox
                    name="checkbox"
                    label={
                      <div>
                        By creating an account, I agree to the{' '}
                        {network?.termsOfServiceUrl ? (
                          <Link
                            rel="noopener"
                            target="_blank"
                            href={network?.termsOfServiceUrl}
                          >
                            Terms of Service
                          </Link>
                        ) : (
                          'Terms of Service'
                        )}{' '}
                        and{' '}
                        {network?.privacyPolicyUrl ? (
                          <Link
                            rel="noopener"
                            target="_blank"
                            href={network?.privacyPolicyUrl}
                          >
                            Privacy Policy
                          </Link>
                        ) : (
                          'Privacy Policy'
                        )}
                      </div>
                    }
                    validation={{
                      required: 'You must agree with the terms and conditions',
                    }}
                  />
                </div>
              </div>
              <div>
                <Button fullWidth type="submit" loading={isLoading} size="lg">
                  Create my account
                </Button>
              </div>
            </Form>
            <Ssos hasDivider />
          </Card>

          {canLoginNetwork && (
            <Card>
              <Card.Content className="text-center">
                Already a member?{' '}
                <Link
                  as={RouterLink}
                  to={`/auth/login${
                    query.redirect ? `?redirect=${query.redirect}` : ''
                  }`}
                >
                  Log in now
                </Link>
              </Card.Content>
            </Card>
          )}

          {secondaryMessage ? (
            <Card className="p-4">
              <article>
                <ComposerReadonly content={secondaryMessage} />
              </article>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  )
}

SignUp.Settings = SignUpSettings
