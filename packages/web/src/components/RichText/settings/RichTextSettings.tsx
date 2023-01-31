import { useRef } from 'react'

import { Form } from '@tribeplatform/react-sdk/components'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import { Composer } from '../../Composer'
import { ComposerRefImperativeHandle } from '../../Composer/@types'

export const RichTextSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const quillRef = useRef<ComposerRefImperativeHandle>(null)
  const { props } = component

  return (
    <Form defaultValues={props}>
      <List>
        <List.Item>
          <FormControl>
            <FormControl.Label>Content</FormControl.Label>
            <div className="relative shadow-sm border rounded-md p-3 my-4 border-neutral-300 overflow-y-auto">
              <Composer
                ref={quillRef}
                value={props?.content}
                onChange={value => {
                  upsertProp('content', value)
                }}
              />
            </div>
          </FormControl>
        </List.Item>
        <List.Item>
          <Form.Toggle
            label="Hidden"
            name="hidden"
            onChange={value => {
              upsertProp('hidden', value)
            }}
            checked={props?.hidden}
          />
        </List.Item>
      </List>
    </Form>
  )
}
