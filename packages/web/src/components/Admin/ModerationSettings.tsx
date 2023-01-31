import { Form } from '@tribeplatform/react-sdk/components'
import {
  useModerationSettings,
  useUpdateModerationSettings,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const ModerationSettings = () => {
  const { data: moderationSettings } = useModerationSettings()
  const { mutateAsync: updateModerationSettings, isLoading } =
    useUpdateModerationSettings()

  if (!moderationSettings) return null

  return (
    <div className="max-w-3xl">
      <Card>
        <Card.Header title="Block list" />
        <Card.Content>
          <Form
            defaultValues={moderationSettings}
            onSubmit={data => {
              updateModerationSettings({ input: data })
                .then(() => {
                  toast({
                    title: 'Updated Moderation Settings.',
                    status: 'success',
                  })
                })
                .catch(() => {
                  toast({
                    title: 'Unable to Update Moderation Settings.',
                    status: 'error',
                  })
                })
            }}
          >
            <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
              <Form.Toggle
                name="enableBlacklisting"
                label="Enable block list"
              />
              <Form.Toggle
                name="useDefaultBlacklisting"
                label={
                  <>
                    Include list of{' '}
                    <Link
                      external
                      href="https://github.com/web-mech/badwords/blob/master/lib/lang.json"
                    >
                      common profane words
                    </Link>
                  </>
                }
              />
              <Form.Textarea
                name="customBlacklist"
                label="Additional words to block list"
              />
              <Form.Actions>
                <Button type="submit" loading={isLoading}>
                  Update
                </Button>
              </Form.Actions>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
