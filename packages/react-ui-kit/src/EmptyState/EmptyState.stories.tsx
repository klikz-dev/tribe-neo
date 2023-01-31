import FolderAddIcon from '@heroicons/react/solid/FolderAddIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'

import { Button } from '../Button'
import { EmptyState } from './EmptyState'

export default {
  title: 'Elements/Empty State',
  component: EmptyState,
}

export const Template = (args: any) => (
  <EmptyState icon={<FolderAddIcon />} {...args} />
)
Template.args = {
  title: 'No projects',
  description: 'Get started by creating a new project.',
}

export const WithAction = (args: any) => (
  <EmptyState
    icon={<FolderAddIcon />}
    title="No projects"
    description="Get started by creating a new project."
  >
    <Button leadingIcon={<PlusIcon />}>New Project</Button>
  </EmptyState>
)

export const WithDashedBorder = (args: any) => (
  <EmptyState.Dashed icon={<FolderAddIcon />}>
    Create a new database
  </EmptyState.Dashed>
)
