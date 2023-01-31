import { Form } from '@tribeplatform/react-sdk/components'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Select } from '@tribeplatform/react-ui-kit/Select'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

const alignments = [
  { value: 'center', text: 'Center' },
  { value: 'left', text: 'Left' },
]

const styles = [
  { value: 'simple', text: 'Simple' },
  { value: 'vibrant', text: 'Vibrant' },
]

export const AnnouncementSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const { props } = component
  props.viewStyle = props.viewStyle || 'simple'
  props.align = props.align || 'center'

  return (
    <Form
      onChange={e => {
        upsertProp(e.target.name, e.target.value)
      }}
      defaultValues={props}
    >
      <div className="flex flex-col space-y-5">
        <FormControl.Select
          value={props?.viewStyle}
          onChange={value => {
            upsertProp('viewStyle', value)
            return value
          }}
          label="View Style"
        >
          <Select.Button>
            {styles.find(s => s.value === props?.viewStyle).text}
          </Select.Button>
          <Select.Items>
            {styles.map(style => (
              <Select.Item key={style.value} value={style.value}>
                {style.text}
              </Select.Item>
            ))}
          </Select.Items>
        </FormControl.Select>
        <Form.Input name="title" label="Title" />
        <Form.Textarea name="description" label="Description" />
        <Form.Input name="actionText" label="Button Text" />
        <Form.Input name="actionUrl" label="Button Link" />
        <FormControl.Select
          value={props?.align}
          onChange={value => {
            upsertProp('align', value)
            return value
          }}
          label="Text Align"
        >
          <Select.Button>
            {alignments.find(a => a.value === props?.align).text}
          </Select.Button>
          <Select.Items>
            {alignments.map(align => (
              <Select.Item key={align.value} value={align.value}>
                {align.text}
              </Select.Item>
            ))}
          </Select.Items>
        </FormControl.Select>
        <Form.Toggle
          label="Hidden"
          name="hidden"
          onChange={value => {
            upsertProp('hidden', value)
            return value
          }}
          checked={props?.hidden}
        />
      </div>
    </Form>
  )
}
