import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { Image, SpaceJoinRequestStatus } from '@tribeplatform/gql-client/types'
import {
  useApproveSpaceMembershipRequest,
  useDeclineSpaceMembershipRequest,
  useSpaceMembershipRequests,
} from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'
import { Table } from '@tribeplatform/react-ui-kit/Table'

export const SpaceMembershipRequests = ({ spaceId }) => {
  const { data: requests } = useSpaceMembershipRequests({
    variables: {
      spaceId,
      status: SpaceJoinRequestStatus.PENDING,
    },
    fields: {
      member: 'basic',
    },
  })

  const { mutate: approve, isLoading: approveLoading } =
    useApproveSpaceMembershipRequest()
  const { mutate: decline, isLoading: declineLoading } =
    useDeclineSpaceMembershipRequest()
  const onApprove = requestId => {
    approve({
      spaceId,
      spaceMembershipRequestId: requestId,
    })
  }
  const onDecline = requestId => {
    decline({
      spaceId,
      spaceMembershipRequestId: requestId,
    })
  }

  if (!requests?.length) {
    return (
      <div className="my-16">
        <EmptyState
          icon={<DocumentIcon />}
          title="All good!"
          description="Nothing here at this time."
        />
      </div>
    )
  }

  return (
    <Table>
      <Table.Body>
        {requests?.map(request => (
          <Table.Row key={request.member?.id}>
            <Table.Cell>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <Avatar
                    src={
                      (request.member?.profilePicture as Image)?.urls?.thumb ||
                      (request.member?.profilePicture as Image)?.url
                    }
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-basicSurface-900">
                    {request.member?.name}
                  </div>
                  <div className="text-sm text-basicSurface-500">
                    {request.member?.tagline}
                  </div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="text-right font-medium">
              <Button
                loading={approveLoading}
                disabled={approveLoading || declineLoading}
                variant="primary"
                onClick={() => {
                  onApprove(request.id)
                }}
                className="mr-3"
              >
                Approve
              </Button>
              <Button
                loading={declineLoading}
                disabled={approveLoading || declineLoading}
                variant="outline"
                onClick={() => {
                  onDecline(request.id)
                }}
              >
                Decline
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
