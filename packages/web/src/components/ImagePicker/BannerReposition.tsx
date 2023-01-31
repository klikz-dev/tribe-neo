import { useEffect, useRef, useState } from 'react'

import Cropper from 'react-easy-crop'

import { Image } from '@tribeplatform/gql-client/types'
import { Button, ButtonGroup } from '@tribeplatform/react-ui-kit/Button'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'

export const BannerReposition: React.FC<{
  edit: boolean
  banner: Image
  loading?: boolean
  save: (crop: { x: number; y: number }) => void
  cancel: () => void
}> = ({ banner, save, cancel, edit = false, children, loading }) => {
  const containerRef = useRef<HTMLDivElement>()
  const [cropSize, setCropSize] = useState<
    { height: number; width: number } | undefined
  >()
  const [crop, setCrop] = useState({
    x: banner?.cropX || 0,
    y: banner?.cropY || 0,
  })

  // update on banner change
  useEffect(() => {
    if (banner?.id) {
      setCrop({
        x: banner?.cropX || 0,
        y: banner?.cropY || 0,
      })
    }
  }, [banner?.cropY, banner.cropX, banner.id, setCrop])

  return (
    <div className="h-32 w-full lg:h-48" ref={containerRef}>
      <Cropper
        image={banner?.urls?.large || banner?.url}
        crop={crop}
        zoom={banner?.cropZoom || 1}
        onCropChange={props => {
          // we should let this function handle the setCrop to maintain the responsiveness on the smaller devices
          setCrop(props)

          // setting the cropper size on window-resize/crop resize
          setCropSize({
            height: containerRef?.current?.offsetHeight,
            width: containerRef?.current?.offsetWidth,
          })
        }}
        objectFit="horizontal-cover"
        cropSize={cropSize}
        showGrid={false}
        style={{
          cropAreaStyle: {
            border: 'none',
            boxShadow: 'none',
          },
        }}
        classes={{
          containerClassName: edit ? '' : 'cursor-default pointer-events-none',
        }}
      />
      {loading && (
        <div
          className="flex justify-center opacity-100 text-white text-2xl w-44 py-1.5 px-5 pointer-events-none absolute rounded-sm"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            left: 'calc(50% - 90px)',
            top: 'calc(50% - 10px)',
          }}
        >
          <SpinnerIcon className="animate-spin" />
        </div>
      )}
      {edit && (
        <>
          <div
            className="text-center opacity-100 text-white text-xs w-44 py-1.5 px-5 pointer-events-none absolute rounded-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              left: 'calc(50% - 90px)',
              top: 'calc(50% - 10px)',
            }}
          >
            Drag image to reposition
          </div>
          <div className="absolute bottom-5 right-5 z-10">
            <ButtonGroup size="sm">
              <Button
                onClick={() => {
                  setCrop({
                    x: banner.cropX,
                    y: banner.cropY,
                  })
                  cancel()
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => save(crop)}>Save position</Button>
            </ButtonGroup>
          </div>
        </>
      )}
      {!edit && children}
    </div>
  )
}
