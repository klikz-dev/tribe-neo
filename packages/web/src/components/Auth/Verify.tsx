import { useState } from 'react'

import { Redirect } from 'react-router'

import { Form } from '@tribeplatform/react-sdk/components'
import {
  useAuthMember,
  useResendVerificationCode,
  useVerifyMember,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useRefreshToken } from '../../hooks/useRefreshToken'
import { useQuery } from '../../lib/useQuery'

export const Verify = () => {
  const { update: updateRefreshToken } = useRefreshToken()

  const { data: member } = useAuthMember()

  const { mutateAsync: resend, isLoading: resendIsLoading } =
    useResendVerificationCode()

  const { mutateAsync: verify, isLoading } = useVerifyMember()

  const [showResend, setShowResend] = useState(true)

  const query = useQuery()
  let { memberId } = query
  if (!memberId) memberId = member?.id

  const onResend = async () => {
    const result = await resend()
    if (result?.status === 'succeeded') {
      setShowResend(false)
      toast({
        title: 'Verification email sent',
        description:
          "Please check your spam if you couldn't find the email in your inbox.",
        status: 'neutral',
      })
    } else {
      toast({
        title: 'Could not send verification email',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
      })
    }
  }

  if (!memberId) {
    return <Redirect to="/auth/login" />
  }

  const onSubmit = async data => {
    return verify(
      {
        input: {
          memberId,
          verificationCode: data?.verificationCode,
        },
      },
      {
        onSuccess: async authToken => {
          const newAuthToken = await updateRefreshToken(authToken)
          const { refreshToken, accessToken } = newAuthToken || {}
          if (accessToken || refreshToken) {
            window.location.href = '/'
          }
        },
      },
    )
  }

  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Please verify your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <Form onSubmit={onSubmit}>
              {methods => (
                <>
                  <Card.Content>
                    <Form.Input
                      name="verificationCode"
                      label="Verification code"
                      placeholder="5-digit alpha-numeric code"
                      autoComplete="off"
                      onChange={e => {
                        if (e.target.value.length === 5) {
                          methods.submitForm({
                            verificationCode: e.target.value,
                          })
                        }
                      }}
                      validation={{
                        required: 'Verification code is required.',
                      }}
                    />
                  </Card.Content>

                  <Card.Actions>
                    <Button type="submit" size="lg" loading={isLoading}>
                      Verify
                    </Button>
                    {showResend ? (
                      <Button
                        size="lg"
                        disabled={isLoading || resendIsLoading}
                        variant="outline"
                        onClick={onResend}
                      >
                        Resend
                      </Button>
                    ) : null}
                  </Card.Actions>
                </>
              )}
            </Form>
          </Card>
        </div>
      </div>
    </>
  )
}
