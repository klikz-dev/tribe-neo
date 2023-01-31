import { Badge } from '../Badge'
import { Text } from '../Text'
import { Card } from './Card'
import { CARD_PADDINGS } from './CardContext'

export default {
  title: 'View/Card',
  component: Card,
  argTypes: {
    padding: {
      options: CARD_PADDINGS,
      control: { type: 'radio' },
    },
  },
  decorators: [Story => <div className="max-w-sm">{Story()}</div>],
}

export const Template = (args: any) => (
  <Card {...args}>
    <Card.Header title={args.title} description={args.description} />
    <Card.Content>{args.children}</Card.Content>
  </Card>
)

Template.args = {
  title: 'Card title',
  description: 'Description',
  padding: 'md',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
  className: '',
}

export const WithHeaderAndFooter = (args: any) => (
  <Card>
    <Card.Header title="Space" description="Short description" />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer>73 members</Card.Footer>
  </Card>
)

export const WithSmallPadding = (args: any) => (
  <Card padding="sm">
    <Card.Header title="Space" description="Short description" />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer>73 members</Card.Footer>
  </Card>
)

export const WithMedia = (args: any) => (
  <Card {...args}>
    <Card.Media>
      <img src="https://placeimg.com/500/500/animals" width="100%" alt="" />
    </Card.Media>
    <Card.Header title="Animals" />
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer>
      <div className="space-x-4">
        <Badge variant="secondary" rounded>
          #photography
        </Badge>
        <Badge variant="secondary" rounded>
          #travel
        </Badge>
        <Badge variant="secondary" rounded>
          #winter
        </Badge>
      </div>
    </Card.Footer>
  </Card>
)
