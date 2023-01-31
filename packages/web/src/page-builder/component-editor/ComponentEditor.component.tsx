import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { SectionHeader } from '@tribeplatform/react-ui-kit/SectionHeader'
import { useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { EditorBackButton } from './EditorBackButton'

export const ComponentEditor = () => {
  const { context, popActiveBlock } = useSlateKit()
  const { activeBlocks, activeBlock } = context

  if (!activeBlock) return null

  const prevActiveBlock =
    activeBlocks.length > 1 ? activeBlocks[activeBlocks.length - 2] : null
  return (
    <List spacing="sm">
      <List.Item>
        <EditorBackButton
          label={prevActiveBlock ? prevActiveBlock.name : 'Theme Editor'}
          onClick={() => {
            popActiveBlock()
          }}
        />
      </List.Item>
      <List.Item>
        <SectionHeader title={`Edit ${activeBlock.name}`} />
        <Divider padding="none" />
      </List.Item>
      <List.Item>{activeBlock?.Settings}</List.Item>
    </List>
  )
}
