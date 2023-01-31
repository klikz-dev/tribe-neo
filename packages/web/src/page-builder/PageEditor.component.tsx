import { ReactElement, useState } from 'react'

import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import clsx from 'clsx'
import isEqual from 'react-fast-compare'
import { DeepPartial } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import {
  useAuthToken,
  useCreatePage,
  useUpdatePage,
  useUpdateSlates,
  useUpsertTheme,
} from '@tribeplatform/react-sdk/hooks'
import { BackgroundProvider } from '@tribeplatform/react-ui-kit/BackgroundContext'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'
import { SlateDto } from '@tribeplatform/slate-kit/dtos'
import { SlateKitContext, useSlateKit } from '@tribeplatform/slate-kit/hooks'
import { CompiledSlate } from '@tribeplatform/slate-kit/types'
import {
  compileSlate,
  equals,
  rawSlateToDto,
} from '@tribeplatform/slate-kit/utils'

import { usePreventNavigation } from '../hooks/usePreventNavigation'
import { ThemeConvertor } from '../themes/theme-convertor'
import { useTheme } from '../themes/ThemeProvider.component'
import { Theme } from '../themes/types'
import { ComponentEditor } from './component-editor'
import { defaultPages } from './default-pages'
import { DeviceSizeSelector } from './DeviceSizeSelector.component'
import { EditModeSelector } from './EditModeSelector.component'
import { IFrame } from './IFrame.component'
import { SlateLayout } from './layouts/layout.enum'
import { LayoutLoader } from './layouts/LayoutLoader.component'
import { commitNavigationSlateUpdates } from './navigation-slate-updater'
import { PageSelector } from './PageSelector.component'
import { ThemeEditor } from './theme-editor/ThemeEditor.component'
import { mergePages } from './utils'

const pagesToEdit = ['home', 'explore', 'signup']

