import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { BaseSlateDto } from './base-slate.dto'
import { NonFunctionProperties } from './base.dto'
import { SlateComponentDto } from './slate-component.dto'

export class SlateDto extends BaseSlateDto {
  static fromPlain: (plainObject: NonFunctionProperties<SlateDto>) => SlateDto

  static fromPlainArray: (
    plainObjects: NonFunctionProperties<SlateDto>[],
  ) => SlateDto[]

  @IsArray()
  @Type(() => SlateComponentDto)
  @ValidateNested({ each: true })
  components: SlateComponentDto[]
}
