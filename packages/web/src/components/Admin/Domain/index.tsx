import { Card } from '@tribeplatform/react-ui-kit/Card'

import { DomainVerificationForm } from './DomainVerificationForm'
import { NewDomainForm } from './NewDomainForm'

export const Domain = ({ network }) => {
  return (
    <div className="max-w-3xl">
      <Card>
        {network.newDomain ? (
          <DomainVerificationForm network={network} />
        ) : (
          <NewDomainForm network={network} />
        )}
      </Card>
    </div>
  )
}
