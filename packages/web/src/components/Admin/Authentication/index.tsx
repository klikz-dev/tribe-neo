import {
  DefaultSsoType,
  SsoStatus,
  SsoType,
} from '@tribeplatform/gql-client/types'
import { hasActionPermission } from '@tribeplatform/gql-client'
import {
  useSsos,
  useUpdateDefaultSsoStatus,
  useUpdateJwtSso,
  useUpdateNetwork,
} from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { FacebookLogo, GoogleLogo, LinkedInLogo } from '../../../icons'
import { CustomSso } from './CustomSso'

export const Authentication = ({ network }) => {
  const { mutate: updateNetwork } = useUpdateNetwork()
  const { mutate: updateDefaultSsoStatus } = useUpdateDefaultSsoStatus()
  const { mutate: updateJwtSso } = useUpdateJwtSso()

  const { data: ssos } = useSsos()
  const icons = {
    linkedin: <LinkedInLogo />,
    facebook: <FacebookLogo />,
    google: <GoogleLogo />,
  }

  const defaultSsos = ssos?.filter(
    sso => sso.type !== SsoType.OAUTH2 && sso.type !== SsoType.JWT,
  )

  const { actionPermission } = hasActionPermission(
    network.authMemberProps?.permissions ?? [],
    'updateJwtSso',
  )

  const customSso = ssos?.find(sso => sso.type === SsoType.OAUTH2)
  const jwtSso = ssos?.find(sso => sso.type === SsoType.JWT)

  // You can safely disable one login provider if there are at least two enabled
  const canSafelyDisableLogin =
    ssos?.filter(ssos => ssos.status === SsoStatus.ENABLE).length +
      (network.hideDefaultAuthenticationForm ? 0 : 1) >
    1

  return (
    <div className="max-w-3xl flex flex-col space-y-5">
      <Card>
        <Card.Header title="Email" />
        <Card.Content>
          <FormControl.Toggle
            name="email"
            checked={!network?.hideDefaultAuthenticationForm}
            label="Login &amp; register with email"
            helperText="Allow users to register and access the community with an email and password."
            disabled={
              !canSafelyDisableLogin && !network?.hideDefaultAuthenticationForm
            }
            onChange={value =>
              updateNetwork({
                input: { hideDefaultAuthenticationForm: !value },
              })
            }
          />
        </Card.Content>
      </Card>
      <Card>
        <Card.Header
          title="Social login"
          description={
            <>
              Allow users to register and access the community with social
              accounts.{' '}
              <Link
                href="https://community.tribe.so/knowledge-base-2-0/post/social-login-rb4VOPw9lceOSIx"
                external
              >
                Learn more
              </Link>
            </>
          }
        />
        <Card.Content>
          <List>
            {defaultSsos?.map(sso => {
              const icon = icons[sso.type]
              return (
                <List.Item key={sso.type}>
                  <FormControl.Toggle
                    name={sso.type}
                    checked={sso.status === SsoStatus.ENABLE}
                    disabled={
                      !canSafelyDisableLogin && sso.status === SsoStatus.ENABLE
                    }
                    label={
                      <div className="flex space-x-3 items-center">
                        {icon}
                        <span>Login with {sso.name}</span>
                      </div>
                    }
                    onChange={value => {
                      updateDefaultSsoStatus({
                        sso: sso.type as unknown as DefaultSsoType,
                        status: value ? SsoStatus.ENABLE : SsoStatus.DISABLE,
                      })
                    }}
                  />
                </List.Item>
              )
            })}
          </List>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header title="JWT SSO" />
        <Card.Content>
          <FormControl.Toggle
            name="jwt-sso"
            checked={jwtSso?.status === SsoStatus.ENABLE}
            label="Login using JWT SSO."
            onChange={value => {
              if (!actionPermission?.isAuthorized?.authorized) {
                toast({
                  title: 'JWT SSO is not available on this plan',
                  description: `To be able to use JWT SSO, you need to upgrade your plan to ${actionPermission?.isAuthorized?.requiredPlan}.`,
                  status: 'error',
                })
                return
              }
              updateJwtSso({
                input: { status: value ? SsoStatus.ENABLE : SsoStatus.DISABLE },
              })
            }}
          />
          {jwtSso?.status === SsoStatus.ENABLE ? (
            <div className="py-4 mt-4">
              <FormControl.InputCopy
                label="Private Key"
                name="privateKey"
                readOnly
                value={jwtSso?.clientSecret}
                helperText="You'll need to make a JWT with this private key."
                hidden
              />
            </div>
          ) : null}
        </Card.Content>
      </Card>
      <CustomSso sso={customSso} />
    </div>
  )
}
