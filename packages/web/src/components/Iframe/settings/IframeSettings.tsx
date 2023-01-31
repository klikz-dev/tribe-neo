import { Form } from '@tribeplatform/react-sdk/components'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

export const IframeSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const { props } = component

  return (
    <Form
      onChange={e => {
        upsertProp(e.target.name, e.target.value)
      }}
      defaultValues={props}
    >
      <div className="flex flex-col space-y-5">
        <Form.Input name="title" label="Title" />
        <Form.Input
          name="src"
          label="IFrame Url"
          helperText="Please note that not every url is embeddable in an IFrame."
        />
        <Form.Input type="number" name="height" label="Height" />
        <Form.Toggle
          label="Hidden"
          name="hidden"
          onChange={value => {
            upsertProp('hidden', value)
          }}
          checked={props?.hidden}
        />
      </div>
    </Form>
  )
}
