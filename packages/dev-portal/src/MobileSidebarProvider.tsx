import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { AppSidebar } from './containers/App/components/AppSidebar/AppSidebar'

export type MobileSidebarProps = {
  mobileSidebar: ReactElement
  mobileSidebarOpen: boolean
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const MobileSidebarContext = createContext<MobileSidebarProps>({
  mobileSidebar: null,
  mobileSidebarOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMobileSidebarOpen: () => {},
})

export type MobileSidebarProviderProps = {
  children: ReactNode
}

export const MobileSidebarProvider = ({
  children,
}: MobileSidebarProviderProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false)
  const mobileSidebar = <AppSidebar />

  return (
    <MobileSidebarContext.Provider
      value={{ mobileSidebar, mobileSidebarOpen, setMobileSidebarOpen }}
    >
      {children}
    </MobileSidebarContext.Provider>
  )
}

export const useMobileSidebar = (): MobileSidebarProps => {
  const context = useContext(MobileSidebarContext)
  return context
}
