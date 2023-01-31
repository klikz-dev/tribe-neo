import { useEffect, useRef, useState } from 'react'

import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import XIcon from '@heroicons/react/solid/XIcon'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { EMAIL_PATTERN } from '../../lib/validator.utils'
import { ImportFormContext } from './useUserImportForm'
import { isAdminEmailNotConfirmed } from './utils'

export interface EmailNameArrayInputProps {
  name: string
}

export const EmailNameArrayInput: React.FC<EmailNameArrayInputProps> = ({
  name,
}) => {
  const {
    register,
    formState: { errors },
    entries,
    showManyAtOnce,
    appendEntry,
    removeEntry,
  } = useFormContext() as ImportFormContext

  const fieldsContainerRef = useRef<HTMLDivElement>(null)
  const { data: authToken } = useAuthToken()
  const [hoverRowIndex, setHoverRowIndex] = useState<number | undefined>(
    undefined,
  )

  useEffect(() => {
    const container = fieldsContainerRef.current

    // Focus on first the input element
    setTimeout(
      () =>
        (
          container?.firstElementChild?.firstElementChild
            ?.firstElementChild as HTMLElement
        )?.focus?.(),
      0,
    )
  }, [])

  const adminEmailNotConfirmed = isAdminEmailNotConfirmed(authToken.member)

  return (
    <div>
      <div className="max-h-96 overflow-y-auto p-2 -mx-2">
        <div ref={fieldsContainerRef}>
          {entries?.fields?.map((item, index) => {
            const fieldName = `${name}.${index}`
            return (
              <div
                className={clsx(
                  'group grid grid-cols-11 gap-2 p-2 -mx-2 rounded-md items-start ',
                  hoverRowIndex === index
                    ? 'hover:bg-danger-100'
                    : 'hover:bg-surface-100',
                  adminEmailNotConfirmed && 'pointer-events-none',
                )}
                key={item.id}
              >
                <div className="col-span-5">
                  <FormControl.Input
                    placeholder="Email address"
                    data-testid={`${fieldName}.email`}
                    {...register(`${fieldName}.email`, {
                      required: "This field can't be empty",
                      pattern: {
                        value: EMAIL_PATTERN,
                        message: 'Invalid email address',
                      },
                    })}
                    // defaultValue={item.email}
                    error={errors?.[name]?.[index]?.email?.message}
                    invalid={!!errors?.[name]?.[index]?.email?.message}
                  />
                </div>

                <div className="col-span-5">
                  <FormControl.Input
                    data-testid={`${fieldName}.name`}
                    // defaultValue={item.name}
                    placeholder="Name (optional)"
                    {...register(`${fieldName}.name`)}
                  />
                </div>

                <div
                  className="cursor-pointer pt-2"
                  onClick={() => removeEntry(index)}
                  data-testid={`${fieldName}.remove`}
                  onMouseLeave={() => {
                    setHoverRowIndex(undefined)
                  }}
                  onMouseEnter={() => {
                    setHoverRowIndex(index)
                  }}
                >
                  <XIcon className="w-5 h-5" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        className={clsx(
          'text-sm',
          adminEmailNotConfirmed && 'pointer-events-none',
        )}
      >
        <Link onClick={appendEntry}>
          <PlusCircleIcon className="w-6 h-6 mr-2 inline" />
          Add another
        </Link>{' '}
        or <Link onClick={showManyAtOnce}>multiple at once</Link>
      </div>
    </div>
  )
}
