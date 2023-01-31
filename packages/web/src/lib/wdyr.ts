/* eslint-disable global-require */
import { RuntimeConfigs } from '../config'

if (RuntimeConfigs.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    exclude: [
      // FileDrop is wrapped around Tiptap which updates on every input
      /^FileDrop/,
    ],
  })
}
