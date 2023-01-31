import { FC, ReactElement, ReactNode } from 'react'

import clsx from 'clsx'
import { matchPath, useLocation } from 'react-router'

import {
  NavigationSlates,
  Network,
  Page,
} from '@tribeplatform/gql-client/types'
import { useSpace } from '@tribeplatform/react-sdk/hooks'
import { Container } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { useSlateKit } from '@tribeplatform/slate-kit/hooks'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { ErrorBoundary } from '../../components/Error/ErrorBoundry'
import { PoweredByTribe } from '../../components/PoweredByTribe'
import { PullToRefresh } from '../../components/PullToRefresh'
import { useMobileSidebar } from '../../MobileSidebarProvider'
import { layoutsAdditionalContext } from './constants'
import { SlateLayout } from './layout.enum'
import { SampleContent } from './sample-components/SampleContent.component'
import { SampleHeader } from './sample-components/SampleHeader.component'
import { SampleSidebar } from './sample-components/SampleSidebar.component'
import {
  getNavigationComponents,
  getSpaceSlugFromPage,
  useActivePage,
} from './utils'

type LayoutProps = {
  Content: ReactElement
  pages: Page[]
  navigationSlates: NavigationSlates
  customPage?: Page
  customLayoutSlug?: string
  hideContent?: boolean
  hideNavigation?: boolean
}

const withFooter = (Content: ReactNode, network: Network) => {
  const currentYear = new Date().getFullYear()
  return (
    <>
      {Content}
      <div className="flex flex-col space-y-3 mt-8 px-3">
        {(network?.termsOfServiceUrl || network?.privacyPolicyUrl) && (
          <div className="flex space-x-2">
            {network?.termsOfServiceUrl && (
              <Link
                variant="neutral"
                className="text-xs"
                rel="noopener noreferrer"
                href={network?.termsOfServiceUrl}
              >
                Terms of Service
              </Link>
            )}

            {network?.privacyPolicyUrl && (
              <Link
                rel="noopener noreferrer"
                variant="neutral"
                className="text-xs"
                href={network?.privacyPolicyUrl}
              >
                Privacy Policy
              </Link>
            )}
          </div>
        )}
        <div className="text-xs text-basicMain-600" aria-label="Copyright">
          © Copyright {currentYear}, {network?.name}
        </div>

        {network?.tribeBranding && (
          <Link
            rel="noopener noreferrer"
            variant="neutral"
            href={`https://tribe.so/?utm_campaign=powered-by&utm_medium=referral&utm_source=${network?.domain}&utm_term=${network?.name}`}
            target="_blank"
            className="text-basicMain-600 flex items-center -mt-1"
          >
            <PoweredByTribe />
          </Link>
        )}
      </div>
    </>
  )
}

export const LayoutLoader: FC<LayoutProps> = ({
  Content,
  pages,
  navigationSlates,
  customPage,
  customLayoutSlug,
  hideContent,
  hideNavigation,
}) => {
  const {
    context: { network, visitor },
  } = useSlateKit()
  const { mobileSidebarOpen } = useMobileSidebar()
  const activePage = useActivePage(pages, customPage)
  const { pathname } = useLocation()
  const queryParams = useQuery()
  const path = activePage?.address?.path
  const { params } = matchPath(pathname, path) || {}
  const spaceSlug = getSpaceSlugFromPage(activePage, {
    urlParams: params,
    queryParams,
    network,
    visitor,
    path,
    blocksOutput: {},
  })
  const { data: space } = useSpace({
    variables: { slug: spaceSlug },
    fields: 'default',
    useQueryOptions: {
      enabled: !!spaceSlug,
    },
  })

  const layoutSlug: SlateLayout = (customLayoutSlug ||
    queryParams?.layout ||
    space?.layout ||
    activePage.layout) as SlateLayout
  const additionalContext = layoutsAdditionalContext[layoutSlug]
  const { Header, Sidebar1 } = getNavigationComponents(
    navigationSlates,
    path,
    additionalContext,
  )

  switch (layoutSlug) {
    case SlateLayout.CLASSIC:
      return (
        <div className="bg-main-50 min-h-screen">
          <ErrorBoundary>
            {hideNavigation ? <SampleHeader /> : Header}
          </ErrorBoundary>
          <div className="overflow-hidden pb-5">
            <PullToRefresh disabled={mobileSidebarOpen}>
              <ErrorBoundary>
                {hideContent ? <SampleContent /> : Content}
              </ErrorBoundary>
            </PullToRefresh>
          </div>
        </div>
      )
    case SlateLayout.DEFAULT:
    default:
      return (
        <div className="bg-main-50 min-h-screen pb-10">
          <ErrorBoundary>
            {hideNavigation ? <SampleHeader /> : Header}
          </ErrorBoundary>
          <Container
            size="md"
            className={clsx(
              'w-full grid grid-cols-12 gap-5 overflow-hidden pb-5',
              mobileSidebarOpen && 'fixed',
            )}
          >
            <aside
              className="hidden lg:block lg:col-span-3 xl:col-span-3 pt-5 sm:pt-7"
              aria-label="Sidebar"
            >
              <ErrorBoundary>
                {hideNavigation ? (
                  <SampleSidebar />
                ) : (
                  withFooter(Sidebar1, network)
                )}
              </ErrorBoundary>
            </aside>
            <main className="col-span-12 lg:col-span-9 xl:col-span-9">
              {hideContent ? (
                <SampleContent />
              ) : (
                <PullToRefresh disabled={mobileSidebarOpen}>
                  <ErrorBoundary>{Content}</ErrorBoundary>
                </PullToRefresh>
              )}
            </main>
          </Container>
        </div>
      )
  }
}
