import { Card } from '@tribeplatform/react-ui-kit/Card'

export const EmptySettings = ({ text }: { text?: string }) => (
  <Card>
    <div className="h-32 flex flex-col justify-center">
      <h3 className="text-center">{text || 'This app has no settings'}</h3>
    </div>
  </Card>
)
