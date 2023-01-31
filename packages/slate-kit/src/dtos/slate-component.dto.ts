import { IsJSON, IsOptional } from 'class-validator'

import { BaseSlateComponentDto } from './base-slate-component.dto'
import { NonFunctionProperties } from './base.dto'

export class SlateComponentDto extends BaseSlateComponentDto {
  static fromPlain: (
    plainObject: NonFunctionProperties<SlateComponentDto>,
  ) => SlateComponentDto

  static fromPlainArray: (
    plainObjects: NonFunctionProperties<SlateComponentDto>[],
  ) => SlateComponentDto[]

  @IsJSON()
  @IsOptional()
  props?: string

  @IsJSON()
  @IsOptional()
  children?: string

  @IsJSON()
  @IsOptional()
  output?: string
}
