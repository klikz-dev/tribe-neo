import CheckIcon from '@heroicons/react/outline/CheckIcon'
import Lock2LineIcon from 'remixicon-react/Lock2LineIcon'

import {
  App,
  AppPublication,
  Image,
  PlanName,
  PluralNetwork,
} from '@tribeplatform/gql-client/types'
import {
  useGlobalPublishAppPrivately,
  useGlobalUnPublishAppPrivately,
} from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { confirm } from '@tribeplatform/react-ui-kit/Dialog'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

const PUBLISH_ALLOWED_PLANS = [PlanName.ENTERPRISE, PlanName.PREMIUM]

export const AppPublicationListItem = (props: {
  network: PluralNetwork
  app: App
  loadingPublication: boolean
  publication: AppPublication | null
}) => {
  const { network, app, loadingPublication, publication } = props

  const { mutate: publish, isLoading: isPublishing } =
    useGlobalPublishAppPrivately()
  const { mutate: unPublish, isLoading: isUnPublishing } =
    useGlobalUnPublishAppPrivately()

  const onPublish = async () => {
    if (!PUBLISH_ALLOWED_PLANS.includes(network.subscriptionPlan.name)) {
      toast({
        title: 'Publish feature is not available on this plan',
        description: `To be able to publish app you need to upgrade your plan to premium.`,
      })
      return
    }

    publish({
      appId: app.id,
      networkId: network.id,
    })
  }

  const onUnPublish = async () => {
    const confirmed = await confirm({
      title: 'Are you sure you want to unpublish this app?',
      description: 'All app settings will be reset',
      proceedLabel: 'Unpublish',
      danger: true,
    })
    if (!confirmed) {
      return
    }
    unPublish({
      appId: app.id,
      networkId: network.id,
    })
  }

  const isPublished = !!publication

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-1">
        <div className="flex items-start">
          <div className="mt-1">
            <Avatar
              size="md"
              src={(network.globalLogo as Image)?.urls?.thumb}
              name={network.name}
              rounded={false}
            />
          </div>
          <div className="ml-3">
            <p className="text-basicSurface-700 group-hover:text-basicSurface-900 font-medium">
              {network.name}
              <Badge
                size="md"
                rounded
                variant="secondary"
                className="ml-2 align-middle"
                leadingIcon={
                  PUBLISH_ALLOWED_PLANS.includes(
                    network?.subscriptionPlan?.name,
                  ) ? (
                    <CheckIcon className="text-success-600" />
                  ) : (
                    <Lock2LineIcon />
                  )
                }
              >
                {network.subscriptionPlan?.name}
              </Badge>
            </p>
            <Link
              target="_blank"
              href={`https://${network.domain}`}
              className="text-sm font-medium text-basicSurface-500 group-hover:text-basicSurface-700"
            >
              {network.domain}
            </Link>
            <p className="text-sm text-basicSurface-500">
              Network ID: {network.id}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-1">
        {!loadingPublication && isPublished && (
          <Button
            variant="danger"
            onClick={onUnPublish}
            loading={isUnPublishing}
          >
            Unpublish
          </Button>
        )}
        {!loadingPublication && !isPublished && (
          <Button variant="primary" onClick={onPublish} loading={isPublishing}>
            Publish
          </Button>
        )}
      </div>
    </div>
  )
}
