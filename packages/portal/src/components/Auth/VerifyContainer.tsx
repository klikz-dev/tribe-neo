import { FC, useEffect, useState } from 'react'

import { useLocation } from 'wouter'

import { Form } from '@tribeplatform/react-sdk/components'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useResendGlobalTokenCode, useSearchParam } from '../../hooks'
import { useLogin } from '../../hooks/useLogin'
import { setGlobalAuthCookies } from '../../utils/masterCookies.utils'

const VERIFICATION_CODE = 'verificationCode'
const RESEND_INTERVAL_IN_SECONDS = 60

export const VerifyContainer: FC = () => {
  const [, setLocation] = useLocation()
  const emailParam = useSearchParam('email')
  const codeParam = useSearchParam('verificationCode')
  const redirectParam = useSearchParam('redirect')

  const { login, isLoading } = useLogin()
  const { mutate: resendCode } = useResendGlobalTokenCode()

  const [remainingTime, setRemainingTime] = useState(RESEND_INTERVAL_IN_SECONDS)
  const onSubmit = async data => {
    await login(
      {
        email: emailParam,
        verificationCode: data.verificationCode,
      },
      {
        onSuccess: data => {
          setGlobalAuthCookies({
            globalToken: (data as any).globalToken.accessToken,
          })
          window.location.href = redirectParam || '/'
        },
      },
    )
  }

  const handleResendCode = () => {
    if (remainingTime > 0) {
      return
    }

    resendCode(
      {
        email: emailParam,
      },
      {
        onError: () => {
          toast({
            title: 'Error',
            description: 'Could not resend code',
            status: 'error',
          })
        },
      },
    )
    setRemainingTime(RESEND_INTERVAL_IN_SECONDS)
  }

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setRemainingTime(prev => prev - 1)
    }, 1000)
    return () => clearTimeout(counterInterval)
  }, [])

  useEffect(() => {
    if (emailParam && codeParam?.length === 6) {
      onSubmit({
        verificationCode: codeParam,
      })
    }
  }, [emailParam, codeParam])

  return (
    <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
          Enter verification code
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Card.Content>
            <Form onSubmit={onSubmit} className="space-y-5">
              {methods => (
                <>
                  {emailParam && (
                    <div className="text-basicSurface-400">
                      To continue, please enter the 6-digit verification code we
                      have sent you at <b>{emailParam}</b> (
                      <Link onClick={() => setLocation('/auth/login')}>
                        change email
                      </Link>
                      )
                    </div>
                  )}
                  <Form.Input
                    data-testid="dev-portal-verificationCode-input"
                    name={VERIFICATION_CODE}
                    defaultValue={codeParam || ''}
                    validation={{
                      minLength: {
                        value: 6,
                        message: 'Verification code must be 6 digits long',
                      },
                      maxLength: {
                        value: 6,
                        message: 'Verification code must be 6 digits long',
                      },
                    }}
                    label="Code"
                    placeholder="6-digit alpha-numeric code"
                    autoComplete="off"
                    onChange={e => {
                      if (e.target.value.length === 6) {
                        methods.submitForm({
                          verificationCode: e.target.value,
                        })
                      }
                    }}
                  />
                  {remainingTime <= 0 ? (
                    <div>
                      <Link onClick={handleResendCode}>Resend code</Link>
                    </div>
                  ) : (
                    <div className="text-basicSurface-400">
                      Resend code (available in {remainingTime} seconds)
                    </div>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    loading={isLoading}
                    fullWidth
                    data-testid="login-btn"
                  >
                    Continue
                  </Button>
                </>
              )}
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}
