import parse, { HTMLElement, NodeType } from 'node-html-parser'
import { v4 as uuidv4 } from 'uuid'

import { RAW_TEXT_COMPONENT } from '../constants'
import { SlateComponentDto, SlateDto } from '../dtos'
import { SlateEditable } from '../enums'
import { BaseConvertor } from './base.convertor'

export class HtmlConvertor implements BaseConvertor {
  private html: HTMLElement

  constructor(html: string) {
    this.html = parse(html.replace(/\n/g, ' '))
    this.html = this.html.removeWhitespace()
  }

  private elementToComponent(element: HTMLElement): {
    rootComponent: SlateComponentDto
    components: SlateComponentDto[]
  } {
    let hasProps = false
    const props = {}
    Object.keys(element.rawAttributes).forEach(key => {
      hasProps = true
      if (element.rawAttributes[key] === null) {
        props[key] = true
      } else {
        props[key] = element.rawAttributes[key]
      }
    })
    const rootComponent: Partial<SlateComponentDto> = {
      id: uuidv4(),
      name: element.rawTagName,
      props: hasProps ? JSON.stringify(props) : null,
    }
    const rootComponentChildren = []
    let components: SlateComponentDto[] = []
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i]
      let parsedElement: {
        rootComponent: SlateComponentDto
        components: SlateComponentDto[]
      }
      let childComponent: SlateComponentDto
      switch (child.nodeType) {
        case NodeType.ELEMENT_NODE:
          parsedElement = this.elementToComponent(child as HTMLElement)
          rootComponentChildren.push(parsedElement.rootComponent.id)
          components = components.concat(
            [parsedElement.rootComponent],
            parsedElement.components,
          )
          break
        case NodeType.TEXT_NODE:
          childComponent = SlateComponentDto.fromPlain({
            id: uuidv4(),
            name: RAW_TEXT_COMPONENT,
            props: JSON.stringify(child.text.trim()),
          })
          rootComponentChildren.push(childComponent.id)
          components.push(childComponent)
          break
        default:
          break
      }
    }
    return {
      rootComponent: SlateComponentDto.fromPlain({
        ...rootComponent,
        children: JSON.stringify(rootComponentChildren),
      } as SlateComponentDto),
      components,
    }
  }

  async toSlate(options: {
    acceptsAfter?: boolean
    acceptsBefore?: boolean
    editable?: SlateEditable
  }): Promise<SlateDto> {
    return this.toSlateSync(options)
  }

  toSlateSync(options: {
    acceptsAfter?: boolean
    acceptsBefore?: boolean
    editable?: SlateEditable
  }): SlateDto {
    const {
      acceptsAfter = true,
      acceptsBefore = true,
      editable = SlateEditable.ALL,
    } = options
    const { rootComponent, components } = this.elementToComponent(this.html)

    return SlateDto.fromPlain({
      id: rootComponent.id,
      acceptsAfter,
      acceptsBefore,
      editable,
      rootComponents: JSON.parse(rootComponent.children),
      components,
    })
  }
}
