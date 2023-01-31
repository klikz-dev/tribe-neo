import { ErrorBoundary } from '../../Error/ErrorBoundry'
import { AdminSidebar } from './AdminSidebar'

export const AdminMenu = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-main-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-grow overflow-hidden">
        <div className="h-screen overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
