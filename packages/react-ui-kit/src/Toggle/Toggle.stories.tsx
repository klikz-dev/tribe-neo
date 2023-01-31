import { useState } from 'react'

import { Toggle } from './Toggle'

export default {
  title: 'Forms/Toggle',
  component: Toggle,
}

export const Template = (args: any) => {
  const [checked, onChange] = useState(false)

  return <Toggle {...args} checked={checked} onChange={onChange} />
}
Template.args = {}

export const WithDescription = () => (
  <Template title="Lorem ipsum" description="Nulla amet tempus sit accumsan." />
)

export const Disabled = () => <Template disabled />
