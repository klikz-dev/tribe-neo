import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalAddAppCollaborator } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { confirm } from '@tribeplatform/react-ui-kit/Dialog'

export const CollaboratorActionBar = ({ app }) => {
  const { mutateAsync: addCollaborator, isLoading } =
    useGlobalAddAppCollaborator()

  const onSubmit = async (data, methods) => {
    const confirmed = await confirm({
      title: 'Are you sure you want to add a collaborator?',
    })
    if (!confirmed) {
      return
    }
    await addCollaborator(
      {
        appId: app?.id,
        input: {
          email: data.email,
        },
      },
      {
        onSuccess: () => {
          methods.reset({
            email: '',
          })
        },
      },
    )
  }

  return (
    <Form onSubmit={onSubmit} className="space-y-5">
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <Form.Input
            autoComplete="email"
            name="email"
            placeholder="Email address"
            validation={{
              required: "This field can't be empty",
            }}
          />
        </div>

        <Button variant="primary" size="lg" type="submit" loading={isLoading}>
          Add collaborator
        </Button>
      </div>
    </Form>
  )
}
