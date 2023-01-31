import clsx from 'clsx'
import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Accordion } from '@tribeplatform/react-ui-kit/Accordion'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { useCodeEditor } from '../../../../components/CodeEditor/useCodeEditor'
import { CustomCodeBody } from './CustomCodeBody'
import { CustomCodeHead } from './CustomCodeHead'

const Key = ({ children }) => {
  return (
    <kbd className="bg-surface-200 text-xs py-0.5 px-1 inline-block rounded-md">
      {children}
    </kbd>
  )
}

export const CustomCode = () => {
  const [, params] = useRoute('/apps/:appSlug/:section')
  const { data: app } = useGlobalApp({
    variables: { slug: params?.appSlug },
  })
  useCodeEditor()

  if (!app) {
    return null
  }

  return (
    <>
      <PageHeader
        title="Custom Tags &amp; Scripts"
        description="Custom code is sometimes needed for ultimate flexibility. Add custom code to the public pages of your community."
        padding="md"
      />
      <Accordion className="mb-3">
        <Accordion.Button className="px-2">
          Need help using the editor?
        </Accordion.Button>
        <Accordion.Panel>
          <Card className="mb-5">
            <Card.Content>
              <Alert status="warning" className="mb-4">
                Tribe does not validate custom code for you, so be sure to check
                your code before publishing.
              </Alert>
              <div className={clsx('mb-4', 'text-basicSurface-500')}>
                Tribe uses{' '}
                <Link href="https://shopify.github.io/liquid/" external>
                  Liquid
                </Link>{' '}
                as the template engine. The following variables are available to
                use:
                <ul className="list-disc ml-6 mt-2">
                  <li className="mt-1">
                    <Link href="https://partners.tribe.so/docs/graphql/objects/member">
                      <code>member</code>
                    </Link>
                    : logged in member
                  </li>
                  <li className="mt-1">
                    <Link href="https://partners.tribe.so/docs/graphql/queries/network">
                      <code>network</code>
                    </Link>
                    : current network
                  </li>
                  <li className="mt-1">
                    <code>anonymize</code>: boolean flag based on the fact that
                    the member has accepted cookie consent or not. If they
                    accept, it will be false, and if they don’t it’ll be true.
                    Tribe hashes member ID when this flag is true.
                  </li>
                  {/* <li className="mt-1">
                <code>settings</code>: object where you can store your variables
              </li> */}
                </ul>
              </div>
              <p className="mb-2">Here is an example:</p>
              <pre className="bg-surface-100 rounded-md text-xs p-3 mb-2">
                {`<script>
    console.log('Welcome, {{member.name}}!')
</script>`}
              </pre>
              <p>
                You can use <Key>Cmd/Ctrl</Key> + <Key>Space</Key> for
                autocomplete.
              </p>
            </Card.Content>
          </Card>
        </Accordion.Panel>
      </Accordion>
      <div className="space-y-8">
        <CustomCodeHead app={app} />
        <CustomCodeBody app={app} />
      </div>
    </>
  )
}
