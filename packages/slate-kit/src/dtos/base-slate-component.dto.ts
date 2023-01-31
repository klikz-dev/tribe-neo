import { IsBoolean, IsOptional, IsString } from 'class-validator'

import { BaseDto } from './base.dto'

export class BaseSlateComponentDto extends BaseDto<BaseSlateComponentDto>() {
  @IsString()
  id: string

  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  acceptsAfter?: boolean

  @IsBoolean()
  @IsOptional()
  acceptsBefore?: boolean

  @IsBoolean()
  @IsOptional()
  acceptsChildren?: boolean

  @IsBoolean()
  @IsOptional()
  removable?: boolean
}
