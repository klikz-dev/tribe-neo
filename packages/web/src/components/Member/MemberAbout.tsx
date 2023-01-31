import EyeOffIcon from '@heroicons/react/outline/EyeOffIcon'
import dayjs from 'dayjs'

import { MemberFields } from '@tribeplatform/gql-client/graphql'
import { Member } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'
import { useSlate } from '@tribeplatform/slate-kit/hooks'

export const PrivacyBadge = ({ field }) => {
  if (field?.private)
    return (
      <Tooltip>
        <Tooltip.Trigger>
          <EyeOffIcon className="text-basicSurface-400 w-4 h-4" />
        </Tooltip.Trigger>
        <Tooltip.Panel>
          This field is only visible to community admins and moderators.
        </Tooltip.Panel>
      </Tooltip>
    )
  return null
}

export const MemberAbout = ({
  member,
  memberFields,
  highlightedField,
}: {
  member: Member
  memberFields: MemberFields
  highlightedField: string
}) => {
  const { context } = useSlate()
  const { network } = context
  const networkMemberFields =
    memberFields || network?.memberFields?.fields || []

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg leading-6 font-medium text-basicSurface-900">
          About
        </h3>
      </Card.Header>
      <Card.Content>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
          {member?.tagline ? (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-basicSurface-500">
                Tagline
              </dt>
              <dd className="mt-1 text-sm text-basicSurface-900">
                {member?.tagline}
              </dd>
            </div>
          ) : null}
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-basicSurface-500">
              Member since
            </dt>
            <dd className="mt-1 text-sm text-basicSurface-900">
              {dayjs(member.createdAt).toDate().toLocaleDateString()}
            </dd>
          </div>
          {member?.email ? (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-basicSurface-500 flex space-x-1 items-center">
                <span>Email</span>
                <PrivacyBadge field={{ private: true }} />
              </dt>
              <dd className="mt-1 text-sm text-basicSurface-900">
                <Link
                  href={`mailto:${member.email}`}
                  target="_blank"
                  external
                  variant="neutral"
                >
                  {member.email}
                </Link>
              </dd>
            </div>
          ) : null}
          {false &&
            networkMemberFields &&
            networkMemberFields.map(networkField => {
              let field = member?.fields?.fields?.find(
                f => f.key === networkField.key,
              )
              if (!field) field = { key: networkField.key, value: 'Lorem' }
              let { value } = field
              if (!value) value = 'Lorem ipsum'

              let className = 'sm:col-span-1'
              if (networkField.type === 'multiselect') {
                value = value
                  .map(option => {
                    const item = networkField?.settings?.options.find(
                      o => o.key === option,
                    )
                    return item?.text || ''
                  })
                  .join(', ')
              } else if (networkField.type === 'date') {
                if (networkField?.settings?.view === 'datetime')
                  value = dayjs(field.value).toDate().toLocaleString()
                else value = dayjs(field.value).toDate().toLocaleDateString()
              } else if (networkField.type === 'text') {
                if (networkField?.settings?.view === 'longtext') {
                  className = 'sm:col-span-2'
                } else if (networkField?.settings?.view === 'url') {
                  value = (
                    <Link
                      href={value}
                      target="_blank"
                      external
                      variant="neutral"
                    >
                      {value}
                    </Link>
                  )
                }
              }
              return (
                <div
                  className={`${className} ${
                    highlightedField === field.key
                      ? 'ring-2 rounded-sm ring-offset-surface-50 ring-offset-8 ring-actionPrimary-500'
                      : ''
                  }`}
                  key={field.key}
                >
                  <dt className="text-sm font-medium text-basicSurface-500 flex space-x-1 items-center">
                    <span>{networkField.name}</span>
                    <PrivacyBadge field={networkField} />
                  </dt>
                  <dd className="mt-1 text-sm text-basicSurface-900">
                    {value}
                  </dd>
                </div>
              )
            })}
        </dl>
      </Card.Content>
    </Card>
  )
}
