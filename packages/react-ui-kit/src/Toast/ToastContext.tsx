import { createContext, useContext } from 'react'

export type ToastStatus = 'error' | 'warning' | 'success' | 'info' | 'neutral'

export interface ToastContext {
  status: ToastStatus
  onClose: () => void
}

const ToastContext = createContext<ToastContext>(undefined)

export const ToastProvider = ({ onClose, status, children }) => (
  <ToastContext.Provider
    value={{
      status,
      onClose,
    }}
  >
    {children}
  </ToastContext.Provider>
)

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
