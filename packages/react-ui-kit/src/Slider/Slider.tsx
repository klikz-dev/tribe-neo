import { FC } from 'react'

import clsx from 'clsx'
import { getTrackBackground, Range } from 'react-range'

export type SliderProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  step?: number
  min?: number
  max?: number
}

export const Slider: FC<SliderProps> = props => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
    value = undefined,
    disabled,
    step = 1,
    min = 0,
    max = 100,
    onChange,
    ...rest
  } = props

  const values = value ? [value] : [0]

  const renderTrack = ({ props, children }) => {
    return (
      <div
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
        style={props.style}
        className={clsx(
          'w-full flex items-center h-7',
          disabled && 'opacity-60 cursor-default pointer-events-none',
        )}
      >
        <div
          ref={props.ref}
          className={clsx(
            'w-full h-1 rounded-md',
            disabled && 'opacity-60 cursor-default pointer-events-none',
          )}
          style={{
            background: getTrackBackground({
              values,
              colors: [
                'var(--tribe-color-actionPrimary-500)',
                'var(--tribe-color-surface-500)',
              ],
              min,
              max,
            }),
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  const renderThumb = ({ props }) => (
    <div
      {...props}
      className={clsx(
        'w-5 h-5  transform translate-x-10 rounded-full',
        'flex items-center justify-center',
        'bg-actionPrimary-500',
        'focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-actionPrimary-500',
      )}
    />
  )

  return (
    <Range
      min={min}
      max={max}
      step={step}
      values={values}
      onChange={values => {
        onChange(values?.[0])
      }}
      disabled={disabled}
      renderTrack={renderTrack}
      renderThumb={renderThumb}
      {...rest}
    />
  )
}
