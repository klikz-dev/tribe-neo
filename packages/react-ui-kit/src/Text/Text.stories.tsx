import { Text } from './Text'

export default {
  title: 'Elements/Text',
  component: Text,
  decorators: [
    Story => <div className="flex flex-col space-y-4">{Story()}</div>,
  ],
}

const args = {
  size: 'md',
  align: 'leading',
  truncate: false,
  children: 'Lorem ipsum',
}

export const Template = (args: any) => <Text {...args} />
Template.args = args

export const Sizes = (args: any) => (
  <>
    <Text {...args} size="xs">
      [xs] The quick brown fox jumped over the lazy dog.
    </Text>
    <Text {...args} size="sm">
      [sm] The quick brown fox jumped over the lazy dog.
    </Text>
    <Text {...args} size="md">
      [md] The quick brown fox jumped over the lazy dog.
    </Text>
    <Text {...args} size="lg">
      [lg] The quick brown fox jumped over the lazy dog.
    </Text>
    <Text {...args} size="xl">
      [xl] The quick brown fox jumped over the lazy dog.
    </Text>
    <Text {...args} size="2xl">
      [2xl] The quick brown fox jumped over the lazy dog.
    </Text>
  </>
)

export const Align = (args: any) => (
  <>
    <Text {...args} align="leading">
      Left aligned
    </Text>
    <Text {...args} align="center">
      Center aligned
    </Text>
    <Text {...args} align="trailing">
      Right aligned
    </Text>
  </>
)

export const Truncated = (args: any) => (
  <Text {...args} truncate>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
    dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus.
    Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
    ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
    ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
    ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
    nisi vel augue. Curabitur ullamcorper ultricies nisi.
  </Text>
)
