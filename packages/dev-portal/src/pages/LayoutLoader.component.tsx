import { FC, ReactElement } from 'react'

import clsx from 'clsx'
import { useRoute } from 'wouter'

import { Container } from '@tribeplatform/react-ui-kit/Layout'

import { ErrorBoundary } from '../components/Error/ErrorBoundry'
import { Navbar } from '../components/Navbar'
import { AppSidebar } from '../containers/App/components/AppSidebar/AppSidebar'
import { useMobileSidebar } from '../MobileSidebarProvider'

type LayoutProps = {
  Content: ReactElement
}

export const LayoutLoader: FC<LayoutProps> = ({ Content }) => {
  const { mobileSidebarOpen } = useMobileSidebar()
  const [match] = useRoute('/apps/:appSlug/:section')

  const Header = <Navbar />
  const Sidebar1 = match ? <AppSidebar /> : null
  const noSidebar = !match

  if (noSidebar) {
    return (
      <div className="bg-main-50 min-h-screen">
        <ErrorBoundary>{Header}</ErrorBoundary>
        <div className="overflow-hidden pb-5">
          <ErrorBoundary>{Content}</ErrorBoundary>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-50 min-h-screen pb-10">
      <ErrorBoundary>{Header}</ErrorBoundary>
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
          <ErrorBoundary>{Sidebar1}</ErrorBoundary>
        </aside>
        <main className="col-span-12 lg:col-span-9 xl:col-span-9 pt-5 sm:pt-7">
          <ErrorBoundary>{Content}</ErrorBoundary>
        </main>
      </Container>
    </div>
  )
}
