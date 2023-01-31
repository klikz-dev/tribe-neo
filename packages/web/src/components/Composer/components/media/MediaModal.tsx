import { useState, useEffect } from 'react'

import DownloadIcon from '@heroicons/react/outline/DownloadIcon'
import '../../styles/carousel.css'
import { Carousel } from 'react-responsive-carousel'
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { XIcon } from '@tribeplatform/react-ui-kit/icons'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { downloadFile } from '../../utils/url.utils'

export interface Slide {
  type: string
  node: any
}

interface MediaModalProps {
  isVisible?: boolean
  handleModalClose: () => void
  activeMediaIndex: number
  slides: Slide[]
}

export const MediaModal = ({
  slides,
  isVisible = false,
  handleModalClose,
  activeMediaIndex,
}: MediaModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeMediaIndex)
  const length = slides?.length
  const isPreviousButtonEnabled = currentIndex > 0
  const isNextButtonEnabled = currentIndex < length - 1

  const handleDownload = () => {
    const imageObject = slides[currentIndex]
    const src = imageObject?.node?.attribs?.src
    if (!src) return

    downloadFile(src)
  }

  useEffect(() => {
    setCurrentIndex(activeMediaIndex)
  }, [activeMediaIndex])

  return (
    <Modal
      size="full"
      open={isVisible}
      onClose={handleModalClose}
      className="flex-col flex"
    >
      <div className="px-4 py-5 sm:px-6 flex items-center justify-end border-b border-neutral-200">
        <button
          type="button"
          className="mr-3  bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
        >
          <DownloadIcon className="w-6 h-6" onClick={handleDownload} />
        </button>
        <button
          type="button"
          className="bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
          onClick={handleModalClose}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Modal.Content className="flex items-center justify-center space-x-3 px-0 py-0 sm:p-0">
        {length > 1 && (
          <Button
            variant="outline"
            rounded
            onClick={() =>
              isPreviousButtonEnabled && setCurrentIndex(currentIndex - 1)
            }
            disabled={!isPreviousButtonEnabled}
            leadingIcon={<ArrowLeftLineIcon />}
          />
        )}

        <div className="max-h-screen">
          <Carousel
            selectedItem={currentIndex}
            dynamicHeight={false}
            showStatus={false}
            showThumbs={false}
            showIndicators
            showArrows={false}
            transitionTime={200}
            useKeyboardArrows
          >
            {slides.map(slide => {
              const src = slide.node?.attribs?.src

              // Other types like video will be added later.
              return (
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: 'calc(100vh - 200px)',
                  }}
                  key={src}
                >
                  <img
                    src={src}
                    className="object-contain max-h-full"
                    alt=""
                    loading="lazy"
                  />
                </div>
              )
            })}
          </Carousel>
        </div>

        {length > 1 && (
          <Button
            variant="outline"
            rounded
            onClick={() =>
              isNextButtonEnabled && setCurrentIndex(currentIndex + 1)
            }
            disabled={!isNextButtonEnabled}
            leadingIcon={<ArrowRightLineIcon />}
          />
        )}
      </Modal.Content>
    </Modal>
  )
}
