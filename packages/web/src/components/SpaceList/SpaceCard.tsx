import { Link } from 'react-router-dom'

import { Card } from '@tribeplatform/react-ui-kit/Card'

import { SpaceImage } from '../Space/SpaceImage'
import { SpacePrivacyIcon } from '../Space/SpacePrivacyIcon'

export const SpaceCard = ({ space, fields = [] }) => {
  if (!fields.length) fields = ['image', 'name', 'membersCount', 'postsCount']

  return (
    <Card className="h-full">
      <Link to={`/${space?.slug}`}>
        <div className="flex-1 flex flex-col mb-2 p-6 pt-4 items-center text-center">
          {fields.map(field => {
            switch (field) {
              case 'image':
                return (
                  <div key={field} className="mb-3">
                    <SpaceImage space={space} size="md" />
                  </div>
                )
              case 'name':
                return (
                  <div
                    key={field}
                    className="flex space-x-1 items-center mb-2 max-w-full"
                  >
                    <h4 className="text-basicSurface-900 max-w-full truncate">
                      {space.name}
                    </h4>
                    <SpacePrivacyIcon space={space} size="sm" />
                  </div>
                )
              case 'membersCount':
                return (
                  <div
                    key={field}
                    className="text-basicSurface-500 text-sm max-w-full truncate"
                  >
                    {space?.membersCount?.toLocaleString() || '0'}{' '}
                    {space?.membersCount === 1 ? 'member' : 'members'}
                  </div>
                )
              case 'postsCount':
                return (
                  <div
                    key={field}
                    className="text-basicSurface-500 text-sm max-w-full truncate"
                  >
                    {space?.postsCount?.toLocaleString() || '0'}{' '}
                    {space?.postsCount === 1 ? 'post' : 'posts'}
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
