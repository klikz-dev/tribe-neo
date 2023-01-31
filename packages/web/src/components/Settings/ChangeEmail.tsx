import { useState } from 'react'

import { Form } from '@tribeplatform/react-sdk/components'
import {
  useAuthMember,
  useAuthToken,
  useCancelEmailUpdate,
  useResendVerificationCode,
  useUpdateMember,
} from '@tribeplatform/react-sdk/hooks'
import { ActionPanel } from '@tribeplatform/react-ui-kit/ActionPanel'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const ChangeEmail = () => {
  const { data: member } = useAuthMember()
  const { mutateAsync: updateEmail, isLoading: updateEmailLoading } =
    useUpdateMember()
  const {
    data: { network },
  } = useAuthToken()
  const settingsUrl = network?.activeSso?.settingsUrl
  const { mutate: cancelEmailUpdate } = useCancelEmailUpdate()
  const { mutateAsync: resendVerification } = useResendVerificationCode()
  const [resentEmail, setResentEmail] = useState(false)
  const newEmailPending = !!member?.newEmail

  const onResend = async () => {
    const result = await resendVerification()
    setResentEmail(true)
    if (result?.status === 'succeeded') {
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

  if (settingsUrl) {
    return (
      <ActionPanel
        title="Email"
        description={member?.email}
        placement="trailing-top"
      >
        <Button variant="outline" size="lg">
          <Link external href={settingsUrl} variant="neutral">
            Edit Email
          </Link>
        </Button>
      </ActionPanel>
    )
  }
  return (
    <Card>
      <Card.Header
        title="Email"
        description="Manage how you log in to your account."
      />
      <Card.Content>
        <Form
          defaultValues={{ email: member.email }}
          onSubmit={async (data, methods) => {
            const { email } = data
            const { setError } = methods

            if (email === member.email) {
              setError('email', {
                message:
                  'Please enter a new email address, you already using this email address.',
                type: 'validate',
              })
              return
            }

            await updateEmail({
              input: {
                email,
              },
            })
          }}
        >
          <div className="flex flex-col space-y-5">
            <Form.Input
              name="email"
              label="Email"
              placeholder="john.smith@acme.com"
              type="email"
              helperText={
                newEmailPending ? (
                  <>
                    We&apos;ve sent a confirmation email to{' '}
                    <strong>{member.newEmail}</strong>. Please confirm to change
                    your email. You can also{' '}
                    <Link
                      onClick={() => {
                        cancelEmailUpdate({})
                      }}
                    >
                      cancel
                    </Link>{' '}
                    email change request
                    {!resentEmail ? (
                      <>
                        {' '}
                        or{' '}
                        <Link onClick={onResend}>
                          resend verification email
                        </Link>
                      </>
                    ) : null}
                    .
                  </>
                ) : (
                  "We'll send you an email confirmation when you update your email."
                )
              }
            />
            <Form.Actions>
              <Button type="submit" loading={updateEmailLoading} size="lg">
                Update
              </Button>
            </Form.Actions>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
