import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'
import { Container } from '@tribeplatform/react-ui-kit/Layout'

export const NotFoundContainer = () => {
  return (
    <Container className="pt-5 sm:pt-7">
      <Card>
        <Card.Content>
          <div className="py-12">
            <EmptyState
              icon={<DocumentIcon />}
              title="Page not found!"
              description="We were not able to find the page you're looking for."
            >
              <Button variant="outline" as="a" href="/">
                Home
              </Button>
            </EmptyState>
          </div>
        </Card.Content>
      </Card>
    </Container>
  )
}
