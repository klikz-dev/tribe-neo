import CodeIcon from '@heroicons/react/outline/CodeIcon'
import ExternalLinkIcon from '@heroicons/react/outline/ExternalLinkIcon'
import UsersIcon from '@heroicons/react/outline/UsersIcon'
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon'
import LinkIcon from 'remixicon-react/LinkIcon'
import LockLineIcon from 'remixicon-react/LockLineIcon'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import Settings3LineIcon from 'remixicon-react/Settings3LineIcon'
import ShareForwardLineIcon from 'remixicon-react/ShareForwardLineIcon'
import { Link as RouterLink, useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

import { useMobileSidebar } from '../../../../MobileSidebarProvider'
import { AppIcon } from '../../../Apps/components'

const INFORMATION_PATH = 'information'
const CREDENTIALS_PATH = 'credentials'
const CUSTOM_CODE_PATH = 'custom-code'
const COLLABORATORS_PATH = 'collaborators'
const WEBHOOKS_PATH = 'webhooks'
const TEST_AND_PUBLISH_PATH = 'test-and-publish'

const AppName = () => {
  const [, params] = useRoute('/apps/:appSlug/:section')
  const { data: app, isLoading } = useGlobalApp({
    variables: { slug: params?.appSlug },
    fields: { image: 'basic', network: 'basic', customCodes: 'basic' },
  })

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 -ml-1 mr-2">
          <div className="rounded-md bg-surface-300 h-8 w-8" />
        </div>
        <div className="h-4 bg-surface-300 rounded w-3/4" />
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 -ml-1 mr-2">
        <AppIcon app={app} size="sm" />
      </div>
      <b className="truncate">{app?.name}</b>
    </div>
  )
}

export const AppSidebar = () => {
  const [, params] = useRoute('/apps/:appSlug/:section')
  const getHref = (path: string) => `/apps/${params?.appSlug}/${path}`
  const { setMobileSidebarOpen } = useMobileSidebar()
  const closeMobileSidebar = () => setMobileSidebarOpen(false)

  return (
    <NavVertical>
      <NavVertical.Group>
        <Link
          as={RouterLink}
          href="/apps"
          variant="neutral"
          onClick={closeMobileSidebar}
        >
          <div className="px-3 py-2 text-basicMain-500 pb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 -ml-1 mr-2">
                <ArrowLeftLineIcon />
              </div>
              Back to all apps
            </div>
          </div>
        </Link>
        <div className="px-2 py-2 font-semibold pb-4">
          <AppName />
        </div>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(INFORMATION_PATH)}
          leadingIcon={<PencilLineIcon />}
          active={params?.section === INFORMATION_PATH}
          onClick={closeMobileSidebar}
        >
          App information
        </NavVertical.Item>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(CREDENTIALS_PATH)}
          leadingIcon={<LockLineIcon />}
          active={params?.section === CREDENTIALS_PATH}
          onClick={closeMobileSidebar}
        >
          Credentials
        </NavVertical.Item>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(COLLABORATORS_PATH)}
          leadingIcon={<UsersIcon />}
          active={params?.section === COLLABORATORS_PATH}
          onClick={closeMobileSidebar}
        >
          Collaborators
        </NavVertical.Item>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(CUSTOM_CODE_PATH)}
          leadingIcon={<CodeIcon />}
          active={params?.section === CUSTOM_CODE_PATH}
          onClick={closeMobileSidebar}
        >
          Custom code
        </NavVertical.Item>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(WEBHOOKS_PATH)}
          leadingIcon={<LinkIcon />}
          active={params?.section === WEBHOOKS_PATH}
          onClick={closeMobileSidebar}
        >
          Webhooks
        </NavVertical.Item>
        <NavVertical.Item
          as={RouterLink}
          href={getHref(TEST_AND_PUBLISH_PATH)}
          leadingIcon={<Settings3LineIcon />}
          active={params?.section === TEST_AND_PUBLISH_PATH}
          onClick={closeMobileSidebar}
        >
          Test and publish
        </NavVertical.Item>
        <NavVertical.Item
          href="https://developers.tribeplatform.com/docs/graphql/schema/"
          leadingIcon={<ShareForwardLineIcon />}
          target="_blank"
          onClick={closeMobileSidebar}
        >
          API reference{' '}
          <ExternalLinkIcon
            height="1em"
            width="1em"
            className="inline-block align-text-bottom ml-1"
          />
        </NavVertical.Item>
      </NavVertical.Group>
    </NavVertical>
  )
}
