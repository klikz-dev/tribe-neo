import PencilIcon from '@heroicons/react/outline/PencilIcon'
import { Link } from 'react-router-dom'

import { Member } from '@tribeplatform/gql-client/types'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { MemberBackgroundImage } from './MemberBackgroundImage'
import { RoleBadge } from './RoleBadge'

export const MemberHeader = ({ member }: { member: Member }) => {
  const { data: authMember } = useAuthMember()

  if (!member) return null
  return (
    <Card className="overflow-hidden -mt-5 sm:mt-0" attached="bottom">
      <PageHeader
        title={
          <div className="flex items-center">
            <div className="truncate">{member?.name}</div>
            <RoleBadge member={member} />
          </div>
        }
        avatar={
          <Avatar
            size="2xl"
            className="ring-4 bg-surface-50 ring-surface-50 ring-offset-0 ring-offset-surface-50	sm:h-32 sm:w-32"
            src={member?.profilePicture?.url}
            name={member?.name}
          />
        }
        backgroundColor={member?.banner?.dominantColorHex as any}
        backgroundImage={<MemberBackgroundImage member={member} />}
        action={
          <>
            {authMember?.id && authMember?.id === member?.id ? (
              <Button
                as={Link}
                to="/settings/profile"
                variant="outline"
                leadingIcon={<PencilIcon />}
              >
                Edit Profile
              </Button>
            ) : null}
          </>
        }
      />
    </Card>
  )
}
