import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState as EmptyStateComponent } from '@tribeplatform/react-ui-kit/EmptyState'

export const EmptyState = () => {
  return (
    <Card>
      <Card.Content>
        <div className="my-16">
          <EmptyStateComponent
            title="Nothing here yet!"
            icon={<DocumentIcon />}
          />
        </div>
      </Card.Content>
    </Card>
  )
}
