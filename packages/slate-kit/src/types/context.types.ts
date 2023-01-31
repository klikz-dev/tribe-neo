import { ActiveBlock } from '../blocks'
import { SlateUpdates } from './slate.types'

export type SharedContextProps = {
  visitor: any
  network: any
}

export type SlateKitContextProps = SharedContextProps & {
  activeBlock?: ActiveBlock
  activeBlocks: ActiveBlock[]
  selectedBlocks: { id: string; level: number }[]
  slateUpdates: Record<string, SlateUpdates | undefined>
}

export type SlateContextProps = SharedContextProps & {
  urlParams: Record<string, any>
  queryParams: Record<string, any>
  path: string
  blocksOutput: Record<string, any>
  [key: string]: any
}
