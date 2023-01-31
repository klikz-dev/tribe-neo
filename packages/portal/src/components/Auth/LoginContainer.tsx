import { useLocation } from 'wouter'

import { Form } from '@tribeplatform/react-sdk/components'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useRequestGlobalTokenCode, useSearchParam } from '../../hooks'

const EMAIL_REGEX = /^(.+)@(.+)$/

export const LoginContainer = () => {
  const [, setLocation] = useLocation()
  const redirectParam = useSearchParam('redirect')

  const { mutate: requestCode, isLoading } = useRequestGlobalTokenCode()

  const onSubmit = data => {
    requestCode(
      {
        email: data.email,
      },
      {
        onError: () => {
          toast({
            title: 'Error',
            description: 'Could not request code',
            status: 'error',
          })
        },
        onSuccess: () => {
          const url = `/auth/verify?email=${encodeURIComponent(data.email)}${
            redirectParam
              ? `&redirect=${encodeURIComponent(redirectParam)}`
              : ''
          }`
          setLocation(url)
        },
      },
    )
  }

  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-basicMain-900">
            Log in to your Tribe account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-surface-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form onSubmit={onSubmit}>
              <div className="space-y-5">
                <Form.Input
                  autoComplete="email"
                  label="Email"
                  name="email"
                  validation={{
                    required: "This field can't be empty",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Invalid email format',
                    },
                  }}
                />

                <Button
                  variant="primary"
                  type="submit"
                  loading={isLoading}
                  fullWidth
                  data-testid="login-btn"
                >
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
