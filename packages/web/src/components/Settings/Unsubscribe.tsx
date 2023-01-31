import {
  Image,
  UnsubscribeTokenContext,
  ActionStatus,
} from '@tribeplatform/gql-client/types'
import {
  useAuthToken,
  useUnsubscribeFromNotification,
} from '@tribeplatform/react-sdk/hooks'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { useQuery } from '../../lib/useQuery'

export const Unsubscribe = () => {
  const { token } = useQuery()

  const { data: authToken } = useAuthToken()
  const { networkPublicInfo } = authToken
  const {
    data: unsubscribeResult,
    mutate: unsubscribe,
    isLoading,
    error,
  } = useUnsubscribeFromNotification()

  const succeeded = unsubscribeResult?.status === ActionStatus.SUCCEEDED
  const failed = unsubscribeResult?.status === ActionStatus.FAILED || error

  return (
    <>
      <div className="lg:w-1/2 md:w-full flex mx-auto flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={(networkPublicInfo?.logo as Image)?.url}
            alt="Workflow"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {failed && (
            <Alert status="error" title="Error!">
              Something went wrong please try again
            </Alert>
          )}
          {succeeded && (
            <Alert status="success" title="Success!">
              You have successfully unsubscribed
            </Alert>
          )}
          {!failed && !succeeded && (
            <div className="bg-surface-50 py-4 px-4 shadow sm:rounded-lg sm:px-10">
              <h2 className="text-center text-lg font-bold text-basicSurface-900">
                Manage your email subscription
              </h2>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  loading={isLoading}
                  className="mr-2"
                  onClick={() => {
                    unsubscribe({
                      input: { token, context: UnsubscribeTokenContext.ALL },
                    })
                  }}
                >
                  Turn off all email notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
