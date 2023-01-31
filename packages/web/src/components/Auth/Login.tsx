import { Link as RouterLink, useHistory } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Form } from '@tribeplatform/react-sdk/components'
import { useAuthToken, useLogin } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { useRefreshToken } from '../../hooks/useRefreshToken'
import { isMemberNotConfirmed } from '../../lib/app.lib'
import { Ssos } from './Ssos'

export const Login = () => {
  const history = useHistory()
  const query = useQuery()
  const { data: authToken } = useAuthToken() || {}
  const { network } = authToken

  const { login, isLoading } = useLogin()
  const { update } = useRefreshToken()
  const [canJoinNetwork] = hasScopesPermission(network, ['joinNetwork'])

  const onSubmit = async data => {
    try {
      const _authToken = await login({
        willReload: true,
        variables: {
          input: {
            usernameOrEmail: data?.usernameOrEmail,
            password: data?.password,
          },
        },
      })

      // TODO: remove this line after portal module is completed
      const newAuthToken = await update(_authToken)

      const { refreshToken, accessToken, member, role } = newAuthToken || {}
      if (accessToken || refreshToken) {
        if (!isMemberNotConfirmed(member, role)) {
          if (accessToken) {
            const redirect = query.redirect || '/'
            if (redirect.startsWith('/') && !redirect.startsWith('//')) {
              window.location.href = redirect
            } else {
              window.location.href = '/'
            }
          }
        } else {
          history.replace(`/auth/verify?memberId=${member?.id}`)
        }
      }
    } catch (err) {
      // better error message for `usernameOrEmail` field
      const errors = err?.response?.errors
      errors?.forEach(e => {
        if (e?.field === 'usernameOrEmail' && e?.message) {
          e.message = e.message.replace('usernameOrEmail', 'email')
        }
      })
      throw err
    }
  }

  const showLoginForm = !network.hideDefaultAuthenticationForm
  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex flex-col space-y-5">
          <Card className="py-8 px-4">
            {showLoginForm && (
              <>
                <Form className="space-y-5" onSubmit={onSubmit}>
                  <Form.Input
                    autoComplete="username"
                    label="Email or Username"
                    name="usernameOrEmail"
                  />

                  <Form.Input
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                  />

                  <div className="text-sm text-right">
                    <Link as={RouterLink} to="/auth/forgot-password">
                      Forgot your password?
                    </Link>
                  </div>

                  <div>
                    <Button
                      fullWidth
                      variant="primary"
                      type="submit"
                      size="lg"
                      loading={isLoading}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </>
            )}
            <Ssos hasDivider={showLoginForm} />
          </Card>
          {canJoinNetwork && (
            <Card>
              <Card.Content className="text-center">
                Don&apos;t have an account?{' '}
                <Link
                  as={RouterLink}
                  to={`/auth/signup${
                    query.redirect ? `?redirect=${query.redirect}` : ''
                  }`}
                >
                  Sign up now
                </Link>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
