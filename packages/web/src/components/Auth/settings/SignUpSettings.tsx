import { useRef } from 'react'

import { Form } from '@tribeplatform/react-sdk/components'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import { Composer } from '../../Composer'
import { ComposerRefImperativeHandle } from '../../Composer/@types'

export const SignUpSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const primaryQuillRef = useRef<ComposerRefImperativeHandle>(null)
  // const secondaryQuillRef = useRef<ComposerRefImperativeHandle>(null)
  const { props } = component

  return (
    <Form defaultValues={props}>
      <List>
        <List.Item>
          <FormControl>
            <FormControl.Label>Sign up Message</FormControl.Label>
            <div className="relative shadow-sm border rounded-md p-3 my-4 border-neutral-300 overflow-y-auto">
              <Composer
                ref={primaryQuillRef}
                value={props?.primaryMessage}
                onChange={value => {
                  upsertProp('primaryMessage', value)
                }}
              />
            </div>
          </FormControl>
        </List.Item>
        {/* <List.Item>
          <FormControl>
            <FormControl.Label>Secondary Message</FormControl.Label>
            <div className="relative shadow-sm border rounded-md p-3 my-4 border-neutral-300 overflow-y-auto">
              <Composer
                ref={secondaryQuillRef}
                value={props?.secondaryMessage}
                onChange={value => {
                  upsertProp('secondaryMessage', value)
                }}
              />
            </div>
          </FormControl>
        </List.Item> */}
      </List>
    </Form>
  )
}
