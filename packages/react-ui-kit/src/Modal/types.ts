import { MutableRefObject } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | 'full' | 'zen'
  showCloseBtn?: boolean
  showZenModeBtn?: boolean
  initialFocus?: MutableRefObject<HTMLElement | null>
  className?: string
}
