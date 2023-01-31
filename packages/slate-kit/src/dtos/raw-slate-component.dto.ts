import { IsOptional } from 'class-validator'

import { BaseSlateComponentDto } from './base-slate-component.dto'
import { NonFunctionProperties } from './base.dto'

export class RawSlateComponentDto extends BaseSlateComponentDto {
  static fromPlain: (
    plainObject: NonFunctionProperties<RawSlateComponentDto>,
  ) => RawSlateComponentDto

  static fromPlainArray: (
    plainObjects: NonFunctionProperties<RawSlateComponentDto>[],
  ) => RawSlateComponentDto[]

  @IsOptional()
  props?: Record<string, any>

  @IsOptional()
  children?: (string | string[])[]

  @IsOptional()
  output?: Record<string, any>
}
