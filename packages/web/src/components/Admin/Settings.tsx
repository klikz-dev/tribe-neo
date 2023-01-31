import {
  NetworkMembership,
  NetworkVisibility,
  RoleType,
} from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useUpdateNetwork } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

export const Settings = ({ network }) => {
  const { mutateAsync: updateNetwork, isLoading } = useUpdateNetwork()

  const isPrivateNetwork = network?.visibility === NetworkVisibility.PRIVATE
  const isInviteOnly = network?.membership === NetworkMembership.INVITE_ONLY
  const canNonAdminsInvite = network?.whoCanInvite?.length !== 0

  return (
    <div className="flex flex-col space-y-5 max-w-3xl">
      <Card>
        <Card.Header title="General Settings" />
        <Card.Content>
          <Form
            defaultValues={network}
            onSubmit={async data => {
              const { name, termsOfServiceUrl, privacyPolicyUrl } = data

              return updateNetwork({
                input: {
                  name,
                  termsOfServiceUrl,
                  privacyPolicyUrl,
                },
              })
            }}
          >
            <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
              <Form.Input
                name="name"
                label="Community name"
                placeholder="Acme Community"
              />
              <Form.Input name="termsOfServiceUrl" label="Terms of service" />
              <Form.Input name="privacyPolicyUrl" label="Privacy policy" />
              <Form.Actions>
                <Button type="submit" loading={isLoading}>
                  Update
                </Button>
              </Form.Actions>
            </div>
          </Form>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header title="Permissions" />
        <Card.Content>
          <Form
            defaultValues={{
              isPrivateNetwork,
              isInviteOnly,
              canNonAdminsInvite,
            }}
            onSubmit={async data => {
              const { isPrivateNetwork, isInviteOnly, canNonAdminsInvite } =
                data

              return updateNetwork({
                input: {
                  visibility: isPrivateNetwork
                    ? NetworkVisibility.PRIVATE
                    : NetworkVisibility.PUBLIC,
                  membership: isInviteOnly
                    ? NetworkMembership.INVITE_ONLY
                    : NetworkMembership.OPEN,
                  whoCanInviteIds: canNonAdminsInvite
                    ? network?.roles
                        ?.filter?.(role =>
                          role?.type
                            ? [RoleType.MEMBER, RoleType.MODERATOR].indexOf(
                                role.type,
                              ) > -1
                            : false,
                        )
                        .map(role => role.id)
                    : [],
                },
              })
            }}
          >
            <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
              <Form.Toggle
                name="isPrivateNetwork"
                label="Private community"
                helperText="Allow only community members to view and browse the community."
              />
              <Form.Toggle
                name="isInviteOnly"
                label="Invite-only"
                helperText="Allow only people with an invite to join as community members."
              />
              <Form.Toggle
                name="canNonAdminsInvite"
                label="Anyone can invite"
                helperText="Allow non-admin members to invite others to the community."
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
