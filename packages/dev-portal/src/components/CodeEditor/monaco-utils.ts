import { languages } from 'monaco-editor'

import CompletionItemKind = languages.CompletionItemKind

const createMemberSuggestions = range => {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup

  // TODO pick fields from Member type dynamically
  const fields = [
    'banner',
    'bannerId',
    'createdAt',
    'displayName',
    'email',
    'emailStatus',
    'externalId',
    'fields',
    'id',
    'lastSeen',
    'name',
    'network',
    'networkId',
    'newEmail',
    'overrideTeammate',
    'profilePicture',
    'profilePictureId',
    'role',
    'roleId',
    'sidebarWidgets',
    'status',
    'tagline',
    'teammate',
    'updatedAt',
    'username',
    'verifiedAt',
  ]

  return fields.map(it => ({
    label: `${it}`,
    kind: CompletionItemKind.Field,
    insertText: it,
    range,
  }))
}
const createNetworkSuggestions = range => {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  const fields = [
    'activeSso',
    'activeTheme',
    'additionalSeatsCapacity',
    'aliases',
    'authMemberProps',
    'billingEmail',
    'brandColor',
    'companyName',
    'createdAt',
    'createdBy',
    'createdById',
    'customCodes',
    'customMemberCapacity',
    'defaultSpaces',
    'description',
    'domain',
    'favicon',
    'faviconId',
    'footer',
    'hideDefaultAuthenticationForm',
    'id',
    'incidentEmails',
    'industry',
    'landingPages',
    'locale',
    'logo',
    'logoId',
    'memberCapacity',
    'memberCapacityDeclared',
    'memberFields',
    'members',
    'membersCount',
    'membership',
    'name',
    'navigationSlates',
    'newDomain',
    'organizationId',
    'owner',
    'ownerId',
    'pages',
    'privacyPolicyUrl',
    'roles',
    'seatCapacityDeclared',
    'seatsCapacity',
    'spaces',
    'status',
    'statusLocked',
    'statusReason',
    'subscriptionPlan',
    'termsOfServiceUrl',
    'themes',
    'topNavigation',
    'tribeBranding',
    'visibility',
    'whoCanInvite',
    'whoCanInviteIds',
  ]

  return fields.map(it => ({
    label: `${it}`,
    kind: CompletionItemKind.Field,
    insertText: it,
    range,
  }))
}

export const completionItemProvider = {
  triggerCharacters: ['.'],
  provideCompletionItems(model, position) {
    const previousWord = model.getWordUntilPosition({
      ...position,
      column: position.column - 1,
    })
    const word = model.getWordAtPosition(position)
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word?.startColumn || position.column,
      endColumn: word?.endColumn || position.column,
    }
    if (previousWord.word === 'member') {
      return {
        suggestions: createMemberSuggestions(range),
      }
    }
    if (previousWord.word === 'network') {
      return {
        suggestions: createNetworkSuggestions(range),
      }
    }
    return { suggestions: [] }
  },
}

export const completionVariableProvider = {
  provideCompletionItems(model, position) {
    const word = model.getWordAtPosition(position)
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word?.startColumn || position.column,
      endColumn: word?.endColumn || position.column,
    }

    const variables = ['network', 'member', 'anonymize']
    return {
      suggestions: variables.map(it => ({
        label: `${it}`,
        kind: CompletionItemKind.Variable,
        insertText: it,
        range,
      })),
    }
  },
}
