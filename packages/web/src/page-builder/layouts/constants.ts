import { SlateLayout } from './layout.enum'

export const layoutsAdditionalContext: Record<
  SlateLayout,
  Record<string, any>
> = {
  CLASSIC: { mobileSidebarEnable: false },
  DEFAULT: {},
}
