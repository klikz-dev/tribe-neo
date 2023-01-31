import { Alert } from '@tribeplatform/react-ui-kit/Alert'

export const WorkInProgress = ({ type = 'full' }) => {
  return (
    <Alert title="Work In Progress" status="warning" className="mb-5">
      {type === 'full'
        ? "We're still working on this section. Feel free to browse, however, please do not report bugs."
        : ''}
    </Alert>
  )
}
