import dayjs from 'dayjs'

import { App, AppInstallation } from '@tribeplatform/gql-client/types'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { AppHighlightItem } from './AppHighlightItem'

export const AppHighlights = ({
  app,
  appInstallation,
}: {
  app: App
  appInstallation: AppInstallation
}) => {
  return (
    <>
      <Card className="w-96">
        <Card.Header title="Highlights" />
        <Card.Content>
          <div className="flex flex-col space-y-3">
            <AppHighlightItem>
              Available on {app?.requiredPlan} plans
            </AppHighlightItem>
            {app?.authorName && app?.authorUrl && (
              <AppHighlightItem>
                Built by{' '}
                <Link href={app?.authorUrl} external>
                  {app?.authorName}
                </Link>
              </AppHighlightItem>
            )}
            <AppHighlightItem>
              Covered by our{' '}
              <Link
                href={
                  app?.termsOfServiceUrl || 'https://tribe.so/terms-of-service'
                }
                external
              >
                terms of service
              </Link>{' '}
              and{' '}
              <Link
                href={
                  app?.privacyPolicyUrl || 'https://tribe.so/privacy-policy'
                }
                external
              >
                privacy policy
              </Link>
              .
            </AppHighlightItem>
            {app?.docsUrl && (
              <>
                <Divider padding="none" />
                <Button className="justify-center" variant="outline">
                  <Link href={app?.docsUrl} external>
                    View documentation
                  </Link>
                </Button>
              </>
            )}
          </div>
        </Card.Content>
      </Card>
      {appInstallation && (
        <div className="p-6 w-96">
          App was installed by {appInstallation?.installedBy?.name} on{' '}
          <time
            className="cursor-help"
            dateTime={appInstallation?.installedAt}
            title={appInstallation?.installedAt}
          >
            {dayjs(appInstallation?.installedAt).format('MMMM D, YYYY')}
          </time>
        </div>
      )}
    </>
  )
}
