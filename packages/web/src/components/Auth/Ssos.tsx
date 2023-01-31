import { SsoStatus, SsoType } from '@tribeplatform/gql-client/types'
import {
  useAuthToken,
  useLoginWithSso,
  useSsos,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { getSsoCallbackUrl } from '../../utils/sso'
import { SsoIcon } from './SsoIcons'

export const Ssos = ({ hasDivider }) => {
  const {
    data: { network },
  } = useAuthToken()
  const { data: enabledSsos } = useSsos({
    variables: { status: SsoStatus.ENABLE },
  })
  const { login } = useLoginWithSso()
  const query = useQuery()

  const onClick = async type => {
    const callbackUrl = getSsoCallbackUrl(type, network.domain, query.redirect)

    const response = await login({
      input: {
        type,
        callbackUrl,
      },
    })

    window.location.href = response.url
  }
  const enabledVisibleSsos = enabledSsos?.filter(
    sso => sso.type !== SsoType.JWT,
  )
  if (!enabledVisibleSsos?.length) return null

  return (
    <>
      {hasDivider ? <Divider>Or continue with</Divider> : null}
      <div className="grid grid-cols-1 gap-3">
        {enabledSsos.map(({ name, buttonText, type }) => (
          <Button
            href="#"
            onClick={() => onClick(type)}
            className="justify-center"
            key={type}
            variant="outline"
            size="lg"
            leadingIcon={
              SsoIcon[type] && <span className="mr-2">{SsoIcon[type]}</span>
            }
          >
            {buttonText || name}
          </Button>
        ))}
      </div>
    </>
  )
}
