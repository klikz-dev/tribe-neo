import { confirmable, createConfirmation } from 'react-confirm'

import { AlertDialog, CreateAlertOptions } from './AlertDialog'
import { ConfirmDialog, CreateConfirmationOptions } from './ConfirmDialog'
import { CreatePromptOptions, PromptDialog } from './PromptDialog'

export const alert: (options: CreateAlertOptions) => Promise<void> =
  createConfirmation(confirmable(AlertDialog))

export const confirm: (options: CreateConfirmationOptions) => Promise<boolean> =
  createConfirmation(confirmable(ConfirmDialog))

export const prompt: (
  options: CreatePromptOptions,
) => Promise<{ label: string; value: string }[]> = createConfirmation(
  confirmable(PromptDialog),
)
