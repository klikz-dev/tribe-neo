import { useState } from 'react'

import { SketchPicker } from 'react-color'
import { usePopper } from 'react-popper'

import { Portal } from '@tribeplatform/react-ui-kit/Portal'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

import { availableColors } from '../../../themes/colors/available-colors'
import { Theme } from '../../../themes/types'
import { createColorGroup } from '../../../themes/utils'
import { ColorCircle } from './ColorCircle'

type ColorPickerProps = {
  theme: Theme
  setThemeUpdates: (props) => void
  colorName: string
  title: string
  dark?: boolean
  background?: boolean
  variants?: string[]
}

export const ColorCirclePicker = ({
  theme,
  setThemeUpdates,
  colorName,
  title,
  dark = false,
  background = false,
  variants = [],
}: ColorPickerProps) => {
  const [show, setShow] = useState<boolean>(false)

  const colorKey = dark ? 'dark' : 'light'
  let pickerShade = dark ? 400 : 500
  if (background) {
    pickerShade = dark ? 900 : 50
  }
  const color = theme.colors[colorKey][colorName]

  const availableColorsMapper = {}
  Object.keys(availableColors).forEach(key => {
    availableColorsMapper[availableColors[key][pickerShade]] =
      availableColors[key]
  })

  const updateColor = newColor =>
    setThemeUpdates(updates => ({
      ...updates,
      colors: {
        ...updates?.colors,
        [colorKey]: {
          ...(updates?.colors || {})[colorKey],
          [colorName]:
            availableColorsMapper[newColor.hex] ||
            createColorGroup(newColor.hex, dark, background),
        },
      },
    }))

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [1, 10] } }],
  })

  return (
    color && (
      <div className="relative">
        <Tooltip>
          <Tooltip.Trigger>
            <ColorCircle
              size="lg"
              color={color[pickerShade]}
              circleRef={setReferenceElement}
              onClick={() => setShow(true)}
              clickable
            />
          </Tooltip.Trigger>
          <Tooltip.Panel>{title}</Tooltip.Panel>
        </Tooltip>

        <Portal>
          {show && (
            <div className="absolute">
              <div
                className="fixed top-0 right-0 left-0 bottom-0"
                onClick={() => setShow(false)}
              />

              <div
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setShow(false)
                  }
                }}
              >
                <SketchPicker
                  color={color[pickerShade]}
                  onChange={updateColor}
                  disableAlpha
                  presetColors={variants}
                />
              </div>
            </div>
          )}
        </Portal>
      </div>
    )
  )
}
