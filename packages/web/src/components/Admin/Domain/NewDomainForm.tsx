import { Form } from '@tribeplatform/react-sdk/components'
import {
  useDomainAvailability,
  useUpdateNewDomain,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'

export const NewDomainForm = ({ network }) => {
  const { mutateAsync: updateNewDomain, isLoading: isUpdating } =
    useUpdateNewDomain()
  const { checkDomainAvailability, isLoading: isChecking } =
    useDomainAvailability()

  return (
    <Form
      defaultValues={{
        domain: network.domain,
      }}
      onSubmit={async (data: { newDomain: string }) => {
        const domainAvailability = await checkDomainAvailability(data.newDomain)
        if (!domainAvailability.available) {
          // eslint-disable-next-line no-throw-literal
          throw {
            response: {
              errors: [
                {
                  field: 'newDomain',
                  message: 'This domain is not available.',
                },
              ],
            },
          }
        }
        return updateNewDomain({ input: { domain: data.newDomain } })
      }}
    >
      <Card.Header title="Domain" />
      <Card.Content>
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
          <Form.Input
            name="newDomain"
            label="New domain or subdomain"
            placeholder="community.yourdomain.com"
            helperText={
              <article>
                <p>
                  Enter the domain or subdomain that you want to move your
                  community to.
                </p>
                <p>
                  We will guide you what to do next.{' '}
                  <Link
                    external
                    href="https://community.tribe.so/knowledge-base-2-0/post/GN59yUKKHrgKdBX"
                  >
                    Learn more
                  </Link>
                </p>
              </article>
            }
          />
        </div>
      </Card.Content>
      <Card.Actions>
        <Button type="submit" loading={isUpdating || isChecking}>
          Move community
        </Button>
      </Card.Actions>
    </Form>
  )
}
