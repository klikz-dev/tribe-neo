import { Button } from '../Button'

import { alert } from './index'

export default {
  title: 'Utility/Alert',
}

export const Template = () => {
  const alertIt = async () => {
    await alert({
      title: 'Publish feature is not available on this plan',
    })
  }
  return <Button onClick={alertIt}>Publish</Button>
}

export const WithDescription = () => {
  const alertIt = async () => {
    await alert({
      title: 'Publish feature is not available on this plan',
      description:
        'To be able to publish app you need to upgrade your plan to premium.',
    })
  }
  return <Button onClick={alertIt}>Publish</Button>
}
export const WithButtonLabel = () => {
  const alertIt = async () => {
    await alert({
      title: 'Publish feature is not available on this plan',
      proceedLabel: 'Understood',
    })
  }
  return <Button onClick={alertIt}>Delete</Button>
}

export const Danger = () => {
  const alertIt = async () => {
    await alert({
      title: 'Publish feature is not available on this plan',
      description:
        'To be able to publish app you need to upgrade your plan to premium.',
      danger: true,
    })
  }
  return (
    <Button onClick={alertIt} variant="danger">
      Delete
    </Button>
  )
}
