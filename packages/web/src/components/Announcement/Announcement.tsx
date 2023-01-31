import clsx from 'clsx'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { AnnouncementSettings } from './settings/AnnouncmentSettings'

export const Announcement = ({
  title,
  description,
  actionText,
  actionUrl,
  align = 'center',
  viewStyle = 'simple',
  hidden = false,
}) => {
  if (hidden) return null

  const cardStyle = [
    viewStyle === 'vibrant' && 'bg-actionPrimary-600 text-basicPrimary-500',
  ]
  const buttonVariant = viewStyle === 'vibrant' ? 'outline' : 'primary'

  return (
    <Card className={clsx('mb-5 overflow-hidden', cardStyle)}>
      <Card.Content className={clsx(align === 'center' && 'text-center')}>
        {title ? (
          <Card.Header>
            <h2>{title}</h2>
          </Card.Header>
        ) : null}
        {description ? <Card.Content>{description}</Card.Content> : null}
        {actionText && actionUrl ? (
          <Card.Footer>
            <Button size="lg" as="a" href={actionUrl} variant={buttonVariant}>
              {actionText}
            </Button>
          </Card.Footer>
        ) : null}
      </Card.Content>
    </Card>
  )
}

Announcement.Settings = AnnouncementSettings
