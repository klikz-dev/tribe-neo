import { Form } from '@tribeplatform/react-sdk/components'
import { useAuthToken, useUpdateMember } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { ProfilePicture } from './ProfilePicture'

export const ProfileSettings = ({ member }) => {
  const {
    data: { network },
  } = useAuthToken()
  const { mutateAsync: updateMember, isLoading } = useUpdateMember()

  return (
    <div>
      <Card>
        <Card.Header
          title="Profile"
          description="Your profile information will be visible to anyone who has access to this community."
        />
        <Card.Content>
          <Form
            defaultValues={member}
            onSubmit={async data => {
              const { name, tagline, fields } = data

              const input = {
                name,
                tagline,
                fields: { fields: [] },
              }

              if (fields && fields.fields) {
                Object.keys(fields.fields).forEach(key => {
                  input.fields.fields.push({
                    key,
                    value: JSON.stringify(fields.fields[key]),
                  })
                })
              }

              return updateMember({
                input,
              })
            }}
            className="flex flex-col space-y-5"
          >
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-12 md:col-span-4 mx-auto">
                <ProfilePicture member={member} />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
                <Form.Input name="name" label="Name" placeholder="John Smith" />
                <Form.Input
                  name="tagline"
                  label="Tagline"
                  placeholder="CEO at Acme"
                />
              </div>
            </div>
            {false && network?.memberFields?.fields?.length ? (
              <div className="flex flex-col space-y-5 mt-5">
                {network?.memberFields?.fields?.map(field => {
                  return (
                    <Form.Input
                      key={field.key}
                      name={`fields.fields.${field.key}`}
                      label={field.name}
                    />
                  )
                })}
              </div>
            ) : null}
            <Form.Actions>
              <Button type="submit" loading={isLoading} size="lg">
                Update
              </Button>
            </Form.Actions>
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
