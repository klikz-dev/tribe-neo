import { Form } from '@tribeplatform/react-sdk/components'
import { useCollections } from '@tribeplatform/react-sdk/hooks'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Toggle } from '@tribeplatform/react-ui-kit/Toggle'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import { DraggableList } from '../../DraggableList'
import { CollectionsLoading } from '../CollectionLoading'
import { getDetailedCollectionItems } from '../utils'

export const CollectionMenuSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const { items = [], viewStyle = 'collapsible' } = component?.props || {}
  const { data: collections, isLoading } = useCollections({})

  if (isLoading) return <CollectionsLoading />
  if (!Array.isArray(collections)) return null

  const collectionItems = getDetailedCollectionItems(items, collections)
  const toggleItem = (index, enabled) => {
    const newItems = collectionItems.map((item, idx) =>
      idx === index ? { ...item, enabled } : item,
    )
    upsertProp('items', newItems)
  }
  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const newItems = DraggableList.reorder(
      collectionItems,
      result.source.index,
      result.destination.index,
    )
    upsertProp('items', newItems)
  }

  return (
    <Form
      onChange={e => {
        upsertProp(e.target.name, e.target.value)
      }}
      defaultValues={{
        viewStyle: viewStyle || 'collapsible',
      }}
      className="flex flex-col space-y-5"
    >
      <FormControl.Select
        value={viewStyle}
        onChange={value => {
          upsertProp('viewStyle', value)
          return value
        }}
        label="View Style"
        items={[
          { value: 'simple', text: 'Simple' },
          { value: 'collapsible', text: 'Collapsible' },
        ]}
      />
      <FormControl>
        <FormControl.Label>Collections</FormControl.Label>
        <DraggableList id="main-menu-items" onDragEnd={onDragEnd}>
          {collectionItems.map((item, index) => (
            <DraggableList.Item key={item.id} id={item.id} index={index}>
              <p className="flex flex-grow text-basicSurface-500">
                {item.name}
              </p>
              <Toggle
                checked={item.enabled}
                onChange={enabled => {
                  toggleItem(index, enabled)
                }}
              />
            </DraggableList.Item>
          ))}
        </DraggableList>
      </FormControl>
    </Form>
  )
}
