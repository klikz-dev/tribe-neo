import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState as EmptyStateComponent } from '@tribeplatform/react-ui-kit/EmptyState'

export const EmptyState = () => (
  <Card>
    <Card.Content>
      <div className="py-12">
        <EmptyStateComponent
          icon={<DocumentIcon />}
          title="App not found!"
          description="We were not able to find the app you're looking for."
        />
      </div>
    </Card.Content>
  </Card>
)
