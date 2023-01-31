import { Controller, FormProvider } from 'react-hook-form'

import { PlanName } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'

import { useMemberCapacity } from '../../hooks/useMemberCapacity'
import { CustomMessageInput } from './CustomMessageInput'
import { EmailNameArrayInput } from './EmailNameArrayInput'
import { RoleSelect } from './RoleSelect'
import { SpaceMultipleAutocomplete } from './SpaceMultipleAutocomplete'
import { useUserImportContext } from './UserImportContext'
import { UserImportFormProps, useUserImportForm } from './useUserImportForm'
import { isAdminEmailNotConfirmed } from './utils'

export interface FormProps {
  onCancel: () => void
  onSubmit: (result: UserImportFormProps) => void
}

export const UserImportForm: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  const context = useUserImportContext()
  const { data: authToken } = useAuthToken()
  const {
    didReachLimit,
    isApproachingLimit,
    isLoading: isMemberCapacityLoading,
    memberCapacity,
    memberCapacityDeclared,
    totalInvitationCount,
  } = useMemberCapacity()
  const { data: network } = useAuthToken()
  const plan = network?.subscriptionPlan
  const trial = plan?.trial

  const shouldDisplayMembersCapacity =
    trial ||
    plan?.name === PlanName.BASIC ||
    (plan?.name === PlanName.PLUS && isApproachingLimit) ||
    (plan?.name === PlanName.PLUS && didReachLimit) ||
    (plan?.name === PlanName.PREMIUM && isApproachingLimit) ||
    (plan?.name === PlanName.PREMIUM && didReachLimit) ||
    (plan?.name === PlanName.ENTERPRISE && isApproachingLimit) ||
    (plan?.name === PlanName.ENTERPRISE && didReachLimit)

  const submitDisabled = isAdminEmailNotConfirmed(authToken.member)

  const formMethods = useUserImportForm()
  const {
    form: methods,
    hideManyAtOnce,
    manyAtOnce,
    parseMultipleEmails,
  } = formMethods || {}

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = formMethods.form || {}

  const submit = data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { multipleEmails, ...rest } = data

    // After deleting last entry it's not being reflected in
    // the form's state so we get rid of empty internal entries
    const entries = rest.entries.filter(({ email }) => email)

    onSubmit({ ...rest, entries })
  }

  const invitationsLeft =
    memberCapacity - (memberCapacityDeclared + totalInvitationCount)
  // const planName = enumI18nPlanName(plan?.name)?.toLowerCase()
  const planName = plan?.name

  return (
    <FormProvider {...{ ...methods, ...formMethods }}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col space-y-5">
          {!manyAtOnce ? (
            <>
              <EmailNameArrayInput name="entries" />

              {context && (
                <Controller
                  control={control}
                  name="spaces"
                  defaultValue={context?.defaultSpaces}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl>
                      <FormControl.Label>Spaces to join</FormControl.Label>
                      <SpaceMultipleAutocomplete
                        value={value}
                        onChange={onChange}
                      />
                      {error?.message && (
                        <FormControl.HelperText invalid className="mt-2">
                          {error?.message}
                        </FormControl.HelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{
                    required: "This field can't be empty",
                    validate: {
                      minlength: value =>
                        Array.isArray(value) && value.length > 0,
                    },
                  }}
                />
              )}

              {false && context && (
                <Controller
                  control={control}
                  name="role"
                  defaultValue={context?.defaultRole}
                  render={({
                    field: { onChange, onBlur, value, name },
                    fieldState: { error },
                  }) => (
                    <FormControl>
                      <FormControl.Label>Role</FormControl.Label>
                      <RoleSelect
                        name={name}
                        options={context.roles}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      {error?.message && (
                        <FormControl.HelperText invalid className="mt-2">
                          {error?.message}
                        </FormControl.HelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{
                    required: "This field can't be empty",
                  }}
                />
              )}

              <CustomMessageInput
                register={register}
                errors={errors}
                setValue={setValue}
              />

              <div>
                <div>
                  {/*        {isMemberCapacityLoading && (
                    <Skeleton width={72} height={8} />
                  )} */}

                  {!isMemberCapacityLoading && shouldDisplayMembersCapacity && (
                    <Alert
                      status={didReachLimit ? 'error' : 'warning'}
                      title=""
                    >
                      <strong>{invitationsLeft} invitations</strong> left out of{' '}
                      {memberCapacity} for your {planName} plan
                      {/*          <UpgradeTouchpointLink>
                          <Trans
                            i18nKey="member:upgradeToSendMore"
                            defaults="Upgrade to send more"
                          />
                        </UpgradeTouchpointLink> */}
                    </Alert>
                  )}
                </div>

                <div className="flex space-x-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    data-testid="cancel-import-form"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitDisabled}
                    data-testid="submit-import-form"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <FormControl.Textarea
                label="Enter multiple email addresses"
                helperText="Use commas to separate addresses"
                {...register('multipleEmails')}
                data-testid="invite-modal-multiple-emails-textarea"
                error={errors?.multipleEmails?.message}
              />
              <div className="flex space-x-2 justify-end">
                <Button type="reset" variant="outline" onClick={hideManyAtOnce}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  data-testid="invite-modal-add-invitees-button"
                  onClick={parseMultipleEmails}
                >
                  Add invitees
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
