import { useState } from 'react'

import clsx from 'clsx'

import { RadioGroup } from './RadioGroup'

export default {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
}

export const Template = (args: any) => {
  const [selected, setSelected] = useState('public')

  return (
    <RadioGroup value={selected} onChange={setSelected} {...args}>
      <RadioGroup.Items>
        <RadioGroup.Item value="public" title="Public access" />
        <RadioGroup.Item
          value="private-members"
          title="Private to Project Members"
        />
        <RadioGroup.Item value="private-you" title="Private to you" />
      </RadioGroup.Items>
    </RadioGroup>
  )
}

Template.args = {
  invalid: false,
  disabled: false,
}

export const DisabledRadioGroup = () => {
  const [selected, setSelected] = useState('public')

  return (
    <RadioGroup
      value={selected}
      onChange={newValue => setSelected(newValue)}
      disabled
    >
      <RadioGroup.Items>
        <RadioGroup.Item value="public" title="Public access" />
        <RadioGroup.Item
          value="private-members"
          title="Private to Project Members"
        />
        <RadioGroup.Item value="private-you" title="Private to you" />
      </RadioGroup.Items>
    </RadioGroup>
  )
}

export const DisabledItem = () => {
  const [selected, setSelected] = useState('public')

  return (
    <RadioGroup value={selected} onChange={newValue => setSelected(newValue)}>
      <RadioGroup.Items>
        <RadioGroup.Item value="public" title="Public access" />
        <RadioGroup.Item
          value="private-members"
          title="Private to Project Members"
          disabled
        />
        <RadioGroup.Item value="private-you" title="Private to you" />
      </RadioGroup.Items>
    </RadioGroup>
  )
}

export const WithDescription = (args: any) => {
  const [selected, setSelected] = useState('public')

  return (
    <RadioGroup value={selected} onChange={setSelected} {...args}>
      <RadioGroup.Items>
        <RadioGroup.Item
          value="public"
          title="Public access"
          description="This project would be available to anyone who has the link"
        />
        <RadioGroup.Item
          value="private-members"
          title="Private to Project Members"
          description="Only members of this project would be able to access"
        />
        <RadioGroup.Item
          value="private-you"
          title="Private to you"
          description="You are the only one able to access this project"
        />
      </RadioGroup.Items>
    </RadioGroup>
  )
}

export const WithLongDescription = (args: any) => {
  const [selected, setSelected] = useState('public')

  return (
    <RadioGroup value={selected} onChange={setSelected} {...args}>
      <RadioGroup.Items>
        <RadioGroup.Item
          value="public"
          title="Public access"
          description="This project would be available to anyone who has the link"
        />
        <RadioGroup.Item
          value="private-members"
          title="Private to Project Members"
          description="Only members of this project would be able to access"
        />
        <RadioGroup.Item
          value="private-you"
          title="Private to you"
          description="
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo."
        />
      </RadioGroup.Items>
    </RadioGroup>
  )
}

const plans = [
  {
    name: 'Hobby',
    ram: '8GB',
    cpus: '4 CPUs',
    disk: '160 GB SSD disk',
    price: '$40',
  },
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '256 GB SSD disk',
    price: '$80',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
    price: '$160',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
    price: '$240',
  },
]

const PlanDetails = (props: {
  plan: { disk: string; cpus: string; price: string; name: string; ram: string }
  checked: boolean
}) => (
  <>
    <div className="flex items-center">
      <div className="text-sm">
        <div className="font-medium text-basicSurface-900">
          {props.plan.name}
        </div>
        <div className="text-basicSurface-500">
          <p className="sm:inline">
            {props.plan.ram} / {props.plan.cpus}
          </p>{' '}
          <span className="hidden sm:inline sm:mx-1" aria-hidden="true">
            &middot;
          </span>{' '}
          <p className="sm:inline">{props.plan.disk}</p>
        </div>
      </div>
    </div>
    <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
      <div className="font-medium text-basicSurface-900">
        {props.plan.price}
      </div>
      <div className="ml-1 text-basicSurface-500 sm:ml-0">/mo</div>
    </div>
    <div
      className={clsx(
        props.checked ? 'border-actionPrimary-500' : 'border-transparent',
        'absolute -inset-px rounded-lg border-2 pointer-events-none',
      )}
      aria-hidden="true"
    />
  </>
)

export const StackedCards = (args: any) => {
  const [selected, setSelected] = useState(plans[0])

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      variant="stacked-cards"
      {...args}
    >
      <RadioGroup.Items>
        {plans.map(plan => (
          <RadioGroup.Item key={plan.name} value={plan}>
            {({ checked }) => <PlanDetails plan={plan} checked={checked} />}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Items>
    </RadioGroup>
  )
}
