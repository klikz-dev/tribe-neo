import {
  PostListFilterByEnum,
  PostListFilterByOperator,
} from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'

import { dayjs } from '../../../lib/dayjs'

export const FeedFilter = ({
  variables = { orderBy: 'createdAt' },
  onChange,
}) => {
  return (
    <Form
      onChange={e => {
        onChange({
          ...variables,
          ...{
            [e?.target?.name]:
              e?.target?.name === 'limit'
                ? parseInt(e?.target?.value, 10)
                : e?.target?.value,
          },
        })
      }}
      defaultValues={variables}
    >
      <div className="flex flex-col space-y-5">
        <Form.Select
          label="Sort by"
          name="orderBy"
          onChange={value => {
            onChange({ ...variables, ...{ orderBy: value } })
          }}
          items={[
            { value: 'createdAt', text: 'Creation date' },
            { value: 'totalRepliesCount', text: 'Replies count' },
            { value: 'reactionsCount', text: 'Reactions count' },
          ]}
        />
        <Form.Input label="Number of posts" type="number" name="limit" />
        <Form.Select
          label="Created at"
          name="createdAt"
          onChange={value => {
            const filterDate = dayjs().add(-1 * value, 'day')
            onChange({
              ...variables,
              ...{
                filterBy: [
                  {
                    key: PostListFilterByEnum.CREATED_AT,
                    operator: PostListFilterByOperator.GTE,
                    value: JSON.stringify(filterDate.toISOString()),
                  },
                ],
              },
            })
          }}
          items={[
            { value: 1000, text: 'All Time' },
            { value: 30, text: 'Last 30 days' },
            { value: 7, text: 'Last 7 days' },
            { value: 1, text: 'Last 24 hours' },
          ]}
        />
        <Form.Input label="Search for" name="query" />
      </div>
    </Form>
  )
}
