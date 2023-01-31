import { useState } from 'react'

import { Slider } from './Slider'

export default {
  title: 'Forms/Slider',
  component: Slider,
}

export const Template = (args: any) => {
  const [price, setPrice] = useState(150)
  return (
    <>
      <div>Price: {price}</div>
      <div>From 0 to 1000 with step 1</div>
      <div className="flex space-x-4 items-center">
        <span>$0</span>
        <Slider
          {...args}
          value={price}
          step={1}
          min={0}
          max={1000}
          onChange={setPrice}
        />
        <span>$1000</span>
      </div>
    </>
  )
}

export const Steps = (args: any) => {
  const [volume, setVolume] = useState(50)
  return (
    <>
      <div>Volume: {volume}</div>
      <div>From 0 to 100 with step 10</div>
      <div className="flex space-x-4 items-center">
        <span>0</span>
        <Slider value={volume} step={10} onChange={setVolume} />
        <span>100</span>
      </div>
    </>
  )
}

export const Disabled = () => <Template disabled />
