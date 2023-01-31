import { FC } from 'react'

import DocumentIcon from '@heroicons/react/outline/DocumentIcon'
import { useLocation } from 'wouter'

import { PluralNetwork, RoleType } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import {
  useGlobalCreateApp,
  useGlobalNetworks,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'
import { Link } from '@tribeplatform/react-ui-kit/Link'

export interface CreateAppModalProps {
  onClose: () => void
}

export const CreateAppModal: FC<CreateAppModalProps> = ({ onClose }) => {
  const { mutateAsync: createApp, isLoading } = useGlobalCreateApp({
    fields: 'basic',
  })
  const [, setLocation] = useLocation()

  const { data, isLoading: isLoadingNetworks } = useGlobalNetworks({
    variables: {
      limit: 20,
      roleType: RoleType.ADMIN,
    },
  })
  const { nodes: networks } = simplifyPaginatedResult<PluralNetwork>(data)

  const onCreate = () => {
    window.open('https://tribe.so/create', '_blank')
  }

  if (!isLoadingNetworks && networks.length === 0) {
    return (
      <EmptyState
        title="You are not an admin of any communities"
        description="In order to create an app, please first create a community"
        icon={<DocumentIcon />}
      >
        <div className=" sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
          <Button onClick={onCreate} variant="primary">
            Create your tribe
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </EmptyState>
    )
  }

  return (
    <Form
      onSubmit={async data => {
        return createApp(
          {
            input: {
              name: data.appName,
              networkId: data.networkId,
              slug: data.slug,
            },
          },
          {
            onSuccess: app => {
              onClose()
              setLocation(`/apps/${app.slug}/information`)
            },
          },
        )
      }}
      className="space-y-4"
    >
      <div>
        By creating a Custom API Application, you agree to Tribe’s&nbsp;
        <Link href="https://tribe.so/terms-of-service" target="_blank">
          Terms of Service
        </Link>
        &nbsp;and&nbsp;
        <Link href="https://tribe.so/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
      </div>
      <Form.Input
        label="App name"
        name="appName"
        placeholder="e.g. Super App"
        helperText="You’ll be able to change this later"
        validation={{ required: 'Please enter a name' }}
      />
      <Form.Input
        label="Slug"
        name="slug"
        helperText="Slug is a human readable identifier. You will not be able to change this in the future"
        validation={{ required: 'Please enter a slug' }}
        placeholder="e.g. super-app"
      />
      <Form.Select
        label="Community"
        placeholder="Select a community..."
        name="networkId"
        items={networks?.map(networks => {
          return { value: networks.id, text: networks.name }
        })}
        helperText="You’ll be able to change this later or distribute it to multiple communities"
        validation={{ required: 'Please select a community' }}
      />
      <div className=" sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
        <Button type="submit" variant="primary" loading={isLoading}>
          Create app
        </Button>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
      </div>
    </Form>
  )
}
