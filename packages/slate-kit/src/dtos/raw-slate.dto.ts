import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { BaseSlateDto } from './base-slate.dto'
import { NonFunctionProperties } from './base.dto'
import { RawSlateComponentDto } from './raw-slate-component.dto'

export class RawSlateDto extends BaseSlateDto {
  static fromPlain: (
    plainObject: NonFunctionProperties<RawSlateDto>,
  ) => RawSlateDto

  static fromPlainArray: (
    plainObjects: NonFunctionProperties<RawSlateDto>[],
  ) => RawSlateDto[]

  @IsArray()
  @Type(() => RawSlateComponentDto)
  @ValidateNested({ each: true })
  components: RawSlateComponentDto[]
}
