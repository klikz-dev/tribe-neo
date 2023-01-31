import { Link } from 'react-router-dom'

import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { RoleBadge } from '../Member/RoleBadge'

export const MemberCard = ({ member, fields = [] }) => {
  if (!fields.length) fields = ['profilePicture', 'name', 'badge', 'tagline']
  return (
    <Card className="h-full">
      <Link to={`/member/${member?.id}`}>
        <div className="flex-1 flex flex-col space-y-3 mb-2 p-6 pt-4 items-center text-center">
          {fields.map(field => {
            switch (field) {
              case 'profilePicture':
                return (
                  <Avatar
                    key={field}
                    className="mb-3"
                    size="3xl"
                    name={member?.name}
                    src={member?.profilePicture?.urls?.small}
                  />
                )
              case 'name':
                return (
                  <h4
                    key={field}
                    className="text-basicSurface-900 max-w-full truncate mb-2"
                  >
                    {member.name}
                  </h4>
                )

              case 'badge':
                return <RoleBadge key={field} member={member} />

              case 'tagline':
                return (
                  <div
                    key={field}
                    className="text-basicSurface-500 text-sm max-w-full truncate"
                  >
                    {member?.tagline}
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      </Link>
    </Card>
  )
}
