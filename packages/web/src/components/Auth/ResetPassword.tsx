import { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { Form } from '@tribeplatform/react-sdk/components'
import {
  useConfirmResetPassword,
  useUpdatePasswordWithToken,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useQuery } from '../../lib/useQuery'

export const ResetPassword = () => {
  const history = useHistory()
  const query = useQuery()
  const { token } = query

  const { mutateAsync: validateToken } = useConfirmResetPassword()
  const { mutateAsync: updatePassword, isLoading } =
    useUpdatePasswordWithToken()

  useEffect(() => {
    validateToken({ input: { token } }).catch(() => {
      toast({
        title: 'Token has either expired or is invalid',
        description: "We'll need to re-send your token to your email address.",
        status: 'error',
      })
      history.push('/auth/forgot-password')
    })
  }, [validateToken, token, history])

  const onSubmit = async (data: { password: string; password2: string }) => {
    const { password, password2 } = data
    if (password !== password2)
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          errors: [{ field: 'password2', message: 'Passwords do not match.' }],
        },
      }
    return updatePassword({ input: { token, newPassword: password } }).then(
      () => {
        toast({
          title: 'Password updated successfully',
          description: 'You can now login with your new password.',
          status: 'success',
        })
        history.push('/auth/login')
      },
    )
  }
  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Change Password
          </h2>
          <p className="mt-2 text-center text-sm text-basicMain-600">
            Enter your new password below to change it.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-4">
            <Form className="space-y-5" onSubmit={onSubmit}>
              <Form.Input
                validation={{
                  required: 'Your password must be at least 8 characters.',
                }}
                type="password"
                label="New Password"
                name="password"
                autoComplete="current-password"
              />
              <Form.Input
                validation={{
                  required: 'This field is required.',
                }}
                type="password"
                label="Confirm Password"
                name="password2"
                autoComplete="current-password"
              />
              <div>
                <Button
                  fullWidth
                  variant="primary"
                  type="submit"
                  size="lg"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  )
}
