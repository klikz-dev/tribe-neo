import { Link } from 'react-router-dom'

import { Collection } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'

export const CollectionCard = ({
  collection,
  fields = [],
}: {
  collection?: Collection
  fields?: Array<'name' | 'description'>
}) => {
  if (!fields.length) fields = ['name', 'description']

  return (
    <Card className="h-full">
      <Link to="#">
        <div className="flex-1 flex flex-col mb-2 p-6 pt-4 items-center text-center">
          {fields.map(field => {
            switch (field) {
              case 'name':
                return (
                  <h3 className="text-basicSurface-900 text-sm font-medium max-w-full truncate mb-2">
                    {collection?.name}
                  </h3>
                )
              case 'description':
                return (
                  <div className="text-basicSurface-500 text-sm max-w-full truncate">
                    {collection?.description}
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
