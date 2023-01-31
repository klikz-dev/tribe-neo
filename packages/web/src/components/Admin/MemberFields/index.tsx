import { useState } from 'react'

import { Link } from 'react-router-dom'

import {
  CustomFieldType,
  TextTypeOptions,
} from '@tribeplatform/gql-client/types'
import {
  useAddMemberSchemaField,
  useAuthToken,
} from '@tribeplatform/react-sdk/hooks'
import { List } from '@tribeplatform/react-ui-kit/Layout'

import { DraggableList } from '../../DraggableList'
import { MemberAbout } from '../../Member/MemberAbout'
import { MemberHeader } from '../../Member/MemberHeader'

export const MemberFields = () => {
  const {
    data: {
      member,
      network: {
        memberFields: { fields: initialFields },
      },
    },
  } = useAuthToken()

  const [fields, setFields] = useState(initialFields)
  const [highlightedField, setHighlightedField] = useState('')
  const { mutateAsync: addField } = useAddMemberSchemaField()

  const availableFields = [
    {
      name: 'Twitter',
      key: 'twitter',
      description: 'Your twitter URL',
      type: CustomFieldType.TEXT,
      typeOptions: { textType: TextTypeOptions.SHORT_TEXT },
    },
  ]

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const newfields = DraggableList.reorder(
      fields,
      result.source.index,
      result.destination.index,
    )
    setFields(newfields)
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 bg-surface-50 p-5 flex flex-col space-y-5">
        <h4>Member fields</h4>
        <DraggableList id="field-picker" onDragEnd={onDragEnd}>
          {fields.map((field, index) => (
            <DraggableList.Item
              key={field.key}
              id={field.name}
              index={index}
              onMouseEnter={() => setHighlightedField(field.key)}
              onMouseLeave={() => setHighlightedField('')}
            >
              {field.name}
            </DraggableList.Item>
          ))}
        </DraggableList>
        <h4>Available fields</h4>
        <List>
          {availableFields.map(field => {
            return (
              <List.Item key={field.key}>
                <Link
                  to="#"
                  onClick={() => {
                    addField({ input: field })
                  }}
                  className="border rounded-md p-2 px-2 mb-2 bg-surface-50 hover:bg-surface-100 flex space-x-2 items-center"
                >
                  {field.name}
                </Link>
              </List.Item>
            )
          })}
        </List>
      </div>
      <div className="col-span-8 p-5 flex flex-col space-y-5">
        <MemberHeader member={member} />
        <MemberAbout
          highlightedField={highlightedField}
          member={member}
          memberFields={fields}
        />
      </div>
    </div>
  )
}
