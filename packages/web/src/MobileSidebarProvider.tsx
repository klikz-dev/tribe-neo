import { ReactElement, ReactNode, useState } from 'react'

import { NavigationSlates } from '@tribeplatform/gql-client/types'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'

export type MobileSidebarProps = {
  mobileSidebar: ReactElement
  mobileSidebarOpen: boolean
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileSidebarContext = React.createContext<MobileSidebarProps>({
  mobileSidebar: null,
  mobileSidebarOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMobileSidebarOpen: () => {},
})

export type MobileSidebarProviderProps = {
  navigationSlates: NavigationSlates
  children: ReactNode
}

export const MobileSidebarProvider = ({
  navigationSlates,
  children,
}: MobileSidebarProviderProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false)
  const { sidebar1 } = navigationSlates
  const mobileSidebar = <SlateRenderer slate={sidebar1} />
  return (
    <MobileSidebarContext.Provider
      value={{ mobileSidebar, mobileSidebarOpen, setMobileSidebarOpen }}
    >
      {children}
    </MobileSidebarContext.Provider>
  )
}

export const useMobileSidebar = (): MobileSidebarProps => {
  const context = React.useContext(MobileSidebarContext)
  return context
}
