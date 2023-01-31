import clsx from 'clsx'

export const Sidebar = props => {
  const { children, className } = props

  return (
    <div className={clsx('flex flex-col w-64 min-w-64', className)}>
      <div className="flex-1 flex flex-col min-h-0 border-r border-neutral-200 bg-surface-50">
        {children}
      </div>
    </div>
  )
}

const SidebarHeader = props => {
  const { children } = props

  return (
    <div className="flex items-center flex-shrink-0 px-4 py-5">{children}</div>
  )
}

const SidebarContent = props => {
  const { children } = props

  return (
    <div className="flex-1 flex flex-col pb-4 overflow-y-auto">{children}</div>
  )
}

const SidebarFooter = props => {
  const { children } = props

  return (
    <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
      {children}
    </div>
  )
}

Sidebar.Header = SidebarHeader
Sidebar.Content = SidebarContent
Sidebar.Footer = SidebarFooter
