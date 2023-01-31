import { FC } from 'react'

import { matchPath } from 'react-router'

import { Page } from '@tribeplatform/gql-client/types'
import { useNetwork } from '@tribeplatform/react-sdk/hooks'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'
import { SlateKitContext, useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { IFrame } from '../../page-builder/IFrame.component'
import { SlateLayout } from '../../page-builder/layouts/layout.enum'
import { LayoutLoader } from '../../page-builder/layouts/LayoutLoader.component'
import { State } from './types'

export const Preview: FC<{ state: State; pages: Page[] }> = ({
  state,
  pages,
}) => {
  const slateKitProps = useSlateKit()
  const { data: network } = useNetwork()

  const isTheme = state.route.path === '/theme'
  const page = pages?.find(page => !!matchPath(state.route.path, page.address))
  const urlParams = matchPath(state.route.path, page?.address)
  const layout = page?.layout || SlateLayout.DEFAULT

  return (
    <SlateKitContext.Provider
      value={{
        ...slateKitProps,
        mode: 'edit',
      }}
    >
      <IFrame
        className="rounded-md w-full h-full shadow-xl overflow-hidden"
        style={{ height: 'calc(100vh - 150px)' }}
        darkMode={false}
        theme={state.theme}
      >
        <LayoutLoader
          Content={
            <SlateRenderer
              slate={page?.slate}
              path={page?.address.path}
              additionalContext={{ urlParams: urlParams?.params }}
            />
          }
          pages={pages}
          navigationSlates={network?.navigationSlates}
          customPage={page}
          customLayoutSlug={layout}
          hideContent={isTheme}
        />
      </IFrame>
    </SlateKitContext.Provider>
  )
}
