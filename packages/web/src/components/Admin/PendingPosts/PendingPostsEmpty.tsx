import { Card } from '@tribeplatform/react-ui-kit/Card'

export const PendingPostsEmpty = ({ text }: { text?: string }) => (
  <Card>
    <div className="h-32 flex flex-col justify-center">
      <h3 className="text-center">
        {text || 'You have no pending posts to review'}
      </h3>
    </div>
  </Card>
)
