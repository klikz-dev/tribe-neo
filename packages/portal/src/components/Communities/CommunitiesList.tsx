import { FC } from 'react'

import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { Image, PluralNetwork, RoleType } from '@tribeplatform/gql-client/types'
import { useGlobalNetworks } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Accordion } from '@tribeplatform/react-ui-kit/Accordion'
import { ActionPanel } from '@tribeplatform/react-ui-kit/ActionPanel'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'
import { Container, List } from '@tribeplatform/react-ui-kit/Layout'

import { getRuntimeConfigVariable } from '../../config'

export const CommunitiesList: FC = () => {
  const { data, isFetching } = useGlobalNetworks({
    fields: { logo: 'basic' },
    variables: {
      limit: 20,
      roleType: RoleType.ADMIN,
    },
  })
  const { nodes: networks } = simplifyPaginatedResult<PluralNetwork>(data)

  return (
    <Container size="sm" className="mt-10">
      <div className="space-y-5">
        <Card>
          <Card.Header title="Your communities" />
          <Card.Content>
            <List spacing="sm" divider>
              {networks.map(network => (
                <List.Item key={network.name}>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://${network.domain}`}
                    className="hover:bg-surface-100 p-3 rounded-md block -ml-3 -mr-3"
                  >
                    <div className="flex justify-between group">
                      <div className="flex flex-grow items-center">
                        <div>
                          <Avatar
                            name={network.name}
                            size="lg"
                            src={(network.globalFavicon as Image)?.urls?.thumb}
                            rounded={false}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-basicSurface-700">
                            {network.name}
                          </p>
                          <p className="text-sm text-basicSurface-500">
                            {network.domain}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center">
                        <ChevronRightIcon className="w-6 h-6 text-basicSurface-300" />
                      </div>
                    </div>
                  </a>
                </List.Item>
              ))}
              {!networks.length && !isFetching ? (
                <div className="mb-8">
                  <EmptyState
                    title="Nothing here!"
                    description="You don't have any communities."
                    icon={<DocumentIcon />}
                  >
                    <Button
                      as="a"
                      target="_blank"
                      // rel="noreferrer noopener"
                      href="https://tribe.so/create"
                    >
                      Create your tribe
                    </Button>
                  </EmptyState>
                </div>
              ) : null}

              {!isFetching && (
                <Accordion className="pt-3">
                  <Accordion.Button>
                    Can&apos;t find your community?
                  </Accordion.Button>
                  <Accordion.Panel>
                    <p>
                      This list only includes the communities that you&apos;re
                      an admin of. Also, if you&apos;ve created your Tribe
                      community before May 21, 2021 (Tribe 1.0) it will not be
                      listed above.
                    </p>
                  </Accordion.Panel>
                </Accordion>
              )}
            </List>
          </Card.Content>
        </Card>

        <ActionPanel
          title="Tribe for Developers"
          placement="trailing-top"
          description="Build apps on top of the Tribe Platform."
        >
          <Button
            as="a"
            variant="outline"
            href={getRuntimeConfigVariable('PORTAL_AUTHORIZED_REDIRECT_URL')}
            target="_blank"
            // rel="noreferrer noopener"
            size="lg"
          >
            Open developer portal
          </Button>
        </ActionPanel>
      </div>
    </Container>
  )
}
