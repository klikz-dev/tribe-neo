import { Liquid } from 'liquidjs'

import { SlateDto } from '../dtos'
import { SlateEditable } from '../enums'
import { BaseConvertor } from './base.convertor'
import { HtmlConvertor } from './html.convertor'

export class LiquidConvertor implements BaseConvertor {
  private liquid: string

  private engine: Liquid = new Liquid()

  constructor(liquid: string) {
    this.liquid = liquid
  }

  async toSlate(options: {
    variables?: Record<string, any>
    acceptsAfter?: boolean
    acceptsBefore?: boolean
    editable?: SlateEditable
  }): Promise<SlateDto> {
    const { variables = {}, ...rest } = options
    const parsedLiquid = await this.engine.parseAndRender(
      this.liquid,
      variables,
    )
    return new HtmlConvertor(parsedLiquid).toSlate(rest)
  }

  toSlateSync(options: {
    variables?: Record<string, any>
    acceptsAfter?: boolean
    acceptsBefore?: boolean
    editable?: SlateEditable
  }): SlateDto {
    const { variables = {}, ...rest } = options
    const parsedLiquid = this.engine.parseAndRenderSync(this.liquid, variables)
    return new HtmlConvertor(parsedLiquid).toSlateSync(rest)
  }
}
