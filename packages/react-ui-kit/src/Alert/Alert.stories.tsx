import { Link } from '../Link'
import { Alert } from './Alert'

export default {
  title: 'Elements/Alert',
  component: Alert,
}

export const Template = (args: any) => <Alert {...args} />
Template.args = {
  status: 'warning',
  title: 'Attention needed',
  withClose: false,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.',
}

export const Variants = (args: any) => (
  <div className="space-y-4">
    <Alert {...args} status="error" />
    <Alert {...args} status="warning" />
    <Alert {...args} status="success" />
    <Alert {...args} status="info" />
  </div>
)
Variants.args = {
  status: 'warning',
  title: 'Attention needed',
}

export const WithDescription = () => (
  <Variants title="Attention needed">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur,
    ipsum similique veniam quo totam eius aperiam dolorum.
  </Variants>
)

export const WithCloseButton = () => (
  <Variants title="Attention needed" withClose>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur,
    ipsum similique veniam quo totam eius aperiam dolorum.
  </Variants>
)

export const WithList = () => (
  <Variants title="Attention needed">
    <ul className="list-disc pl-5 space-y-1">
      <li>Your password must be at least 8 characters</li>
      <li>
        Your password must include at least one pro wrestling finishing move
      </li>
    </ul>
  </Variants>
)

export const WithActions = () => (
  <Variants title="Attention needed">
    <div className="space-x-4">
      <Link href="#" variant="inherit">
        View status
      </Link>
      <Link href="#" variant="inherit">
        Details
      </Link>
    </div>
  </Variants>
)
