import { useState } from 'react'

import startCase from 'lodash/startCase'

import {
  SsoProvider,
  Sso,
  SsoStatus,
  CustomSsoType,
  SsoType,
} from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useUpdateCustomSso } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { URL_DETECTOR } from '../../../lib/validator.utils'

const getProviderName = (provider: SsoProvider) =>
  startCase(provider).replace(' ', '')

const providers = Object.values(SsoProvider).map(provider => ({
  text: getProviderName(provider),
  value: provider,
}))

export const CustomSso = ({ sso: _sso }: { sso: Sso }) => {
  const [provider, setProvider] = useState<SsoProvider>(null)
  const { mutateAsync: updateCustomSso, isLoading } = useUpdateCustomSso()

  const isCustom = provider === SsoProvider.CUSTOM
  const idpUrlLabel = isCustom
    ? `Identity Provider URL`
    : `${getProviderName(provider)} Domain`

  let sso = _sso
  if (!sso) {
    sso = {
      status: SsoStatus.DISABLE,
      type: SsoType.OAUTH2,
      provider: SsoProvider.AUTH0,
    }
  }

  if (!provider && sso.provider) setProvider(sso.provider)

  return (
    <Card>
      <Card.Header
        title="Single sign-on"
        description={
          <>
            Allow users to register and access the community using their
            existing credentials on your website or application.{' '}
            <Link
              href="https://community.tribe.so/knowledge-base-2-0/post/oauth2-sso-wsQUqc2rI43ulRi"
              external
            >
              Learn more
            </Link>
          </>
        }
      />
      <Card.Content>
        <Form
          defaultValues={{
            ...sso,
            enable: sso.status === SsoStatus.ENABLE,
            scopes: sso.scopes?.join(',') ?? '',
          }}
          onSubmit={data => {
            const scopesArray = data?.scopes
              ? data.scopes.trim().replace(/,$/gi, '').split(',')
              : []
            return updateCustomSso({
              input: {
                provider: data.provider,
                authorizationUrl: data.authorizationUrl,
                buttonText: data.buttonText,
                clientId: data.clientId,
                clientSecret: data.clientSecret,
                idpUrl: data.idpUrl,
                logoutUrl: data.logoutUrl,
                settingsUrl: data.settingsUrl,
                tokenUrl: data.tokenUrl,
                userProfileUrl: data.userProfileUrl,
                scopes: scopesArray,
                status: data?.enable ? SsoStatus.ENABLE : SsoStatus.DISABLE,
                type: CustomSsoType.OAUTH2,
                name: data?.provider,
              },
            }).then(() => {
              toast({
                title: 'OAuth2 settings updated',
                status: 'success',
              })
            })
          }}
          className="flex flex-col space-y-5"
        >
          <Form.Select
            label="SSO Provider"
            placeholder="Select a provider"
            name="provider"
            items={providers}
            onChange={setProvider}
          />
          <Form.Input label="Client ID" name="clientId" />
          <Form.Input label="Client Secret" name="clientSecret" />
          <Form.Input
            label={idpUrlLabel}
            name="idpUrl"
            validation={{
              pattern: {
                value: URL_DETECTOR,
                message: 'Invalid url format',
              },
            }}
          />
          {isCustom && (
            <>
              <Form.Input
                label="Authorization URL"
                name="authorizationUrl"
                validation={{
                  pattern: {
                    value: URL_DETECTOR,
                    message: 'Invalid url format',
                  },
                }}
              />
              <Form.Input
                label="Token URL"
                name="tokenUrl"
                validation={{
                  pattern: {
                    value: URL_DETECTOR,
                    message: 'Invalid url format',
                  },
                }}
              />
              <Form.Input
                label="User Profile URL"
                name="userProfileUrl"
                validation={{
                  pattern: {
                    value: URL_DETECTOR,
                    message: 'Invalid url format',
                  },
                }}
              />
              <Form.Input label="Scopes (Comma Separated)" name="scopes" />
              <Form.Input
                label="Settings Url"
                name="settingsUrl"
                validation={{
                  pattern: {
                    value: URL_DETECTOR,
                    message: 'Invalid url format',
                  },
                }}
              />
              <Form.Input
                label="Logout Url"
                name="logoutUrl"
                validation={{
                  pattern: {
                    value: URL_DETECTOR,
                    message: 'Invalid url format',
                  },
                }}
              />
            </>
          )}
          <Form.Input label="Login Button Text" name="buttonText" />
          <div className="flex justify-between">
            <Form.Toggle label="Enable OAuth2" name="enable" className="flex" />
            <Button variant="primary" type="submit" loading={isLoading}>
              Update
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
