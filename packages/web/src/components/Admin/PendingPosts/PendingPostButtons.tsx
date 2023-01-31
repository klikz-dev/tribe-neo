import { useState } from 'react'

import { ModerationStatus } from '@tribeplatform/gql-client/types'
import { useUpdateModerationItem } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const PendingPostButtons = ({
  moderationItemId,
}: {
  moderationItemId: string
}) => {
  const [updating, setUpdating] = useState<'accepting' | 'rejecting' | null>(
    null,
  )
  const { mutateAsync: updateModerationItem } = useUpdateModerationItem()

  const acceptPost = (moderationItemId: string) => {
    setUpdating('accepting')
    updateModerationItem({
      id: moderationItemId,
      input: {
        status: ModerationStatus.REJECTED,
      },
    })
      .then(() => {
        toast({
          title: 'Post has been allowed',
          status: 'success',
        })
      })
      .catch(() => {
        toast({
          title: 'Unable to allow post',
          status: 'error',
        })
      })
      .finally(() => {
        setUpdating(null)
      })
  }

  const rejectPost = (moderationItemId: string) => {
    setUpdating('rejecting')
    updateModerationItem({
      id: moderationItemId,
      input: {
        status: ModerationStatus.ACCEPTED,
      },
    })
      .then(() => {
        toast({
          title: 'Post has been rejected',
          status: 'success',
        })
      })
      .catch(() => {
        toast({
          title: 'Unable to reject post',
          status: 'error',
        })
      })
      .finally(() => {
        setUpdating(null)
      })
  }
  return (
    <div className="flex space-x-5 mt-4">
      <Button
        className="flex-1 justify-center"
        loading={updating === 'accepting'}
        disabled={updating === 'rejecting'}
        variant="outline"
        onClick={() => acceptPost(moderationItemId)}
      >
        Accept post
      </Button>
      <Button
        className="flex-1 justify-center"
        loading={updating === 'rejecting'}
        disabled={updating === 'accepting'}
        variant="outline"
        onClick={() => rejectPost(moderationItemId)}
      >
        Reject post
      </Button>
    </div>
  )
}
