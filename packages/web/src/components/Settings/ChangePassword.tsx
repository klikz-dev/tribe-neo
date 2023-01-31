import { Form } from '@tribeplatform/react-sdk/components'
import { useUpdateMember } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

export const ChangePassword = () => {
  const { mutateAsync: updatePassword, isLoading: updatePasswordLoading } =
    useUpdateMember()

  return (
    <Card>
      <Card.Header
        title="Password"
        description="Please enter your current password to change your password."
      />
      <Card.Content>
        <Form
          onSubmit={async (data, methods) => {
            const { currentPassword, newPassword, newPasswordConfirm } = data

            if (newPassword !== newPasswordConfirm) {
              methods.setError('newPasswordConfirm', {
                message: 'The passwords do not match',
                type: 'validate',
              })
              return
            }

            await updatePassword({
              input: {
                currentPassword,
                newPassword,
              },
            })
          }}
        >
          <div className="flex flex-col space-y-5">
            <Form.Input
              type="password"
              name="currentPassword"
              label="Current password"
              helperText="Please enter your current password."
            />
            <Form.Input
              type="password"
              name="newPassword"
              label="New password"
              helperText="Please make sure your password includes at least 10 characters, 1 uppercase letter, 1 number, and 1 symbol (!, $, @, *, etc)."
            />
            <Form.Input
              type="password"
              name="newPasswordConfirm"
              label="Confirm new password"
              helperText="Re-enter your new password for verification."
            />
            <Form.Actions>
              <Button type="submit" loading={updatePasswordLoading} size="lg">
                Update
              </Button>
            </Form.Actions>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