export const PageEditor = (): ReactElement => {
  const slateKitProps = useSlateKit()
  const {
    data: { network },
  } = useAuthToken({
    useQueryOptions: {
      isDataEqual: (o, n) => {
        // let's only compare network, networkPublicInfo and member
        const { network: on, networkPublicInfo: onp, member: om } = o
        const { network: nn, networkPublicInfo: nnp, member: nm } = n

        const eq1 = isEqual(on, nn)
        const eq2 = isEqual(onp, nnp)
        const eq3 = isEqual(om, nm)
        return eq1 && eq2 && eq3
      },
    },
  })
  const { theme, darkMode: initialDarkMode } = useTheme()
  const { slateUpdates, activeBlock } = slateKitProps.context

  const [editMode, setEditMode] = useState<'Navigation' | 'Content'>(
    'Navigation',
  )
  const [pageSlug, setPageSlug] = useState<string>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [layout, setLayout] = useState<SlateLayout>()
  const [buttonLoading, setButtonLoading] = useState<number>(0)
  const [screenSize, setScreenSize] = useState<string>('2xl')
  const [themeUpdates, setThemeUpdates] = useState<DeepPartial<Theme>>({})
  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode)

  const { mutate: upsertTheme } = useUpsertTheme()
  const { mutate: updateSlates } = useUpdateSlates()
  const { mutate: createPage } = useCreatePage()
  const { mutate: updatePage } = useUpdatePage()

  const themeConvertor = new ThemeConvertor({
    base: theme,
    theme: themeUpdates,
  })
  const newTheme = themeConvertor.toTheme()

  const pages = mergePages(defaultPages, network?.pages || [])
  const editablePages = pagesToEdit.map(slug =>
    pages?.find(page => page.slug === slug),
  )

  const currentPage = editablePages?.find(p => p.slug === pageSlug)
  const currentLayout = layout || currentPage?.layout || SlateLayout.DEFAULT

  const themeChanged = !equals(theme, newTheme)
  const pageChanged = currentPage && currentLayout !== currentPage?.layout
  const slateChanged =
    slateUpdates &&
    Object.keys(slateUpdates).filter(id => slateUpdates[id]).length > 0
  const updatesAvailable = themeChanged || pageChanged || slateChanged || false

  const onNavigationChange = () => {
    clearChanges()
  }
  usePreventNavigation(updatesAvailable, onNavigationChange)

  const clearPageChanges = () => {
    slateKitProps.setSlateUpdates({})
    slateKitProps.updateActiveBlock()
  }
  const clearChanges = () => {
    clearPageChanges()
    setThemeUpdates({})
    setDarkMode(false)
    setScreenSize('2xl')
  }
  const commitThemeUpdates = () => {
    if (themeChanged) {
      upsertTheme(
        { input: { ...themeConvertor.toNetworkTheme(), active: true } },
        {
          onSuccess: () => {
            setThemeUpdates({})
          },
          onSettled: () => {
            setButtonLoading(value => value - 1)
          },
        },
      )
    } else {
      setButtonLoading(value => value - 1)
    }
  }
  const commitPageUpdates = () => setButtonLoading(value => value - 1)
  const commitSlateUpdates = () => {
    const options = {
      onSettled: () => {
        setButtonLoading(value => value - 1)
      },
      onSuccess: () => {
        slateKitProps.setSlateUpdates({})
        slateKitProps.setActiveBlocks([])
      },
    }
    let rawSlate: CompiledSlate
    let slate: SlateDto
    if (currentPage) {
      rawSlate = compileSlate({
        slate: currentPage.slate,
        slateUpdates:
          slateKitProps.context.slateUpdates[
            Object.keys(slateKitProps.context.slateUpdates)[0]
          ],
      })
      slate = rawSlateToDto({
        id: rawSlate.id,
        rootComponents: rawSlate.rootComponents,
        acceptsAfter: rawSlate.acceptsAfter,
        acceptsBefore: rawSlate.acceptsBefore,
        editable: rawSlate.editable,
        components: Object.values(rawSlate.components),
      })
    }
    switch (editMode) {
      case 'Navigation':
        commitNavigationSlateUpdates(
          updateSlates,
          slateKitProps.context.slateUpdates,
          options,
        )
        return
      case 'Content':
        if (currentPage.id) {
          updatePage(
            {
              id: currentPage.id,
              input: { slate },
            },
            options,
          )
        } else {
          createPage({ input: { ...currentPage, slate } }, options)
        }
        return
      default:
        options.onSettled()
    }
  }

  return (
    <SlateKitContext.Provider
      value={{
        ...slateKitProps,
        mode: 'edit',
      }}
    >
      <>
        <header className="fixed top-0 left-0 right-0 h-16 flex flex-row border-b border-basicSecondary-100 bg-actionSecondary-100">
          <BackgroundProvider backgroundType="secondary">
            <div className="flex-shrink-0 w-16 p-4">
              <Link as={RouterLink} to="/">
                <ArrowLeftIcon className="text-basicSecondary-500" />
              </Link>
            </div>
            <div className="flex flex-grow flex-row h-full items-center pl-4 pr-4 space-x-4">
              {false && (
                <>
                  <EditModeSelector
                    editMode={editMode}
                    setEditMode={editMode => {
                      clearPageChanges()
                      setEditMode(editMode)
                      if (editMode === 'Navigation') setPageSlug(null)
                      else setPageSlug('home')
                    }}
                  />
                  {editMode === 'Content' && (
                    <PageSelector
                      pages={editablePages}
                      pageSlug={pageSlug}
                      setPageSlug={pageSlug => {
                        clearPageChanges()
                        setPageSlug(pageSlug)
                      }}
                    />
                  )}
                </>
              )}
              <div className="flex-grow" />
              <DeviceSizeSelector
                screenSize={screenSize}
                setScreenSize={setScreenSize}
              />
            </div>

            <div className="flex flex-shrink-0 w-32 m-auto justify-center items-center">
              <Button
                variant="primary"
                size="md"
                disabled={!updatesAvailable}
                loading={buttonLoading > 0}
                onClick={() => {
                  setButtonLoading(3)
                  commitThemeUpdates()
                  commitPageUpdates()
                  commitSlateUpdates()
                }}
              >
                Save
              </Button>
            </div>
          </BackgroundProvider>
        </header>
        <aside className="fixed right-0 bottom-0 top-16 w-96 p-5 shadow-sm border-b-2 border-basicSecondary-300 bg-surface-50 overflow-y-auto z-10">
          <BackgroundProvider backgroundType="surface">
            {activeBlock?.Settings ? (
              <ComponentEditor />
            ) : (
              <ThemeEditor
                theme={newTheme}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setThemeUpdates={setThemeUpdates}
              />
            )}
          </BackgroundProvider>
        </aside>
      </>
      <div
        className={clsx(
          'fixed bottom-0 top-16 left-0 right-96 bg-gray-300 overflow-x-auto',
          screenSize === 'sm' && 'p-8 ',
          screenSize === 'lg' && 'p-8 ',
          screenSize === '2xl' && 'py-8 2xl:px-8',
        )}
      >
        <div
          className={clsx(
            'flex m-auto justify-center items-center h-full',
            screenSize === 'sm' && 'max-w-screen-sm',
            screenSize === 'lg' && 'max-w-screen-lg',
            screenSize === '2xl' &&
              'max-w-screen-2xl min-w-[1024px] scale-90 origin-top-left lg:origin-center 2xl:scale-100',
          )}
        >
          <IFrame
            className="rounded-md w-full h-full shadow-xl overflow-hidden"
            darkMode={darkMode}
            theme={newTheme}
          >
            <LayoutLoader
              Content={<SlateRenderer slate={currentPage?.slate} />}
              pages={pages}
              navigationSlates={network?.navigationSlates}
              customPage={currentPage}
              customLayoutSlug={currentLayout}
              hideContent={editMode === 'Navigation'}
              hideNavigation={editMode === 'Content'}
            />
          </IFrame>
        </div>
      </div>
    </SlateKitContext.Provider>
  )
}
