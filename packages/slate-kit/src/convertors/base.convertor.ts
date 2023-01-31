import { SlateDto } from '../dtos'

export interface BaseConvertor {
  toSlate(options: any): Promise<SlateDto>
  toSlateSync(options: any): SlateDto
}
