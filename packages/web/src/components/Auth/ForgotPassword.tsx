import { useState } from 'react'

import MailOpenIcon from '@heroicons/react/outline/MailOpenIcon'
import { Link } from 'react-router-dom'

import { ActionStatus } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useSendResetPasswordEmail } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'

export const ForgotPassword = () => {
  const { mutateAsync: sendResetPasswordEmail, isLoading } =
    useSendResetPasswordEmail()
  const [resetEmail, setResetEmail] = useState('')

  if (resetEmail) {
    return (
      <div className="sm:mx-auto sm:w-full sm:max-w-md p-5 py-12">
        <EmptyState
          icon={<MailOpenIcon />}
          title="Check your email"
          description={
            <>
              <p className="mt-5 text-center text-sm text-basicMain-600">
                We&apos;ve sent a temporary link to reset your password.
              </p>
              <p className="mt-2 text-center text-sm text-basicMain-600">
                Please check your inbox at <strong>{resetEmail}</strong>.
              </p>
            </>
          }
        >
          <Button variant="outline" as={Link} to="/auth/login" size="lg">
            Back to log in
          </Button>
        </EmptyState>
      </div>
    )
  }

  const onSubmit = async (data: { email: string }) => {
    const res = await sendResetPasswordEmail({ email: data.email })
    if (res.status === ActionStatus.SUCCEEDED) {
      setResetEmail(data.email)
    }
  }
  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-basicMain-600">
            Enter your email below and we will send you a link to reset it.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-4">
            <Form className="space-y-5" onSubmit={onSubmit}>
              <Form.Input autoComplete="email" label="Email" name="email" />
              <div>
                <Button
                  fullWidth
                  variant="primary"
                  type="submit"
                  loading={isLoading}
                  size="lg"
                >
                  Send reset link
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  )
}
