import { Button } from '../Button'
import { Card } from './Card'

export default {
  title: 'View/Card/Footer',
  component: Card.Footer,
  decorators: [Story => <div className="max-w-sm">{Story()}</div>],
}

export const Template = (args: any) => (
  <Card>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer {...args} />
  </Card>
)

Template.args = {
  children: 'Card footer',
  withBorder: false,
}

export const Simple = (args: any) => (
  <Card>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer>73 members</Card.Footer>
  </Card>
)

export const WithBorder = (args: any) => (
  <Card>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer withBorder>5 comments</Card.Footer>
  </Card>
)
export const WithFullWidthButton = (args: any) => (
  <Card>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Footer>
      <Button fullWidth variant="outline">
        See all
      </Button>
    </Card.Footer>
  </Card>
)

export const WithActionButtons = (args: any) => (
  <Card>
    <Card.Content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Card.Content>
    <Card.Actions>
      <Button>Update</Button>
    </Card.Actions>
  </Card>
)
