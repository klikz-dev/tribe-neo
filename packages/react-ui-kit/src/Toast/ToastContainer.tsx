import { FC } from 'react'

import { Toaster } from 'react-hot-toast'

import { Portal } from '../Portal'

/**
 * Global toast live region, render this permanently at the end of the document
 */
export const ToastContainer: FC = () => (
  <Portal>
    <Toaster position="top-right" />
  </Portal>
)
