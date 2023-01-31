import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { CollaboratorActionBar } from './CollaboratorActionBar'
import { CollaboratorList } from './CollaboratorList'

export const Collaborators = () => {
  const [, params] = useRoute('/apps/:appSlug/collaborators')
  const { data: app } = useGlobalApp({ variables: { slug: params?.appSlug } })

  return (
    <>
      <PageHeader padding="md" title="Collaborators" />

      <Card>
        <Card.Header withBorder title="Add members collaborating on this app" />
        <Card.Content>
          <CollaboratorList app={app} />
        </Card.Content>
        <Card.Footer>
          <CollaboratorActionBar app={app} />
        </Card.Footer>
      </Card>
    </>
  )
}
