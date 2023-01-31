import { useMemo } from 'react'

import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon'

import { DomainTransferStatus } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import {
  useClearNewDomain,
  useNewDomainStatus,
  useTransferToNewDomain,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Table } from '@tribeplatform/react-ui-kit/Table'
import { toast } from '@tribeplatform/react-ui-kit/Toast'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

const getInstructions = (domainStatus: DomainTransferStatus) => {
  const data: {
    type: string
    host: string
    target: string
    value: string
    success: boolean
  }[] = []

  if (!domainStatus) return data

  if (domainStatus?.root) {
    data.push({
      type: 'A',
      host: '@',
      value: domainStatus?.arecords.join(', '),
      success: domainStatus?.arecordSuccess,
      target: domainStatus?.tribeARecords[0],
    })
  }

  data.push({
    type: 'CNAME',
    host: (domainStatus?.root ? 'www.' : '') + domainStatus?.domain,
    value: domainStatus?.cnames.join(', '),
    success: domainStatus?.cnameSuccess,
    target: domainStatus?.tribeCname,
  })

  if (!domainStatus?.aaaarecordSuccess) {
    data.push({
      type: 'AAAA',
      host: '@',
      value: domainStatus?.aaaarecords.join(', '),
      success: domainStatus?.aaaarecordSuccess,
      target: 'Delete this record',
    })
  }

  return data
}

export const DomainVerificationForm = ({ network }) => {
  const { mutate: clearDomainName, isLoading: isClearingDomainName } =
    useClearNewDomain()
  const { mutateAsync: transferDomain, isLoading: isTransferring } =
    useTransferToNewDomain()

  const {
    data: newDomainStatus,
    refetch,
    isLoading,
    isFetching,
  } = useNewDomainStatus({
    variables: { domain: network.newDomain },
    useQueryOptions: {
      refetchOnMount: 'always',
    },
  })

  const instructions = useMemo(
    () => getInstructions(newDomainStatus),
    [newDomainStatus],
  )

  return (
    <Form
      defaultValues={{
        newDomain: network.newDomain,
      }}
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Card.Header title="Domain" />
      <Card.Content>
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-5">
          <Form.Input
            name="newDomain"
            label="New domain or subdomain"
            disabled
          />
        </div>
      </Card.Content>
      <Card.Actions>
        {newDomainStatus?.success ? (
          <Button
            loading={isTransferring}
            onClick={() => {
              transferDomain()
                .then(() => {
                  toast({
                    title: 'Domain transferred successfully',
                    status: 'success',
                  })
                  window.location.href = `https://${newDomainStatus.domain}`
                })
                .catch(() => {
                  toast({
                    title: 'Domain transfer failed',
                    status: 'error',
                  })
                })
            }}
          >
            Move your community
          </Button>
        ) : (
          <Button
            loading={isLoading || isFetching}
            onClick={() => {
              refetch()
                .then(() => {
                  toast({
                    title: 'Domain status updated',
                    status: 'success',
                  })
                })
                .catch(() => {
                  toast({
                    title: 'Domain status update failed',
                    status: 'error',
                  })
                })
            }}
          >
            Recheck settings
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => {
            clearDomainName()
          }}
          loading={isClearingDomainName}
        >
          Cancel
        </Button>
      </Card.Actions>
      <Card.Content className="pt-0 sm:pt-0">
        <article>
          <p>
            <strong>Follow the instruction to complete transfer</strong>
          </p>
          <p>
            For this to work, you need to add the following settings in your DNS
            provider panel.
          </p>
        </article>
        <div className="py-5">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Host/Name</Table.HeaderCell>
                <Table.HeaderCell>Target/Value</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {instructions.map(row => (
                <Table.Row key={row.host}>
                  <Table.Cell>{row.type}</Table.Cell>
                  <Table.Cell>{row.host}</Table.Cell>
                  <Table.Cell>{row.target}</Table.Cell>
                  <Table.Cell>
                    {row.success ? (
                      <CheckCircleIcon className="text-success-500 w-5 h-5" />
                    ) : (
                      <Tooltip>
                        <Tooltip.Trigger>
                          <InformationCircleIcon className="text-warning-500 w-5 h-5" />
                        </Tooltip.Trigger>
                        <Tooltip.Panel>
                          {row.value
                            ? `Current target/value is incorrect: ${row.value}`
                            : `No target/value is set currently`}
                        </Tooltip.Panel>
                      </Tooltip>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <article>
          {newDomainStatus?.success ? (
            <p>
              All looks good, click on &ldquo;Move your community&rdquo; button
              to finish the transfer.
            </p>
          ) : (
            <p>
              If you’ve already done this, click on &ldquo;Recheck
              settings&rdquo; button to get the green check.
            </p>
          )}
        </article>
      </Card.Content>
    </Form>
  )
}
