import { ReactElement } from 'react'

import {
  SlateContext,
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'

import { BlockPicker } from './BlockPicker.component'

export const BlockPreview = (): ReactElement => {
  const { activeBlock } = useSlateKit().context
  const { activated } = useSlateComponent()
  const slateProps = useSlate()

  let preview
  if (activated && activeBlock?.Preview) {
    preview = (
      <SlateContext.Provider
        value={{
          ...slateProps,
          mode: 'preview',
        }}
      >
        {activeBlock?.Preview({})}
      </SlateContext.Provider>
    )
  }
  return (
    <>
      {preview ? (
        <div className="mb-3 border-2 border-actionPrimary-500 border-dashed rounded-md">
          {preview}
        </div>
      ) : (
        <div className="mb-3 p-5 text-center border-2 border-actionPrimary-500 border-dashed rounded-lg bg-surface-50">
          Block preview
        </div>
      )}
    </>
  )
}

BlockPreview.Settings = BlockPicker
