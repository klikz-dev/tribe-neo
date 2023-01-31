import { List } from './List'

export default {
  title: 'Collections/List',
  component: List,
}

const DummyContent = () => (
  <div className="border-4 border-dashed border-neutral-100 w-full h-24 bg-surface-100 flex flex-wrap place-content-center ">
    content
  </div>
)

export const Template = args => (
  <List {...args}>
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
  </List>
)

Template.args = {
  divider: false,
  spacing: 'md',
  direction: 'vertical',
}

export const WithDividers = args => (
  <List divider>
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
  </List>
)

export const Horizontal = args => (
  <List direction="horizontal">
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
    <List.Item>
      <DummyContent />
    </List.Item>
  </List>
)
