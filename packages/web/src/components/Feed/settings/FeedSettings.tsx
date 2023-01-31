import { Form } from '@tribeplatform/react-sdk/components'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Select } from '@tribeplatform/react-ui-kit/Select'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

const views = [
  { value: 'card', text: 'Card view' },
  { value: 'row', text: 'Row view' },
]

export const FeedSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const { props } = component
  props.view = props.view || 'card'

  return (
    <Form
      onChange={e => {
        upsertProp(e.target.name, e.target.value)
      }}
      defaultValues={props}
    >
      <div className="flex flex-col space-y-5">
        <FormControl.Select
          value={props?.view}
          onChange={value => {
            upsertProp('view', value)
            return value
          }}
          label="Default View Style"
        >
          <Select.Button>
            {views.find(v => v.value === props?.view).text}
          </Select.Button>
          <Select.Items>
            {views.map(view => (
              <Select.Item key={view.value} value={view.value}>
                {view.text}
              </Select.Item>
            ))}
          </Select.Items>
        </FormControl.Select>
      </div>
    </Form>
  )
}
