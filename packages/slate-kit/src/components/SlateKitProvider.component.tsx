import { ReactElement, useState } from 'react'

import { ActiveBlock } from '../blocks'
import { SlateKitContext } from '../hooks'
import { SlateKit } from '../slate-kit'
import { SharedContextProps, SlateKitMode, SlateUpdates } from '../types'

type SlateKitProviderProps = {
  kit: SlateKit
  context: SharedContextProps
  children?: ReactElement | ReactElement[]
}

export const SlateKitProvider = ({
  kit,
  context: initialContext,
  children,
}: SlateKitProviderProps): ReactElement => {
  const [activeBlocks, setActiveBlocks] = useState<ActiveBlock[]>([])
  const [selectedBlocks, setSelectedBlocks] = useState<
    { level: number; id: string }[]
  >([])
  const [slateUpdates, setSlateUpdates] = useState<
    Record<string, SlateUpdates | undefined>
  >({})
  const [mode, setMode] = useState<SlateKitMode>('live')

  const updateSlateById = (slateId: string, slateChanges?: SlateUpdates) => {
    setSlateUpdates(slateUpdates => ({
      ...slateUpdates,
      [slateId]: slateChanges,
    }))
  }
  const revertSlateUpdatesById = (slateId: string) => {
    setSlateUpdates(slateUpdates => ({ ...slateUpdates, [slateId]: undefined }))
  }
  const updateActiveBlock = (updateBlock?: Partial<ActiveBlock>) => {
    setActiveBlocks(activeBlocks => {
      if (updateBlock?.id) return [updateBlock as ActiveBlock]
      if (activeBlocks[0] && updateBlock)
        return [{ ...activeBlocks[0], ...updateBlock }]
      return []
    })
  }
  const pushActiveBlock = (block: ActiveBlock) => {
    setActiveBlocks(activeBlocks => {
      return [...activeBlocks, block]
    })
  }
  const popActiveBlock = () => {
    setActiveBlocks(activeBlocks => {
      return activeBlocks.length > 0 ? activeBlocks.slice(0, -1) : []
    })
  }
  const selectBlock = (selectedBlock: { id: string; level: number }) => {
    setSelectedBlocks(blocks => {
      return [
        ...blocks.filter(
          block =>
            block.id !== selectedBlock.id ||
            block.level !== selectedBlock.level,
        ),
        selectedBlock,
      ].sort((a, b) => b.level - a.level)
    })
  }
  const unselectBlock = (selectedBlock: { id: string; level: number }) => {
    setSelectedBlocks(blocks => {
      return blocks
        .filter(
          block =>
            block.id !== selectedBlock.id ||
            block.level !== selectedBlock.level,
        )
        .sort((a, b) => b.level - a.level)
    })
  }
  return (
    <SlateKitContext.Provider
      value={{
        kit,
        mode,
        context: {
          ...initialContext,
          activeBlock:
            activeBlocks.length > 0
              ? activeBlocks[activeBlocks.length - 1]
              : null,
          activeBlocks,
          selectedBlocks,
          slateUpdates,
        },
        setMode,
        updateActiveBlock,
        setActiveBlocks,
        pushActiveBlock,
        popActiveBlock,
        selectBlock,
        unselectBlock,
        updateSlateById,
        revertSlateUpdatesById,
        setSlateUpdates,
      }}
    >
      {children}
    </SlateKitContext.Provider>
  )
}
