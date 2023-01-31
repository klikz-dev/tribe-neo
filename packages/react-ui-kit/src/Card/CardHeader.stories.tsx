import DuplicateIcon from '@heroicons/react/solid/DuplicateIcon'
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon'

import { AvatarWithText } from '../Avatar'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { Card } from './Card'

export default {
  title: 'View/Card/Header',
  component: Card.Header,
  decorators: [Story => <div className="max-w-sm">{Story()}</div>],
}

export const Template = (args: any) => (
  <Card>
    <Card.Header {...args} />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)

Template.args = {
  title: 'Card title',
  description: 'Description',
  withBorder: false,
}

export const Simple = (args: any) => (
  <Card>
    <Card.Header title="What are cards, and how will they be shown on my community?" />
    <Card.Content>
      Cards are little blocks of information that are placed on the community
      background. They appear like this.
    </Card.Content>
  </Card>
)

export const WithDescription = (args: any) => (
  <Card>
    <Card.Header title="Animals" description="Short description" />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)
export const WithLongDescription = (args: any) => (
  <Card>
    <Card.Header
      title="Animals"
      description="Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente."
    />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)
export const WithBorder = (args: any) => (
  <Card>
    <Card.Header
      title="Animals"
      description="Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente."
      withBorder
    />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)

export const WithAction = (args: any) => (
  <Card>
    <Card.Header title="Animals" action={<Button>Action</Button>} />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)

export const WithDescriptionAndAction = (args: any) => (
  <Card>
    <Card.Header
      title="Animals"
      description="Description"
      action={<Button>Action</Button>}
    />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)

export const WithCustomContent = (args: any) => (
  <Card>
    <Card.Header>
      <div className="flex space-x-3  place-content-between">
        <AvatarWithText
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="Chelsea Hagon"
          description="December 9 at 11:43 AM"
        />
        <div className="flex-shrink-0 self-center flex">
          <Dropdown>
            <Dropdown.ButtonMinimal />
            <Dropdown.Items>
              <Dropdown.Item leadingIcon={<PencilAltIcon />}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item leadingIcon={<DuplicateIcon />}>
                Duplicate
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown>
        </div>
      </div>
    </Card.Header>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
  </Card>
)
