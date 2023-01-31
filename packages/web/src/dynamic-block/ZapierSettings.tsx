import { SlateRenderer } from '@tribeplatform/slate-kit/components'
import { LiquidConvertor } from '@tribeplatform/slate-kit/convertors'
import { SlateEditable } from '@tribeplatform/slate-kit/enums'

import { liquid } from './zapier-settings'

export const ZapierSettings = () => {
  // Backend side
  const convertor = new LiquidConvertor(liquid)
  const slate = convertor.toSlateSync({
    variables: { settings: { hasToken: true, apiToken: null } },
    editable: SlateEditable.NONE,
  })
  console.log('slate', slate)

  return <SlateRenderer slate={slate} />
}
