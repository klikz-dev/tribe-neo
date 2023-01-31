import { Button } from '../Button'

import { confirm } from './index'

export default {
  title: 'Utility/Confirm',
}

export const Template = () => {
  const confirmIt = async () => {
    await confirm({
      title: 'Are you sure you want to deactivate your account?',
    })
  }
  return <Button onClick={confirmIt}>Delete</Button>
}

export const WithDescription = () => {
  const confirmIt = async () => {
    await confirm({
      title: 'Deactivate account',
      description:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This alert cannot be undone.',
    })
  }
  return <Button onClick={confirmIt}>Delete</Button>
}
export const WithButtonLabels = () => {
  const confirmIt = async () => {
    await confirm({
      title: 'Are you sure you want to deactivate your account?',
      proceedLabel: 'Deactivate',
      cancelLabel: 'Keep account',
    })
  }
  return <Button onClick={confirmIt}>Delete</Button>
}

export const Danger = () => {
  const confirmIt = async () => {
    await confirm({
      title: 'Deactivate account',
      description:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This alert cannot be undone.',
      danger: true,
    })
  }
  return (
    <Button onClick={confirmIt} variant="danger">
      Delete
    </Button>
  )
}
