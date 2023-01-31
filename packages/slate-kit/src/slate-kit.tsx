// eslint-disable-next-line no-restricted-imports
import React, { ReactElement } from 'react'

import { AddBlock, BlockFunc, BlockWrapper, createBlock } from './blocks'
import { RAW_TEXT_COMPONENT, RESERVED_COMPONENT_NAMES } from './constants'

export class SlateKit {
  private settings: Record<string, BlockFunc> = {}

  private components: Record<string, BlockFunc> = {}

  private componentAdder: AddBlock

  private componentWrapper: BlockWrapper

  private slateWrapper: BlockFunc

  registerComponentAdder(component: AddBlock) {
    this.componentAdder = component
  }

  loadComponentAdder(): AddBlock {
    if (!this.componentAdder) {
      return null
    }
    return this.componentAdder
  }

  registerComponentWrapper(component: BlockWrapper) {
    this.componentWrapper = component
  }

  loadComponentWrapper(): BlockWrapper {
    if (!this.componentWrapper) {
      return null
    }
    return this.componentWrapper
  }

  registerSlateWrapper(component: BlockFunc) {
    this.slateWrapper = component
  }

  loadSlateWrapper(): BlockFunc {
    if (!this.slateWrapper) {
      return null
    }
    return this.slateWrapper
  }

  registerComponents(
    components: Record<string, { Settings?: BlockFunc } & BlockFunc>,
  ): void {
    Object.keys(components).forEach(name =>
      this.registerComponent({
        name,
        Component: components[name],
        Settings: components[name]?.Settings,
      }),
    )
  }

  registerComponent(options: {
    name: string
    Component: BlockFunc
    Settings?: BlockFunc
  }): void {
    const { name, Component, Settings } = options
    const Wrapper = this.loadComponentWrapper()

    if (RESERVED_COMPONENT_NAMES.includes(name)) {
      throw new Error(`You cannot use reserved component name: ${name}`)
    }
    if (!Settings) {
      this.components[name] = createBlock({
        name,
        Wrapper,
        Component,
      })
    } else {
      this.settings[name] = Settings
      this.components[name] = createBlock({
        name,
        Wrapper,
        Component,
        SettingsComponent: Settings,
      })
    }
  }

  loadComponent(options: {
    key: string
    name: string
    compiledProps: Record<string, any> | string
    children: ReactElement[]
  }): ReactElement | null | string {
    const { key, name, compiledProps, children } = options

    const SlateComponent = this.components[name]
    if (!SlateComponent) {
      switch (name) {
        case RAW_TEXT_COMPONENT:
          return compiledProps as string
        default:
          return React.createElement(
            name,
            { key, ...(compiledProps as Record<string, any>) },
            ...children,
          )
      }
    }

    return (
      <SlateComponent key={key} {...compiledProps}>
        {children}
      </SlateComponent>
    )
  }

  loadSettings(name: string): ReactElement | null {
    const Settings = this.settings[name]
    return Settings ? <Settings /> : null
  }
}
