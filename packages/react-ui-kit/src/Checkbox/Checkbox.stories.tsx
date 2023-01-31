import { Checkbox } from './Checkbox'

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
}

export const Template = (args: any) => <Checkbox {...args}>Comments</Checkbox>

Template.args = {
  invalid: false,
  disabled: false,
}

export const Disabled = (args: any) => (
  <Checkbox {...args} disabled>
    Comments
  </Checkbox>
)
export const WithValidationError = (args: any) => (
  <Checkbox {...args} invalid>
    Comments
  </Checkbox>
)

export const ListWithDescription = (args: any) => (
  <fieldset className="space-y-5">
    <legend className="sr-only">Notifications</legend>

    <Checkbox id="comments" name="comments" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Comments</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when someones posts a comment on a posting.
        </p>
      </div>
    </Checkbox>

    <Checkbox id="candidates" name="candidates" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Candidates</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when a candidate applies for a job.
        </p>
      </div>
    </Checkbox>

    <Checkbox id="offers" name="offers" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Offers</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when a candidate accepts or rejects an offer.
        </p>
      </div>
    </Checkbox>
  </fieldset>
)

export const ListWithCheckboxOnRight = (args: any) => (
  <fieldset className="space-y-5">
    <legend className="sr-only">Notifications</legend>

    <Checkbox id="comments" name="comments" placement="end" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Comments</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when someones posts a comment on a posting.
        </p>
      </div>
    </Checkbox>

    <Checkbox id="candidates" name="candidates" placement="end" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Candidates</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when a candidate applies for a job.
        </p>
      </div>
    </Checkbox>

    <Checkbox id="offers" name="offers" placement="end" {...args}>
      <div className="text-sm">
        <div className="font-medium text-basicSurface-700">Offers</div>
        <p id="comments-description" className="text-basicSurface-500">
          Get notified when a candidate accepts or rejects an offer.
        </p>
      </div>
    </Checkbox>
  </fieldset>
)
