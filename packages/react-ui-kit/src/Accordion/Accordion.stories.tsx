import { Meta, Story } from '@storybook/react'

import { Accordion, AccordionProps } from './Accordion'

export default {
  title: 'Elements/Accordion',
  component: Accordion,
} as Meta

export const Template: Story<AccordionProps> = args => {
  return (
    <Accordion {...args}>
      <Accordion.Button>Do you support accordions?</Accordion.Button>
      <Accordion.Panel>Yes we do! They will show up like this.</Accordion.Panel>
    </Accordion>
  )
}

Template.args = {}
