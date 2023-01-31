import { ChangePassword } from './ChangePassword'
import { Devices } from './Devices'

export const SecuritySettings = () => {
  return (
    <div className="flex flex-col space-y-5">
      <ChangePassword />
      {false && <Devices />}
    </div>
  )
}
