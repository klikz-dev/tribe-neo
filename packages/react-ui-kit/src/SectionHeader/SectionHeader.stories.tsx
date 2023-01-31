import SearchIcon from '@heroicons/react/solid/SearchIcon'

import { Button } from '../Button'
import { Input } from '../Input'
import { Tabs } from '../Tabs'
import { SectionHeader } from './SectionHeader'

export default {
  title: 'Elements/Section Header',
  component: SectionHeader,
}

export const Template = (args: any) => <SectionHeader {...args} />

Template.args = {
  title: 'Section title',
  description: '',
}

export const Simple = (args: any) => <SectionHeader title="Section title" />

export const WithDescription = (args: any) => (
  <SectionHeader title="Section title" description="Short description" />
)

export const WithLongDescription = (args: any) => (
  <SectionHeader
    title="Section title"
    description="Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente."
  />
)

export const WithAction = (args: any) => (
  <SectionHeader
    title="Section title"
    action={
      <>
        <Button variant="outline">Edit</Button>
        <Button>Publish</Button>
      </>
    }
  />
)

export const WithDescriptionAndAction = (args: any) => (
  <SectionHeader
    title="Section title"
    description="Description"
    action={
      <>
        <Button variant="outline">Edit</Button>
        <Button>Publish</Button>
      </>
    }
  />
)

export const WithInput = (args: any) => (
  <SectionHeader
    title="Job Postings"
    action={
      <Input placeholder="Search candidates" leadingIcon={<SearchIcon />} />
    }
  />
)

export const WithTabs = (args: any) => (
  <SectionHeader title="Candidates">
    <Tabs.Group>
      <Tabs.List variant="pills" {...args}>
        <Tabs.Tab name="Applied">Applied</Tabs.Tab>
        <Tabs.Tab name="Hired">Hired</Tabs.Tab>
      </Tabs.List>
    </Tabs.Group>
  </SectionHeader>
)

export const WithActionsAndTabs = (args: any) => (
  <SectionHeader
    title="Candidates"
    action={
      <>
        <Button variant="outline">Share</Button>
        <Button>Create</Button>
      </>
    }
  >
    <Tabs.Group>
      <Tabs.List variant="pills" {...args}>
        <Tabs.Tab name="Applied">Applied</Tabs.Tab>
        <Tabs.Tab name="Hired">Hired</Tabs.Tab>
      </Tabs.List>
    </Tabs.Group>
  </SectionHeader>
)
