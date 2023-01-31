import { Card } from '@tribeplatform/react-ui-kit/Card'
import { useSlate } from '@tribeplatform/slate-kit/hooks'

import { ComposerReadonly } from '../Composer'
import { RichTextSettings } from './settings/RichTextSettings'

export const RichText = ({ content, hidden }) => {
  const { mode } = useSlate()

  if (hidden) return null
  if (!content && mode === 'live') return null

  return (
    <Card className="mb-5 overflow-hidden">
      <Card.Content>
        {content ? (
          <article>
            <ComposerReadonly content={content} />
          </article>
        ) : (
          <p>Insert HTML in this block</p>
        )}
      </Card.Content>
    </Card>
  )
}

RichText.Settings = RichTextSettings
RichText.displayName = 'Rich Text'
