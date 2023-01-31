import { List } from '../Layout'
import { StackedList } from './StackedList'

export default {
  title: 'Collections/StackedList',
  component: StackedList,
}

const DummyContent = () => (
  <div className="border-4 border-dashed border-neutral-100 w-full h-24 bg-surface-100 flex flex-wrap place-content-center ">
    content
  </div>
)

export const Template = args => (
  <div className="h-96">
    <StackedList {...args}>
      <StackedList.Group>
        <StackedList.GroupTitle>A</StackedList.GroupTitle>
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
      </StackedList.Group>
      <StackedList.Group>
        <StackedList.GroupTitle>B</StackedList.GroupTitle>
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
      </StackedList.Group>
      <StackedList.Group>
        <StackedList.GroupTitle>C</StackedList.GroupTitle>
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
      </StackedList.Group>
    </StackedList>
  </div>
)

Template.args = {}
