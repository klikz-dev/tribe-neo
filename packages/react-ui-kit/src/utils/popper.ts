import { CSSProperties } from 'react'

export type PopperContext = {
  styles: { [key: string]: CSSProperties }
  attributes: { [key: string]: { [key: string]: string } | undefined }
  setButtonElement: (element: HTMLElement | null) => void
  setPanelElement: (element: HTMLElement | null) => void
  setArrowElement?: (element: HTMLElement | null) => void
}
