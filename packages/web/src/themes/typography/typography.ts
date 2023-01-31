import TypographyJS, { TypographyOptions } from 'typography'

import { Theme } from '../types'
import { compileStyles } from './compile-styles'
import { typographyThemes } from './themes'

const getElementById = (doc: Document, id: string): Element => {
  let element = doc?.head?.firstElementChild
  while (element) {
    if (element.id === id) {
      return element
    }
    element = element.nextElementSibling
  }
  return null
}

export class Typography {
  static styleId = 'typography'

  static linkId = 'font'

  private typography: TypographyJS

  private ignoreTags = ['pre']

  private ignoreKeys = ['overflowY', 'color']

  private elementAttrs = [
    'margin',
    'padding',
    'border',
    'cursor',
    'background',
    'shadow',
    'decoration',
    'content',
    'align',
    'indent',
    'width',
    'display',
    'box',
    'style',
  ]

  constructor(theme: Theme) {
    const { typography } = theme
    const { theme: typographyTheme, ...rest } = typography
    const options = typographyThemes[typographyTheme]
    const additionalOptions = (rest ||
      {}) as unknown as Partial<TypographyOptions>
    this.typography = new TypographyJS({
      ...options,
      ...additionalOptions,
      includeNormalize: false,
    })
  }

  private injectStyles(customDocument?: Document): void {
    const doc = customDocument || document
    if (typeof doc !== 'undefined') {
      const styleNode =
        doc.getElementById(Typography.styleId) ||
        getElementById(doc, Typography.styleId)
      if (styleNode) {
        const newHtml = this.toString()
        if (styleNode.innerHTML !== newHtml) {
          styleNode.innerHTML = newHtml
        }
      } else {
        const node = doc.createElement('style')
        node.id = Typography.styleId
        node.type = 'text/css'
        node.innerHTML = this.toString()
        doc.head.appendChild(node)
      }
    }
  }

  private getStyle(): string {
    return `<style id="${Typography.styleId}">${this.toString()}</style>`
  }

  private getFontsStr(): string {
    let fontsStr = ''
    if (this.typography.options.googleFonts) {
      const fonts = this.typography.options.googleFonts.map(font => {
        let str = ''
        str += font.name.split(' ').join('+')
        str += ':'
        str += font.styles.join(',')

        return str
      })

      fontsStr = fonts.join('|')
    }
    return fontsStr
  }

  private getLink(): string {
    const fontsStr = this.getFontsStr()
    if (fontsStr) {
      return `<link id="${Typography.linkId}" href="//fonts.googleapis.com/css?family=${fontsStr}" rel="stylesheet" type="text/css">`
    }
    return ''
  }

  private injectLink(doc: Document, link: string): void {
    const linkElement =
      doc.getElementById(Typography.linkId) ||
      getElementById(doc, Typography.linkId)
    if (linkElement) {
      if (linkElement.outerHTML !== link) {
        linkElement.outerHTML = link
      }
    } else {
      const typographyElement =
        doc.getElementById(Typography.styleId) ||
        getElementById(doc, Typography.styleId)
      typographyElement.insertAdjacentHTML('afterend', link)
    }
  }

  private injectFonts(customDocument?: Document) {
    const doc = customDocument || document
    const link = this.getLink()
    if (link) {
      this.injectLink(doc, link)
    }
  }

  toString(): string {
    return compileStyles(this.toJSON())
  }

  toJSON(): any {
    const json = this.typography.toJSON()
    const cleanJson = {}
    Object.keys(json).forEach(key => {
      if (this.ignoreTags.indexOf(key) !== -1) return

      this.ignoreKeys.forEach(ignoreKey => {
        if (json[key][ignoreKey]) {
          delete json[key][ignoreKey]
        }
      })

      const attrs = {}
      const articleAttrs = {}
      Object.keys(json[key]).forEach(attrKey => {
        if (
          this.elementAttrs.find(attr => attrKey.toLowerCase().includes(attr))
        ) {
          articleAttrs[attrKey] = json[key][attrKey]
        } else {
          attrs[attrKey] = json[key][attrKey]
        }
      })

      if (Object.keys(attrs).length > 0) {
        cleanJson[key] = attrs
      }
      if (Object.keys(articleAttrs).length > 0) {
        cleanJson[
          key
            .split(',')
            .map(singleKey => `article ${singleKey}:not(.ignore-typography *)`)
            .join(',')
        ] = articleAttrs
      }
    })
    return cleanJson
  }

  injectToDocument(customDocument?: Document): void {
    this.injectStyles(customDocument)
    this.injectFonts(customDocument)
  }

  toHtmlElement(): string {
    return `${this.getStyle()}${this.getLink()}`
  }
}
