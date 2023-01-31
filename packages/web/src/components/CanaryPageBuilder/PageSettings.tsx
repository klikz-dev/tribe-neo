import { useState } from 'react'

import CogIcon from '@heroicons/react/outline/CogIcon'

import { Page } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Input } from '@tribeplatform/react-ui-kit/Input'

export const PageSettings = ({ page }: { page: Page }) => {
  const [name, setName] = useState(page?.seoDetail.title)

  return (
    <Card>
      <Card.Header>
        <h5 className="flex space-x-2 items-center text-base font-semibold">
          <CogIcon className="h-4 w-4" /> Page Details
        </h5>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center space-x-2">
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>
      </Card.Content>
    </Card>
  )
}
