export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type AccessGroup = {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  entityId: Scalars['ID']
  entityType: AccessGroupEntityType
  id: Scalars['ID']
  info?: Maybe<Scalars['String']>
  name: Scalars['String']
  networkId: Scalars['ID']
  type: Scalars['String']
}

export enum AccessGroupEntityType {
  NETWORK = 'network',
  POST = 'post',
  SPACE = 'space',
}

export type Action = {
  status: ActionStatus
}

export type ActionPermissions = {
  inputPermissions: Array<InputPathPermissions>
  isAuthorized: IsAuthorized
  name: Scalars['String']
  outputPermissions: Array<PathPermissions>
}

export enum ActionStatus {
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
}

export type ActiveSso = {
  logoutUrl?: Maybe<Scalars['String']>
  settingsUrl?: Maybe<Scalars['String']>
}

export type AddAppCollaboratorInput = {
  email: Scalars['String']
}

export type AddMediasInput = {
  contentTypes: Array<Scalars['String']>
}

export type AddNetworkInput = {
  description?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  entrancePage?: Maybe<Scalars['String']>
  faviconId?: Maybe<Scalars['String']>
  industry?: Maybe<NetworkIndustryType>
  name: Scalars['String']
  owner: JoinNetworkInput
  primaryMembers?: Maybe<NetworkPrimaryMembersType>
  referrer?: Maybe<Scalars['String']>
  timeframe?: Maybe<NetworkTimeframeType>
  utmCampaign?: Maybe<Scalars['String']>
  utmContent?: Maybe<Scalars['String']>
  utmMedium?: Maybe<Scalars['String']>
  utmSource?: Maybe<Scalars['String']>
  utmTerm?: Maybe<Scalars['String']>
  visibility?: Maybe<NetworkVisibility>
}

export type AddReactionInput = {
  reaction: Scalars['String']
}

export type AddSpaceMemberInput = {
  memberId: Scalars['ID']
  roleId?: Maybe<Scalars['ID']>
}

export type AddTrialInput = {
  endDate: Scalars['DateTime']
}

export type App = {
  about?: Maybe<Scalars['String']>
  authorName?: Maybe<Scalars['String']>
  authorUrl?: Maybe<Scalars['String']>
  banner?: Maybe<Media>
  bannerId?: Maybe<Scalars['ID']>
  clientId?: Maybe<Scalars['String']>
  clientSecret?: Maybe<Scalars['String']>
  comingSoon: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<Member>
  createdById?: Maybe<Scalars['ID']>
  customCodes?: Maybe<AppCustomCodes>
  description?: Maybe<Scalars['String']>
  docsUrl?: Maybe<Scalars['String']>
  embedIds: Array<Scalars['ID']>
  embeds?: Maybe<Array<Embed>>
  enabledContexts: Array<PermissionContext>
  favicon?: Maybe<Media>
  faviconId?: Maybe<Scalars['ID']>
  globalBanner?: Maybe<Media>
  globalEmbeds?: Maybe<Array<Embed>>
  globalFavicon?: Maybe<Media>
  globalImage?: Maybe<Media>
  globalImages?: Maybe<Array<Media>>
  globalNetwork?: Maybe<PluralNetwork>
  id: Scalars['ID']
  image?: Maybe<Media>
  imageId?: Maybe<Scalars['ID']>
  imageIds: Array<Scalars['ID']>
  images?: Maybe<Array<Media>>
  installed?: Maybe<Scalars['Boolean']>
  locked: Scalars['Boolean']
  name: Scalars['String']
  network?: Maybe<Network>
  networkId: Scalars['ID']
  privacyPolicyUrl?: Maybe<Scalars['String']>
  requiredPermissions: Array<PrimaryScopes>
  requiredPlan: PlanName
  secretToken?: Maybe<Scalars['String']>
  slug: Scalars['String']
  standing: StoreItemStanding
  status: StoreItemStatus
  termsOfServiceUrl?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  updatedBy?: Maybe<Member>
  updatedById?: Maybe<Scalars['ID']>
  webhookSignSecret?: Maybe<Scalars['String']>
  webhookSubscriptions?: Maybe<Array<Scalars['String']>>
  webhookUrl?: Maybe<Scalars['String']>
}

export type AppAction = {
  data?: Maybe<Scalars['String']>
  status: ActionStatus
}

export type AppCollaborator = {
  addedById?: Maybe<Scalars['ID']>
  app?: Maybe<App>
  appId: Scalars['ID']
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  type: AppCollaboratorType
}

export enum AppCollaboratorType {
  COLLABORATOR = 'COLLABORATOR',
  OWNER = 'OWNER',
}

export type AppCustomCodes = {
  body?: Maybe<Scalars['String']>
  head?: Maybe<Scalars['String']>
}

export type AppEdge = {
  cursor: Scalars['String']
  node: App
}

export type AppInstallation = {
  app?: Maybe<App>
  appVersion?: Maybe<Scalars['String']>
  context: PermissionContext
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  installedAt: Scalars['DateTime']
  installedBy?: Maybe<Member>
  network?: Maybe<Network>
  permissions: Array<Scalars['String']>
  status: AppInstallationStatus
  updatedAt: Scalars['DateTime']
}

export type AppInstallationEdge = {
  cursor: Scalars['String']
  node: AppInstallation
}

export enum AppInstallationStatus {
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
}

export type AppPublication = {
  addedById?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  itemId: Scalars['String']
  networkId: Scalars['String']
}

export type AppSetting = {
  appId: Scalars['String']
  context: PermissionContext
  entityId?: Maybe<Scalars['String']>
  id: Scalars['ID']
  networkId: Scalars['String']
  settings: Scalars['String']
}

export type AppToken = {
  accessToken: Scalars['String']
}

export type AuthInfoWithOtp = {
  member: Member
  network: Network
  otp: Scalars['String']
  role?: Maybe<Role>
}

export type AuthToken = {
  accessToken: Scalars['String']
  member: Member
  network?: Maybe<Network>
  networkPublicInfo: NetworkPublicInfo
  refreshToken: Scalars['String']
  role: Role
}

export type AuthTokenWithOtp = {
  accessToken: Scalars['String']
  member: Member
  network?: Maybe<Network>
  networkPublicInfo: NetworkPublicInfo
  otp: Scalars['String']
  refreshToken: Scalars['String']
  role: Role
}

export type BaseCustomFieldSchema = {
  description?: Maybe<Scalars['String']>
  items?: Maybe<BaseCustomFieldSchema>
  key: Scalars['String']
  name: Scalars['String']
  properties?: Maybe<Array<BaseCustomFieldSchema>>
  required?: Maybe<Scalars['Boolean']>
  type: CustomFieldType
  typeOptions?: Maybe<CustomFieldTypeOptions>
  validators?: Maybe<Array<CustomFieldValidator>>
}

export type BaseCustomFieldSchemaInput = {
  description?: Maybe<Scalars['String']>
  items?: Maybe<BaseCustomFieldSchemaInput>
  key: Scalars['String']
  name: Scalars['String']
  properties?: Maybe<Array<BaseCustomFieldSchemaInput>>
  type: CustomFieldType
  typeOptions?: Maybe<CustomFieldTypeOptionsInput>
  validators?: Maybe<Array<CustomFieldValidatorInput>>
}

export type BaseFilterInput = {
  and?: Maybe<Array<BaseFilterInput>>
  filtername: Filtername
  key?: Maybe<Scalars['String']>
  negator?: Maybe<Scalars['String']>
  operator?: Maybe<Scalars['String']>
  or?: Maybe<Array<BaseFilterInput>>
  value?: Maybe<Scalars['String']>
}

export type Basket = {
  items?: Maybe<Array<BasketItem>>
  renewalType: PlanRenewalType
  total?: Maybe<Price>
}

export type BasketItem = {
  note?: Maybe<Scalars['String']>
  title: Scalars['String']
  value: Price
}

export type BasketsInput = {
  name: PlanName
  seats: Scalars['Int']
}

export type BillingAddress = {
  city?: Maybe<Scalars['String']>
  country: Scalars['String']
  postalCode?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
}

export type BillingAddressInput = {
  city?: Maybe<Scalars['String']>
  country: Scalars['String']
  postalCode?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
}

export type BillingDetails = {
  address?: Maybe<BillingAddress>
  billingEmail?: Maybe<Scalars['String']>
  card?: Maybe<CardPublicInformation>
  companyName?: Maybe<Scalars['String']>
  vat?: Maybe<Vat>
}

export type BillingDetailsInput = {
  address?: Maybe<BillingAddressInput>
  billingEmail?: Maybe<Scalars['String']>
  card?: Maybe<CardInput>
  companyName?: Maybe<Scalars['String']>
  vat?: Maybe<VatInput>
}

export type By = Member

export type CardInput = {
  cardNumber: Scalars['String']
  cvc: Scalars['String']
  expirationMonth: Scalars['Float']
  expirationYear: Scalars['Float']
  nameOnCard?: Maybe<Scalars['String']>
}

export type CardPublicInformation = {
  expirationMonth: Scalars['Float']
  expirationYear: Scalars['Float']
  lastFourDigits: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type ChartData = {
  label: Scalars['String']
  points: Scalars['String']
  value?: Maybe<Scalars['String']>
}

export type Collection = {
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<Member>
  customOrderingIndex: Scalars['Float']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  network?: Maybe<Network>
  slug: Scalars['String']
  spaces?: Maybe<PaginatedSpace>
  updatedAt: Scalars['DateTime']
}

export type CollectionSpacesArgs = {
  limit: Scalars['Int']
}

export type CollectionEdge = {
  cursor: Scalars['String']
  node: Collection
}

export enum CollectionListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  CUSTOM_ORDERING_INDEX = 'CUSTOM_ORDERING_INDEX',
  UPDATED_AT = 'UPDATED_AT',
}

export type ColumnSortInput = {
  key: Scalars['String']
  order?: Maybe<SortOrder>
}

export type ConfirmResetPasswordInput = {
  token: Scalars['String']
}

export type ContextPermissions = {
  context: PermissionContext
  entityActions: Array<EntityPermissions>
}

export type ContextScopes = {
  context: PermissionContext
  entityScopes: Array<EntityScopes>
}

export type CreateAccessGroupInput = {
  description?: Maybe<Scalars['String']>
  entityId: Scalars['ID']
  entityType: AccessGroupEntityType
  info?: Maybe<Scalars['String']>
  name: Scalars['String']
  type: Scalars['String']
}

export type CreateAppInput = {
  name: Scalars['String']
  networkId: Scalars['String']
  slug: Scalars['String']
}

export type CreateCollectionInput = {
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type CreateEmojiInput = {
  text: Scalars['String']
}

export type CreateFileInput = {
  contentType: Scalars['String']
  extension: Scalars['String']
  name?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
}

export type CreateHighlightedTag = {
  indent?: Maybe<Scalars['Float']>
  tagId?: Maybe<Scalars['String']>
  text: Scalars['String']
  type: HighlightedTagType
}

export type CreateImageInput = {
  contentType: Scalars['String']
  cropHeight?: Maybe<Scalars['Int']>
  cropWidth?: Maybe<Scalars['Int']>
  cropX?: Maybe<Scalars['Int']>
  cropY?: Maybe<Scalars['Int']>
  cropZoom?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
}

export type CreateLimitedSupportTokenInput = {
  networkId: Scalars['String']
}

export type CreatePageInput = {
  address: PageAddressInput
  layout: Scalars['String']
  seoDetail: PageSeoInput
  slate: SlateInput
  slug: Scalars['String']
  type?: Maybe<PageType>
}

export type CreatePermissionInput = {
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  scopes: Array<Scalars['String']>
}

/** Input for creating a post */
export type CreatePostInput = {
  /** The id of all the attachments to this post. */
  attachmentIds?: Maybe<Array<Scalars['String']>>
  /** The fields of the post. Depending of the post type it may include title, text, image, etc. */
  mappingFields?: Maybe<Array<PostMappingFieldInput>>
  /** The id of this post's type */
  postTypeId: Scalars['String']
  /** Whether the post is published */
  publish?: Maybe<Scalars['Boolean']>
  /** The tags of this post. */
  tagNames?: Maybe<Array<Scalars['String']>>
}

export type CreateReportInput = {
  description?: Maybe<Scalars['String']>
  entityId: Scalars['String']
  entityType: ModerationEntityType
  reportCategory: ReportCategory
  spaceId?: Maybe<Scalars['String']>
}

/** Input for creating a space. */
export type CreateSpaceInput = {
  address?: Maybe<SpaceAddressInput>
  /** The id of the collection in which the space is created. */
  collectionId?: Maybe<Scalars['ID']>
  /** The description of the space. */
  description?: Maybe<Scalars['String']>
  /** The roles that can find this space. */
  findableByRoles?: Maybe<Array<Scalars['String']>>
  /** Is this space hidden? */
  hidden?: Maybe<Scalars['Boolean']>
  /** The id of the space image. */
  imageId?: Maybe<Scalars['String']>
  /** Is this space invite only? */
  inviteOnly?: Maybe<Scalars['Boolean']>
  /** The roles that can join this space. */
  joinableByRoles?: Maybe<Array<Scalars['String']>>
  layout?: Maybe<Scalars['String']>
  /** The name of the space. */
  name: Scalars['String']
  nonAdminsCanInvite?: Maybe<Scalars['Boolean']>
  /** Is this space a private space? */
  private?: Maybe<Scalars['Boolean']>
  seoDetail?: Maybe<SpaceSeoDetailInput>
  slate?: Maybe<SlateInput>
  /** The slug of the space. It will be auto-generated if not provided. */
  slug?: Maybe<Scalars['String']>
  type?: Maybe<SpaceType>
  /** The roles that can view this space. */
  viewableByRoles?: Maybe<Array<Scalars['String']>>
  whoCanPost?: Maybe<Array<Scalars['ID']>>
  whoCanReact?: Maybe<Array<Scalars['ID']>>
  whoCanReply?: Maybe<Array<Scalars['ID']>>
  withRoles?: Maybe<Scalars['Boolean']>
}

/** Input for creating a tag. */
export type CreateTagInput = {
  /** The description of the tag. */
  description?: Maybe<Scalars['String']>
  /** The slug of the tag. */
  slug: Scalars['String']
  /** The name of the tag. */
  title: Scalars['String']
}

export type CreateWidgetInput = {
  context: WidgetContexts
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  position: WidgetPositions
  url: Scalars['String']
}

export type CustomCode = {
  anonymize: Scalars['Boolean']
  code: Scalars['String']
  position: CustomCodePosition
}

export enum CustomCodePosition {
  BODY = 'BODY',
  HEAD = 'HEAD',
}

export type CustomField = {
  key: Scalars['String']
  value?: Maybe<Scalars['String']>
}

export type CustomFieldInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export type CustomFieldPrivacy = {
  allow: Array<CustomFieldPrivacyOptions>
}

export type CustomFieldPrivacyInput = {
  allow: Array<CustomFieldPrivacyOptions>
}

export enum CustomFieldPrivacyOptions {
  ADMIN = 'ADMIN',
  OWN = 'OWN',
}

export type CustomFieldSchema = {
  default?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  items?: Maybe<BaseCustomFieldSchema>
  key: Scalars['String']
  name: Scalars['String']
  properties?: Maybe<Array<BaseCustomFieldSchema>>
  readPrivacy?: Maybe<CustomFieldPrivacy>
  required?: Maybe<Scalars['Boolean']>
  searchable?: Maybe<Scalars['Boolean']>
  settings?: Maybe<Array<CustomFieldSettings>>
  type: CustomFieldType
  typeOptions?: Maybe<CustomFieldTypeOptions>
  validators?: Maybe<Array<CustomFieldValidator>>
  writePrivacy?: Maybe<CustomFieldPrivacy>
}

export type CustomFieldSchemaInput = {
  default?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  items?: Maybe<BaseCustomFieldSchemaInput>
  key: Scalars['String']
  name: Scalars['String']
  properties?: Maybe<Array<BaseCustomFieldSchemaInput>>
  readPrivacy?: Maybe<CustomFieldPrivacyInput>
  searchable?: Maybe<Scalars['Boolean']>
  settings?: Maybe<Array<CustomFieldSettingsInput>>
  type: CustomFieldType
  typeOptions?: Maybe<CustomFieldTypeOptionsInput>
  validators?: Maybe<Array<CustomFieldValidatorInput>>
  writePrivacy?: Maybe<CustomFieldPrivacyInput>
}

export type CustomFieldSettings = {
  key: Scalars['String']
  value: Scalars['String']
}

export type CustomFieldSettingsInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export enum CustomFieldType {
  ARRAY = 'array',
  BOOLEAN = 'boolean',
  DATE = 'date',
  NUMBER = 'number',
  OBJECT = 'object',
  RELATION = 'relation',
  RICH_TEXT = 'richText',
  TEXT = 'text',
}

export type CustomFieldTypeOptions = {
  dateType?: Maybe<DateTypeOptions>
  numberType?: Maybe<NumberTypeOptions>
  relationType?: Maybe<RelationTypeOptions>
  richTextType?: Maybe<RichTextTypeOptions>
  textType?: Maybe<TextTypeOptions>
}

export type CustomFieldTypeOptionsInput = {
  dateType?: Maybe<DateTypeOptions>
  numberType?: Maybe<NumberTypeOptions>
  relationType?: Maybe<RelationTypeOptions>
  richTextType?: Maybe<RichTextTypeOptions>
  textType?: Maybe<TextTypeOptions>
}

export type CustomFieldValidator = {
  customErrorMessage?: Maybe<Scalars['String']>
  validation: CustomFieldValidators
  value: Scalars['String']
}

export type CustomFieldValidatorInput = {
  customErrorMessage?: Maybe<Scalars['String']>
  validation: CustomFieldValidators
  value: Scalars['String']
}

export enum CustomFieldValidators {
  ALL_OF = 'allOf',
  ANY_OF = 'anyOf',
  ENUM = 'enum',
  EXCLUSIVE_MAXIMUM = 'exclusiveMaximum',
  EXCLUSIVE_MINIMUM = 'exclusiveMinimum',
  FORMAT = 'format',
  MAX_ITEMS = 'maxItems',
  MAX_LENGTH = 'maxLength',
  MAX_PROPERTIES = 'maxProperties',
  MAXIMUM = 'maximum',
  MIN_ITEMS = 'minItems',
  MIN_LENGTH = 'minLength',
  MIN_PROPERTIES = 'minProperties',
  MINIMUM = 'minimum',
  MULTIPLE_OF = 'multipleOf',
  NOT = 'not',
  ONE_OF = 'oneOf',
  PATTERN = 'pattern',
  UNIQUE_ITEMS = 'uniqueItems',
}

export type CustomFields = {
  fields: Array<CustomField>
}

export type CustomFieldsInput = {
  fields: Array<CustomFieldInput>
}

export type CustomFieldsSchema = {
  fields: Array<CustomFieldSchema>
}

export enum CustomSsoType {
  OAUTH2 = 'oauth2',
}

export enum DateTypeOptions {
  DATE = 'date',
  DATETIME = 'datetime',
}

export enum DefaultSsoType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
}

export type DomainAvailability = {
  available: Scalars['Boolean']
}

export type DomainAvailabilityInput = {
  domain: Scalars['String']
}

export type DomainTransferStatus = {
  aaaarecordSuccess: Scalars['Boolean']
  aaaarecords: Array<Scalars['String']>
  arecordSuccess: Scalars['Boolean']
  arecords: Array<Scalars['String']>
  cnameSuccess: Scalars['Boolean']
  cnames: Array<Scalars['String']>
  domain: Scalars['String']
  ns: Array<Scalars['String']>
  root: Scalars['Boolean']
  success: Scalars['Boolean']
  tribeARecords: Array<Scalars['String']>
  tribeCname: Scalars['String']
}

export type EmailAvailability = {
  available: Scalars['Boolean']
}

export type Embed = {
  author?: Maybe<Scalars['String']>
  author_url?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  html?: Maybe<Scalars['String']>
  id: Scalars['ID']
  options?: Maybe<Scalars['String']>
  provider_name?: Maybe<Scalars['String']>
  thumbnail_height?: Maybe<Scalars['String']>
  thumbnail_url?: Maybe<Scalars['String']>
  thumbnail_width?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url: Scalars['String']
}

export type EmbedInput = {
  options?: Maybe<Scalars['String']>
  url: Scalars['String']
}

export type Emoji = {
  id: Scalars['ID']
  text: Scalars['String']
}

export type EntityPermissions = {
  actions: Array<ActionPermissions>
  id: Scalars['String']
}

export type EntityReport = {
  data?: Maybe<Array<ReportData>>
  description?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['DateTime']>
  entity?: Maybe<ReportableEntity>
  entityId: Scalars['ID']
  entityType: ReportableEntityType
  startDate?: Maybe<Scalars['DateTime']>
  tooltip?: Maybe<Scalars['String']>
}

export type EntityScopes = {
  id: Scalars['String']
  scopes: Array<Scalars['String']>
}

export type EventType = {
  description: Scalars['String']
  name: Scalars['String']
  noun: Scalars['String']
  requiredScope: Scalars['String']
  shortDescription: Scalars['String']
  verb: EventVerb
}

export enum EventVerb {
  ACCEPTED = 'ACCEPTED',
  ADDED = 'ADDED',
  BANNED = 'BANNED',
  BLOCKED = 'BLOCKED',
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  FAILED = 'FAILED',
  PERMITTED = 'PERMITTED',
  PINGED = 'PINGED',
  PINNED = 'PINNED',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  REMOVED = 'REMOVED',
  UNBLOCKED = 'UNBLOCKED',
  UNPINNED = 'UNPINNED',
  UNPUBLISHED = 'UNPUBLISHED',
  UNVERIFIED = 'UNVERIFIED',
  UPDATED = 'UPDATED',
  VERIFIED = 'VERIFIED',
  VIEWED = 'VIEWED',
}

export type File = {
  downloadUrl: Scalars['String']
  extension: Scalars['String']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
  url: Scalars['String']
}

export enum Filtername {
  AND = 'and',
  LEAF = 'leaf',
  OR = 'or',
}

export type FiltersInput = {
  filter: BaseFilterInput
}

export enum FlaggedType {
  MEMBER = 'MEMBER',
  SYSTEM = 'SYSTEM',
}

export type Footer = {
  urls: Array<FooterUrl>
}

export type FooterUrl = {
  title: Scalars['String']
  url: Scalars['String']
}

export type GlobalToken = {
  accessToken: Scalars['String']
  email: Scalars['String']
}

export type GlobalTokenInput = {
  email: Scalars['String']
  verificationCode: Scalars['String']
}

export type HighlightedTag = {
  indent?: Maybe<Scalars['Float']>
  tag?: Maybe<Tag>
  text: Scalars['String']
  type: HighlightedTagType
}

export enum HighlightedTagType {
  SECTION = 'SECTION',
  TOPIC = 'TOPIC',
}

export type Image = {
  cropHeight?: Maybe<Scalars['Int']>
  cropWidth?: Maybe<Scalars['Int']>
  cropX: Scalars['Int']
  cropY: Scalars['Int']
  cropZoom: Scalars['Float']
  dominantColorHex?: Maybe<Scalars['String']>
  downloadUrl: Scalars['String']
  dpi?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  url: Scalars['String']
  urls?: Maybe<MediaUrls>
  width?: Maybe<Scalars['Float']>
}

export type ImpersonateLoginToNetworkInput = {
  memberId: Scalars['ID']
  networkId: Scalars['ID']
}

export type ImportRequest = {
  changeMemberDetails: Scalars['Boolean']
  id: Scalars['ID']
  networkId: Scalars['ID']
  prefixId: Scalars['String']
  requesterId: Scalars['ID']
  stage: ImportRequestStage
  status: ImportRequestStatus
}

export enum ImportRequestStage {
  ANSWER = 'ANSWER',
  COMMENT = 'COMMENT',
  DISCUSSION = 'DISCUSSION',
  FIX_POST_TYPES = 'FIX_POST_TYPES',
  MEMBER = 'MEMBER',
  QUESTION = 'QUESTION',
  TOPIC = 'TOPIC',
}

export enum ImportRequestStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type In = Space

export type InputPathPermissions = {
  isAuthorized: IsAuthorized
  path: Scalars['String']
  values: Array<ValuePermissions>
}

export type InstallAppInput = {
  context: PermissionContext
  entityId: Scalars['String']
  permissions?: Maybe<Array<Scalars['String']>>
}

export type IntValue = {
  int: Scalars['Int']
}

/** Input for inviting members. */
export type InviteMembersInput = {
  /** The ids of the default spaces the invitees have. */
  defaultSpacesIds?: Maybe<Array<Scalars['ID']>>
  /** When does the invitations expire? Empty for no expiration. */
  expiresAt?: Maybe<Scalars['DateTime']>
  /** Custom message for invitation. */
  invitationMessage?: Maybe<Scalars['String']>
  /** The details of the invitees */
  invitees: Array<InviteeInput>
  /** The id of the role the invitees have. */
  roleId?: Maybe<Scalars['ID']>
}

export type InviteeInput = {
  /** The ids of the default spaces this invitee has. */
  defaultSpacesIds?: Maybe<Array<Scalars['ID']>>
  /** The email address of the invitee. */
  email: Scalars['String']
  /** The name of the invitee. */
  name?: Maybe<Scalars['String']>
  /** The role id of the invitee. */
  roleId?: Maybe<Scalars['ID']>
}

export type Invoice = {
  cardLastFourDigits?: Maybe<Scalars['String']>
  currency: Scalars['String']
  date: Scalars['DateTime']
  invoiceUrl?: Maybe<Scalars['String']>
  status: InvoiceStatus
  total: Scalars['Float']
}

export enum InvoiceStatus {
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  PAID = 'paid',
  PENDING = 'pending',
}

export type IsAuthorized = {
  authorized: Scalars['Boolean']
  reason?: Maybe<UnauthorizedReason>
  requiredPlan?: Maybe<PlanName>
}

export type JoinNetworkInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  phone?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type JoinNetworkWithLinkInput = {
  email: Scalars['String']
  invitationLinkId: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  username?: Maybe<Scalars['String']>
}

export type JoinNetworkWithTokenInput = {
  name: Scalars['String']
  password: Scalars['String']
  token: Scalars['String']
  username?: Maybe<Scalars['String']>
}

export type LoginNetworkWithGlobalTokenInput = {
  networkId: Scalars['String']
}

export type LoginNetworkWithPasswordInput = {
  password: Scalars['String']
  usernameOrEmail: Scalars['String']
}

export type LoginSupportWithSsoCodeInput = {
  code: Scalars['String']
  hd: Scalars['String']
  prompt: Scalars['String']
  scope: Scalars['String']
  state: Scalars['String']
}

export type LoginWithSsoCodeInput = {
  code: Scalars['String']
  hd?: Maybe<Scalars['String']>
  prompt?: Maybe<Scalars['String']>
  scope?: Maybe<Scalars['String']>
  state: Scalars['String']
}

export type LogoutNetworkInput = {
  sessionId: Scalars['String']
}

export type Media = Emoji | File | Image

export type MediaUrls = {
  full: Scalars['String']
  large: Scalars['String']
  medium: Scalars['String']
  small: Scalars['String']
  thumb: Scalars['String']
}

export type Member = {
  activeSession?: Maybe<MemberSession>
  attributes: MemberAttributes
  authMemberProps?: Maybe<MemberAuthMemberProps>
  banner?: Maybe<Media>
  bannerId?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  emailStatus?: Maybe<MemberEmailStatus>
  externalId?: Maybe<Scalars['ID']>
  fields?: Maybe<CustomFields>
  id: Scalars['ID']
  lastSeen?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<Network>
  networkId: Scalars['ID']
  newEmail?: Maybe<Scalars['String']>
  overrideTeammate: Scalars['Boolean']
  profilePicture?: Maybe<Media>
  profilePictureId?: Maybe<Scalars['ID']>
  role?: Maybe<Role>
  roleId: Scalars['ID']
  sessions?: Maybe<Array<MemberSession>>
  sidebarWidgets?: Maybe<Array<Scalars['String']>>
  spaces?: Maybe<PaginatedSpace>
  status: MemberStatus
  tagline?: Maybe<Scalars['String']>
  teammate: Scalars['Boolean']
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
  verifiedAt?: Maybe<Scalars['DateTime']>
}

export type MemberSpacesArgs = {
  limit: Scalars['Int']
}

export type MemberAttributes = {
  locale: Scalars['String']
}

export type MemberAuthMemberProps = {
  context: PermissionContext
  permissions?: Maybe<Array<ActionPermissions>>
  scopes?: Maybe<Array<Scalars['String']>>
}

export type MemberEdge = {
  cursor: Scalars['String']
  node: Member
}

export enum MemberEmailStatus {
  NOT_DELIVERED = 'notDelivered',
  SENT = 'sent',
  SPAMMED = 'spammed',
  VERIFIED = 'verified',
}

export type MemberInvitation = {
  createdAt: Scalars['DateTime']
  expiresAt: Scalars['DateTime']
  id: Scalars['ID']
  invitationMessage?: Maybe<Scalars['String']>
  invitee?: Maybe<Member>
  inviteeEmail: Scalars['String']
  inviteeId?: Maybe<Scalars['ID']>
  inviteeName?: Maybe<Scalars['String']>
  inviter?: Maybe<Member>
  inviterId: Scalars['ID']
  joinedAt?: Maybe<Scalars['DateTime']>
  network?: Maybe<Network>
  networkId: Scalars['ID']
  role?: Maybe<Role>
  roleId: Scalars['ID']
  status: MemberInvitationStatus
}

export type MemberInvitationEdge = {
  cursor: Scalars['String']
  node: MemberInvitation
}

export type MemberInvitationLink = {
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  inviter?: Maybe<Member>
  link: Scalars['String']
  network?: Maybe<Network>
}

export enum MemberInvitationStatus {
  ACCEPTED = 'accepted',
  DELIVERED = 'delivered',
  NOT_DELIVERED = 'notDelivered',
  NOT_SENT = 'notSent',
  REJECTED = 'rejected',
  SENT = 'sent',
  SPAMMED = 'spammed',
}

export enum MemberListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export type MemberNetworkNotificationSettings = {
  channel: NotificationChannel
  enabled?: Maybe<Scalars['Boolean']>
  isDefault: Scalars['Boolean']
  mention?: Maybe<Scalars['Boolean']>
  reaction?: Maybe<Scalars['Boolean']>
  sameAsDefault: Scalars['Boolean']
}

export type MemberNotificationSettings = {
  network: Array<MemberNetworkNotificationSettings>
  spaces: Array<MemberSpaceNotificationSettings>
}

export type MemberPostNotificationSettings = {
  enabled?: Maybe<Scalars['Boolean']>
  memberId: Scalars['String']
  postId: Scalars['String']
}

export type MemberSession = {
  active: Scalars['Boolean']
  country?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  deviceBrand?: Maybe<Scalars['String']>
  id: Scalars['ID']
  ip: Scalars['String']
  lastActivityAt: Scalars['DateTime']
  os?: Maybe<Scalars['String']>
  osVersion?: Maybe<Scalars['String']>
}

export type MemberSpaceNotificationSettings = {
  channel: NotificationChannel
  enabled?: Maybe<Scalars['Boolean']>
  isDefault: Scalars['Boolean']
  preference?: Maybe<SpaceNotificationPreference>
  sameAsDefault: Scalars['Boolean']
  space?: Maybe<Space>
}

export enum MemberStatus {
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
  REMOVED = 'REMOVED',
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
}

export enum MemberStatusInput {
  BLOCKED = 'BLOCKED',
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
}

export enum ModerationEntityType {
  MEMBER = 'MEMBER',
  POST = 'POST',
}

export type ModerationItem = {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  entity?: Maybe<ModerationItemEntity>
  flaggedBy: FlaggedType
  id: Scalars['String']
  moderator?: Maybe<Member>
  reporters?: Maybe<PaginatedModerationItemReporter>
  spaceId?: Maybe<Scalars['String']>
  status: ModerationStatus
  updatedAt: Scalars['DateTime']
}

export type ModerationItemReportersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type ModerationItemEdge = {
  cursor: Scalars['String']
  node: ModerationItem
}

export type ModerationItemEntity = Member | Post

export type ModerationItemReporter = {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  reportCategory: ReportCategory
  reporter?: Maybe<Member>
  updatedAt: Scalars['DateTime']
}

export type ModerationItemReporterEdge = {
  cursor: Scalars['String']
  node: ModerationItemReporter
}

export type ModerationSettings = {
  customBlacklist?: Maybe<Array<Scalars['String']>>
  enableBlacklisting: Scalars['Boolean']
  useDefaultBlacklisting?: Maybe<Scalars['Boolean']>
}

export enum ModerationStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  REVIEW = 'REVIEW',
}

export type Mutation = {
  /** @deprecated This mutation will be replaced by createEmojis */
  addEmoji: Emoji
  /** @deprecated This mutation will be replaced by createEmojis */
  addEmojis: Array<Emoji>
  /** @deprecated This mutation will be replaced by createCollection */
  addGroup: Collection
  /** @deprecated This mutation will be replaced by createImages */
  addImage: SignedUrl
  /** @deprecated This mutation will be replaced by createImages */
  addImages: Array<SignedUrl>
  /** @deprecated This mutation will be replaced by createImages or createEmojis */
  addMedias: Array<SignedUrl>
  addMemberSchemaField: Network
  /** @deprecated This mutation will be replaced by createReport */
  addModerationReport: ModerationItem
  /** @deprecated This mutation will be replaced by createNetwork */
  addNetwork: AuthTokenWithOtp
  /** @deprecated This mutation will be replaced by updateNewDomain */
  addNewDomain: DomainTransferStatus
  /** @deprecated This mutation will be replaced by createPost */
  addPost: Post
  addReaction: Action
  /** @deprecated This mutation will be replaced by createReply */
  addReply: Post
  /** @deprecated This mutation will be replaced by createSpace */
  addSpace: Space
  addSpaceMembers: Array<SpaceMember>
  /** @deprecated This mutation will be replaced by createTag */
  addSpaceTopic: Tag
  addTrialPlan: Plan
  /** @deprecated This mutation will be replaced by approveSpaceMembershipRequest */
  approveSpaceJoinRequest: Action
  approveSpaceMembershipRequest: Action
  archiveMemberSchemaField: Network
  cancelEmailUpdate: Action
  changeNetworkSubscriptionPlan: Network
  clearNewDomain: Action
  clearNotificationsCount: Action
  confirmResetPassword: Action
  createAccessGroup: AccessGroup
  createCollection: Collection
  createEmojis: Array<Emoji>
  createFiles: Array<SignedUrl>
  createImages: Array<SignedUrl>
  createMigrationRequest: ImportRequest
  createNetwork: AuthTokenWithOtp
  createPage: Page
  createPermission: Permission
  /** Create a new post in a space. */
  createPost: Post
  createReply: Post
  createReport: ModerationItem
  /** Create a space inside your community. */
  createSpace: Space
  /** Create a new tag in a space. */
  createTag: Tag
  /** @deprecated This mutation will be replaced by declineSpaceMembershipRequest */
  declineSpaceJoinRequest: Action
  declineSpaceMembershipRequest: Action
  deleteAccessGroup: Action
  deleteCollection: Action
  deleteMember: Action
  deleteNetwork: Action
  deleteNotification: Action
  deleteNotifications: Action
  deletePermission: Action
  deletePost: Action
  deleteSpace: Action
  deleteSsoMembership: Action
  /** @deprecated This mutation will be replaced by updatePasswordWithToken */
  doResetPassword: Action
  /** @deprecated This mutation will be replaced by updateImage */
  editImage: Image
  extendCurrentTrial: Plan
  globalAddAppCollaborator: AppCollaborator
  globalCreateApp: App
  globalCreateEmojis: Array<Emoji>
  globalCreateImages: Array<SignedUrl>
  globalCreateWidget: Widget
  globalDeleteApp: Action
  globalDeleteAppSetting: AppSetting
  globalDeleteWidget: Action
  globalPublishAppPrivately: AppPublication
  globalRegenerateClientSecret: App
  globalRemoveAppCollaborator: Action
  globalTestAppWebhook: Action
  globalUnPublishAppPrivately: Action
  globalUpdateApp: App
  globalUpdateAppSetting: AppSetting
  globalUpdateWidget: Widget
  hidePost: Action
  impersonateLoginToNetwork: AuthInfoWithOtp
  installApp: AppInstallation
  /** Invite members to join your community. */
  inviteMembers: Array<MemberInvitation>
  joinNetwork: AuthToken
  joinNetworkWithInvitationLink: AuthToken
  joinNetworkWithToken: AuthToken
  joinSpace: Action
  leaveSpace: Action
  loginNetwork: AuthToken
  loginNetworkWithPassword: AuthToken
  loginWithSsoCode: AuthToken
  logoutNetwork: Action
  organizeCollections: Action
  /** @deprecated This mutation will be replaced by organizeSpacesInCollection */
  organizeGroupSpaces: Action
  /** @deprecated This mutation will be replaced by organizeCollections */
  organizeGroups: Action
  organizeSpacesInCollection: Action
  pinPostToSpace: Action
  pinReplyToPost: Action
  purchase: Subscription
  readNotification: Action
  readNotifications: Action
  /** @deprecated This mutation will be replaced by deleteCollection */
  removeGroup: Action
  /** @deprecated This mutation will be replaced by deleteMember */
  removeMember: Action
  /** @deprecated This mutation will be replaced by deleteNetwork */
  removeNetwork: Action
  /** @deprecated This mutation will be replaced by deletePost */
  removePost: Action
  removeReaction: Action
  /** @deprecated This mutation will be replaced by deleteSpace */
  removeSpace: Action
  removeSpaceMembers: Array<Action>
  requestGlobalTokenCode: Action
  requestSpaceMembership: SpaceJoinRequest
  resendGlobalTokenCode: Action
  resendVerification: Action
  /** @deprecated This mutation will be replaced by sendResetPasswordEmail */
  resetPassword: Action
  sendResetPasswordEmail: Action
  /** @deprecated This mutation will be replaced by loginWithSsoCode */
  ssoRedirect: AuthToken
  /** @deprecated This mutation will be replaced by loginSupportWithSsoCode */
  supportSsoRedirect: SupportAuthToken
  transferToNewDomain: Action
  unArchiveMemberSchemaField: Network
  unhidePost: Action
  uninstallApp?: Maybe<AppInstallation>
  unpinPostFromSpace: Action
  unpinReplyFromPost: Action
  unsubscribeFromNotification: Action
  /** @deprecated This mutation will be replaced by unsubscribeFromNotification */
  unsubscribeWithToken: Action
  updateAccessGroup: AccessGroup
  updateAppInstallation: AppInstallation
  updateAppNetworkSettings: AppAction
  updateAppSpaceSetting: AppAction
  updateBillingDetails: BillingDetails
  updateCollection: Action
  updateCustomSso: Sso
  updateDefaultSsoStatus: Action
  updateFile: File
  /** @deprecated This mutation will be replaced by updateCollection */
  updateGroup: Action
  updateImage: Image
  updateJwtSso: Sso
  updateMember: Member
  updateMemberNetworkNotificationSettings: MemberNetworkNotificationSettings
  updateMemberPostNotificationSettings: MemberPostNotificationSettings
  updateMemberSchemaField: Network
  updateMemberSpaceNotificationSettings: MemberSpaceNotificationSettings
  updateMemberSpaceRole: Action
  /** @deprecated This mutation will be replaced by updateModerationItem */
  updateModeration: Action
  updateModerationItem: Action
  updateModerationSettings: ModerationSettings
  updateNetwork: Network
  updateNetworkCustomCapacities: Network
  updateNetworkStatus: Action
  updateNewDomain: DomainTransferStatus
  updatePage: Page
  updatePasswordWithToken: Action
  updatePermission: Permission
  updatePost: Post
  updateSlates: Array<Slate>
  updateSpace: Space
  updateSpaceDefaultNotificationSettings: SpaceDefaultNotificationSettings
  updateSpaceHighlightedTags: Action
  /** @deprecated This mutation will be replaced by updateSpaceHighlightedTags */
  updateSpaceHighlightedTopics: Action
  /** @deprecated This mutation will be replaced by updateMemberSpaceRole */
  updateSpaceMemberRole: Action
  updateSpacePostTypes: Array<SpacePostType>
  updateSpaceTagFilter: Action
  /** @deprecated This mutation will be replaced by updateTag */
  updateSpaceTopic: Tag
  /** @deprecated This mutation will be replaced by updateSpaceTagFilter */
  updateSpaceTopicFilter: Action
  updateTag: Tag
  uploadMigrationFiles: UploadCollectionsResponse
  upsertTheme: NewTheme
  verifyMember: AuthToken
}

export type MutationAddEmojiArgs = {
  input: CreateEmojiInput
}

export type MutationAddEmojisArgs = {
  input: Array<CreateEmojiInput>
}

export type MutationAddGroupArgs = {
  input: CreateCollectionInput
}

export type MutationAddImageArgs = {
  input: CreateImageInput
}

export type MutationAddImagesArgs = {
  input: Array<CreateImageInput>
}

export type MutationAddMediasArgs = {
  input: AddMediasInput
}

export type MutationAddMemberSchemaFieldArgs = {
  input: CustomFieldSchemaInput
}

export type MutationAddModerationReportArgs = {
  input: CreateReportInput
}

export type MutationAddNetworkArgs = {
  input: AddNetworkInput
}

export type MutationAddNewDomainArgs = {
  input: DomainAvailabilityInput
}

export type MutationAddPostArgs = {
  input: CreatePostInput
  spaceId: Scalars['ID']
}

export type MutationAddReactionArgs = {
  input: AddReactionInput
  postId: Scalars['ID']
}

export type MutationAddReplyArgs = {
  input: CreatePostInput
  postId: Scalars['ID']
}

export type MutationAddSpaceArgs = {
  input: CreateSpaceInput
}

export type MutationAddSpaceMembersArgs = {
  input: Array<AddSpaceMemberInput>
  spaceId: Scalars['ID']
}

export type MutationAddSpaceTopicArgs = {
  input: CreateTagInput
  spaceId: Scalars['ID']
}

export type MutationAddTrialPlanArgs = {
  trial: AddTrialInput
}

export type MutationApproveSpaceJoinRequestArgs = {
  spaceId: Scalars['ID']
  spaceJoinRequestId: Scalars['ID']
}

export type MutationApproveSpaceMembershipRequestArgs = {
  spaceId: Scalars['ID']
  spaceMembershipRequestId: Scalars['ID']
}

export type MutationArchiveMemberSchemaFieldArgs = {
  key: Scalars['String']
}

export type MutationCancelEmailUpdateArgs = {
  id?: Maybe<Scalars['ID']>
}

export type MutationChangeNetworkSubscriptionPlanArgs = {
  name: PlanName
}

export type MutationConfirmResetPasswordArgs = {
  input: ConfirmResetPasswordInput
}

export type MutationCreateAccessGroupArgs = {
  input: CreateAccessGroupInput
}

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput
}

export type MutationCreateEmojisArgs = {
  input: Array<CreateEmojiInput>
}

export type MutationCreateFilesArgs = {
  input: Array<CreateFileInput>
}

export type MutationCreateImagesArgs = {
  input: Array<CreateImageInput>
}

export type MutationCreateMigrationRequestArgs = {
  changeMemberDetails?: Maybe<Scalars['Boolean']>
  prefixId?: Maybe<Scalars['String']>
}

export type MutationCreateNetworkArgs = {
  input: AddNetworkInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationCreatePermissionArgs = {
  input: CreatePermissionInput
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
  spaceId: Scalars['ID']
}

export type MutationCreateReplyArgs = {
  input: CreatePostInput
  postId: Scalars['ID']
}

export type MutationCreateReportArgs = {
  input: CreateReportInput
}

export type MutationCreateSpaceArgs = {
  input: CreateSpaceInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
  spaceId: Scalars['ID']
}

export type MutationDeclineSpaceJoinRequestArgs = {
  spaceId: Scalars['ID']
  spaceJoinRequestId: Scalars['ID']
}

export type MutationDeclineSpaceMembershipRequestArgs = {
  spaceId: Scalars['ID']
  spaceMembershipRequestId: Scalars['ID']
}

export type MutationDeleteAccessGroupArgs = {
  id: Scalars['ID']
}

export type MutationDeleteCollectionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteMemberArgs = {
  id: Scalars['ID']
}

export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['ID']
}

export type MutationDeleteNotificationsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>
}

export type MutationDeletePermissionArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteSpaceArgs = {
  id: Scalars['ID']
}

export type MutationDeleteSsoMembershipArgs = {
  memberId: Scalars['String']
  type: SsoType
}

export type MutationDoResetPasswordArgs = {
  input: UpdatePasswordWithTokenInput
}

export type MutationEditImageArgs = {
  imageId: Scalars['String']
  input: UpdateImageInput
}

export type MutationExtendCurrentTrialArgs = {
  newEndDate: Scalars['DateTime']
}

export type MutationGlobalAddAppCollaboratorArgs = {
  appId: Scalars['String']
  input: AddAppCollaboratorInput
}

export type MutationGlobalCreateAppArgs = {
  input: CreateAppInput
}

export type MutationGlobalCreateEmojisArgs = {
  input: Array<CreateEmojiInput>
}

export type MutationGlobalCreateImagesArgs = {
  input: Array<CreateImageInput>
}

export type MutationGlobalCreateWidgetArgs = {
  appId: Scalars['ID']
  input: CreateWidgetInput
}

export type MutationGlobalDeleteAppArgs = {
  id: Scalars['ID']
}

export type MutationGlobalDeleteAppSettingArgs = {
  context: PermissionContext
  entityId?: Maybe<Scalars['ID']>
  networkId: Scalars['ID']
}

export type MutationGlobalDeleteWidgetArgs = {
  id: Scalars['ID']
}

export type MutationGlobalPublishAppPrivatelyArgs = {
  appId: Scalars['ID']
  networkId: Scalars['ID']
}

export type MutationGlobalRegenerateClientSecretArgs = {
  appId: Scalars['ID']
}

export type MutationGlobalRemoveAppCollaboratorArgs = {
  appId: Scalars['String']
  collaboratorId: Scalars['String']
}

export type MutationGlobalTestAppWebhookArgs = {
  appId: Scalars['ID']
  input: TestAppWebhookInput
}

export type MutationGlobalUnPublishAppPrivatelyArgs = {
  appId: Scalars['ID']
  networkId: Scalars['ID']
}

export type MutationGlobalUpdateAppArgs = {
  id: Scalars['ID']
  input: UpdateAppInput
}

export type MutationGlobalUpdateAppSettingArgs = {
  context: PermissionContext
  entityId?: Maybe<Scalars['ID']>
  networkId: Scalars['ID']
  settings: Scalars['String']
}

export type MutationGlobalUpdateWidgetArgs = {
  id: Scalars['ID']
  input: UpdateWidgetInput
}

export type MutationHidePostArgs = {
  id: Scalars['ID']
}

export type MutationImpersonateLoginToNetworkArgs = {
  input: ImpersonateLoginToNetworkInput
}

export type MutationInstallAppArgs = {
  appId: Scalars['ID']
  input: InstallAppInput
}

export type MutationInviteMembersArgs = {
  input: InviteMembersInput
}

export type MutationJoinNetworkArgs = {
  input: JoinNetworkInput
}

export type MutationJoinNetworkWithInvitationLinkArgs = {
  input: JoinNetworkWithLinkInput
}

export type MutationJoinNetworkWithTokenArgs = {
  input: JoinNetworkWithTokenInput
}

export type MutationJoinSpaceArgs = {
  spaceId: Scalars['ID']
}

export type MutationLeaveSpaceArgs = {
  spaceId: Scalars['ID']
}

export type MutationLoginNetworkArgs = {
  input: LoginNetworkWithPasswordInput
}

export type MutationLoginNetworkWithPasswordArgs = {
  input: LoginNetworkWithPasswordInput
}

export type MutationLoginWithSsoCodeArgs = {
  input: LoginWithSsoCodeInput
}

export type MutationLogoutNetworkArgs = {
  input?: Maybe<LogoutNetworkInput>
}

export type MutationOrganizeCollectionsArgs = {
  ids: Array<Scalars['String']>
}

export type MutationOrganizeGroupSpacesArgs = {
  groupId: Scalars['String']
  spaceIds: Array<Scalars['String']>
}

export type MutationOrganizeGroupsArgs = {
  groupIds: Array<Scalars['String']>
}

export type MutationOrganizeSpacesInCollectionArgs = {
  collectionId: Scalars['String']
  spaceIds: Array<Scalars['String']>
}

export type MutationPinPostToSpaceArgs = {
  postId: Scalars['ID']
}

export type MutationPinReplyToPostArgs = {
  postId: Scalars['ID']
  replyId: Scalars['ID']
}

export type MutationPurchaseArgs = {
  input: PurchaseInput
}

export type MutationReadNotificationArgs = {
  notificationId: Scalars['ID']
}

export type MutationReadNotificationsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>
}

export type MutationRemoveGroupArgs = {
  groupId?: Maybe<Scalars['ID']>
}

export type MutationRemoveMemberArgs = {
  memberId: Scalars['ID']
}

export type MutationRemovePostArgs = {
  postId: Scalars['ID']
}

export type MutationRemoveReactionArgs = {
  postId: Scalars['ID']
  reaction: Scalars['String']
}

export type MutationRemoveSpaceArgs = {
  spaceId: Scalars['ID']
}

export type MutationRemoveSpaceMembersArgs = {
  memberIds: Array<Scalars['ID']>
  spaceId: Scalars['ID']
}

export type MutationRequestGlobalTokenCodeArgs = {
  input: RequestGlobalTokenInput
}

export type MutationRequestSpaceMembershipArgs = {
  spaceId: Scalars['ID']
}

export type MutationResendGlobalTokenCodeArgs = {
  input: RequestGlobalTokenInput
}

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']
}

export type MutationSsoRedirectArgs = {
  input: LoginWithSsoCodeInput
}

export type MutationSupportSsoRedirectArgs = {
  input: LoginSupportWithSsoCodeInput
}

export type MutationUnArchiveMemberSchemaFieldArgs = {
  key: Scalars['String']
}

export type MutationUnhidePostArgs = {
  id: Scalars['ID']
}

export type MutationUninstallAppArgs = {
  appInstallationId: Scalars['ID']
  reason?: Maybe<Scalars['String']>
}

export type MutationUnpinPostFromSpaceArgs = {
  postId: Scalars['ID']
}

export type MutationUnpinReplyFromPostArgs = {
  postId: Scalars['ID']
  replyId: Scalars['ID']
}

export type MutationUnsubscribeFromNotificationArgs = {
  input: UnsubscribeWithTokenInput
}

export type MutationUnsubscribeWithTokenArgs = {
  input: UnsubscribeWithTokenInput
}

export type MutationUpdateAccessGroupArgs = {
  id: Scalars['ID']
  input: UpdateAccessGroupInput
}

export type MutationUpdateAppInstallationArgs = {
  appInstallationId: Scalars['ID']
  input: UpdateAppInstallationInput
}

export type MutationUpdateAppNetworkSettingsArgs = {
  appId: Scalars['ID']
  settings: Scalars['String']
}

export type MutationUpdateAppSpaceSettingArgs = {
  appId: Scalars['ID']
  settings: Scalars['String']
  spaceId: Scalars['ID']
}

export type MutationUpdateBillingDetailsArgs = {
  input: BillingDetailsInput
}

export type MutationUpdateCollectionArgs = {
  id: Scalars['ID']
  input: UpdateCollectionInput
}

export type MutationUpdateCustomSsoArgs = {
  input: UpdateCustomSsoInput
}

export type MutationUpdateDefaultSsoStatusArgs = {
  sso: DefaultSsoType
  status: SsoStatus
}

export type MutationUpdateFileArgs = {
  id: Scalars['String']
  input: UpdateFileInput
}

export type MutationUpdateGroupArgs = {
  groupId?: Maybe<Scalars['ID']>
  input: UpdateCollectionInput
}

export type MutationUpdateImageArgs = {
  id: Scalars['String']
  input: UpdateImageInput
}

export type MutationUpdateJwtSsoArgs = {
  input: UpdateJwtSsoInput
}

export type MutationUpdateMemberArgs = {
  id?: Maybe<Scalars['ID']>
  input: UpdateMemberInput
}

export type MutationUpdateMemberNetworkNotificationSettingsArgs = {
  channel: NotificationChannel
  input: UpdateMemberNetworkNotificationSettingsInput
  memberId?: Maybe<Scalars['ID']>
}

export type MutationUpdateMemberPostNotificationSettingsArgs = {
  input: UpdateMemberPostNotificationSettingsInput
  memberId?: Maybe<Scalars['ID']>
  postId: Scalars['ID']
}

export type MutationUpdateMemberSchemaFieldArgs = {
  input: UpdateCustomFieldSchemaInput
}

export type MutationUpdateMemberSpaceNotificationSettingsArgs = {
  channel: NotificationChannel
  input: UpdateMemberSpaceNotificationSettingsInput
  memberId?: Maybe<Scalars['ID']>
  spaceId: Scalars['ID']
}

export type MutationUpdateMemberSpaceRoleArgs = {
  input: UpdateSpaceMemberRoleInput
  memberId: Scalars['ID']
  spaceId: Scalars['ID']
}

export type MutationUpdateModerationArgs = {
  id: Scalars['ID']
  input: UpdateModerationItemInput
}

export type MutationUpdateModerationItemArgs = {
  id: Scalars['ID']
  input: UpdateModerationItemInput
}

export type MutationUpdateModerationSettingsArgs = {
  input: UpdateModerationSettingsInput
}

export type MutationUpdateNetworkArgs = {
  input: UpdateNetworkInput
}

export type MutationUpdateNetworkCustomCapacitiesArgs = {
  additionalSeats?: Maybe<Scalars['Int']>
  customMemberCapacity?: Maybe<Scalars['Int']>
}

export type MutationUpdateNetworkStatusArgs = {
  input: UpdateNetworkStatusInput
}

export type MutationUpdateNewDomainArgs = {
  input: UpdateNewDomainInput
}

export type MutationUpdatePageArgs = {
  id: Scalars['String']
  input: UpdatePageInput
}

export type MutationUpdatePasswordWithTokenArgs = {
  input: UpdatePasswordWithTokenInput
}

export type MutationUpdatePermissionArgs = {
  id: Scalars['ID']
  input: UpdatePermissionInput
}

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  input: UpdatePostInput
}

export type MutationUpdateSlatesArgs = {
  input: Array<UpdateSlateInput>
}

export type MutationUpdateSpaceArgs = {
  id: Scalars['ID']
  input: UpdateSpaceInput
}

export type MutationUpdateSpaceDefaultNotificationSettingsArgs = {
  channel: NotificationChannel
  input: UpdateSpaceDefaultNotificationSettingsInput
  spaceId: Scalars['ID']
}

export type MutationUpdateSpaceHighlightedTagsArgs = {
  input: UpdateHighlightedTags
  spaceId: Scalars['ID']
}

export type MutationUpdateSpaceHighlightedTopicsArgs = {
  input: UpdateHighlightedTags
  spaceId: Scalars['ID']
}

export type MutationUpdateSpaceMemberRoleArgs = {
  input: UpdateSpaceMemberRoleInput
  memberId: Scalars['ID']
  spaceId: Scalars['ID']
}

export type MutationUpdateSpacePostTypesArgs = {
  input: UpdateSpacePostTypeInput
  spaceId: Scalars['ID']
}

export type MutationUpdateSpaceTagFilterArgs = {
  input: UpdateTagFilter
  spaceId: Scalars['ID']
}

export type MutationUpdateSpaceTopicArgs = {
  input: UpdateTagInput
  spaceId: Scalars['ID']
  topicId: Scalars['ID']
}

export type MutationUpdateSpaceTopicFilterArgs = {
  input: UpdateTagFilter
  spaceId: Scalars['ID']
}

export type MutationUpdateTagArgs = {
  id: Scalars['ID']
  input: UpdateTagInput
  spaceId: Scalars['ID']
}

export type MutationUploadMigrationFilesArgs = {
  answers?: Maybe<Scalars['Upload']>
  comments?: Maybe<Scalars['Upload']>
  posts?: Maybe<Scalars['Upload']>
  questions?: Maybe<Scalars['Upload']>
  tagSpaces?: Maybe<Scalars['Upload']>
  tags?: Maybe<Scalars['Upload']>
  users?: Maybe<Scalars['Upload']>
}

export type MutationUpsertThemeArgs = {
  input: UpsertTheme
}

export type MutationVerifyMemberArgs = {
  input: VerifyMemberInput
}

export type NavigationItem = {
  link?: Maybe<Scalars['String']>
  openInNewWindow?: Maybe<Scalars['Boolean']>
  text: Scalars['String']
  type: NavigationItemType
}

export enum NavigationItemType {
  PRIMARY_BUTTON = 'PRIMARY_BUTTON',
  PRIMARY_LINK = 'PRIMARY_LINK',
  SECONDARY_BUTTON = 'SECONDARY_BUTTON',
  TEXT_LINK = 'TEXT_LINK',
}

export type NavigationSlates = {
  footer?: Maybe<Slate>
  header: Slate
  sidebar1: Slate
  sidebar2?: Maybe<Slate>
}

export type Network = {
  activeSso?: Maybe<ActiveSso>
  activeTheme?: Maybe<NewTheme>
  additionalSeatsCapacity: Scalars['Int']
  aliases: Array<Scalars['String']>
  authMemberProps?: Maybe<NetworkAuthMemberProps>
  billingEmail?: Maybe<Scalars['String']>
  brandColor?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<Member>
  createdById: Scalars['ID']
  customCodes?: Maybe<Array<CustomCode>>
  customMemberCapacity: Scalars['Int']
  defaultSpaces?: Maybe<Array<Space>>
  description?: Maybe<Scalars['String']>
  domain: Scalars['String']
  favicon?: Maybe<Media>
  faviconId?: Maybe<Scalars['ID']>
  footer?: Maybe<Footer>
  hideDefaultAuthenticationForm: Scalars['Boolean']
  id: Scalars['ID']
  incidentEmails?: Maybe<Array<Scalars['String']>>
  industry?: Maybe<NetworkIndustryType>
  landingPages?: Maybe<NetworkSettings>
  locale: Scalars['String']
  logo?: Maybe<Media>
  logoId?: Maybe<Scalars['ID']>
  /** Calculated member capacity */
  memberCapacity: Scalars['Int']
  memberCapacityDeclared: Scalars['Int']
  memberFields?: Maybe<CustomFieldsSchema>
  members?: Maybe<PaginatedMember>
  membersCount?: Maybe<Scalars['Int']>
  membership: NetworkMembership
  name: Scalars['String']
  navigationSlates: NavigationSlates
  newDomain?: Maybe<Scalars['String']>
  organizationId?: Maybe<Scalars['String']>
  owner?: Maybe<Member>
  ownerId: Scalars['ID']
  pages?: Maybe<Array<Page>>
  privacyPolicyUrl?: Maybe<Scalars['String']>
  releaseChannel?: Maybe<NetworkReleaseChannelType>
  roles?: Maybe<Array<Role>>
  seatCapacityDeclared: Scalars['Int']
  /** Calculated seats capacity */
  seatsCapacity: Scalars['Int']
  spaces?: Maybe<PaginatedSpace>
  status: NetworkStatus
  statusLocked: Scalars['Boolean']
  statusReason?: Maybe<StatusReason>
  subscriptionPlan?: Maybe<Plan>
  systemSpaces?: Maybe<Array<Space>>
  termsOfServiceUrl?: Maybe<Scalars['String']>
  themes?: Maybe<Themes>
  topNavigation?: Maybe<TopNavigation>
  tribeBranding: Scalars['Boolean']
  visibility: NetworkVisibility
  whoCanInvite?: Maybe<Array<Role>>
  whoCanInviteIds: Array<Scalars['ID']>
}

export type NetworkCustomCodesArgs = {
  anonymize: Scalars['Boolean']
}

export type NetworkMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<MemberStatusInput>
}

export type NetworkSpacesArgs = {
  limit: Scalars['Int']
}

export type NetworkAuthMemberProps = {
  context: PermissionContext
  permissions?: Maybe<Array<ActionPermissions>>
  scopes?: Maybe<Array<Scalars['String']>>
}

export enum NetworkIndustryType {
  BLOGGER_COACH_CREATOR = 'BloggerCoachCreator',
  CONSULTING_AND_AGENCY = 'ConsultingAndAgency',
  ECOMERCE_AND_RETAIL = 'EcomerceAndRetail',
  ENTERTAINMENT_AND_EVENTS = 'EntertainmentAndEvents',
  FINANCIAN_SERVICES = 'FinancianServices',
  HEALTHCARE = 'Healthcare',
  INTERNET_AND_ONLINE_SERVICE = 'InternetAndOnlineService',
  MEDIA_AND_PUBLISHING = 'MediaAndPublishing',
  NON_PROFIT_AND_ASSOCIATION = 'NonProfitAndAssociation',
  ONLINE_TRAINING_AND_EDUCATION = 'OnlineTrainingAndEducation',
  OTHER = 'Other',
  SOFTWARE_AND_SAAS = 'SoftwareAndSaas',
}

export enum NetworkLandingPage {
  EXPLORE = 'EXPLORE',
  FEED = 'FEED',
  SPACES = 'SPACES',
}

export enum NetworkMembership {
  INVITE_ONLY = 'inviteOnly',
  OPEN = 'open',
}

export enum NetworkPrimaryMembersType {
  CUSTOMERS = 'Customers',
  EMPLOYEES = 'Employees',
  MEMBERS = 'Members',
  OTHER = 'Other',
  STUDENTS = 'Students',
}

export type NetworkPublicInfo = {
  domain: Scalars['String']
  favicon?: Maybe<Media>
  faviconId?: Maybe<Scalars['ID']>
  id: Scalars['ID']
  logo?: Maybe<Media>
  logoId?: Maybe<Scalars['ID']>
  membership: NetworkMembership
  name: Scalars['String']
  status: NetworkStatus
  systemSpaces?: Maybe<Array<Space>>
  visibility: NetworkVisibility
}

export enum NetworkReleaseChannelType {
  EDGE = 'edge',
  STABLE = 'stable',
}

export type NetworkSettings = {
  landingPageForGuest: NetworkLandingPage
  landingPageForMember: NetworkLandingPage
  landingPageForNewMember: NetworkLandingPage
}

export enum NetworkStatus {
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
}

export enum NetworkStatusChangedBy {
  ADMIN = 'admin',
  SUPPORT = 'support',
  SYSTEM = 'system',
}

export enum NetworkStatusReason {
  MEMBER_CAPACITY_EXCEEDED = 'memberCapacityExceeded',
  NETWORK_CREATED = 'networkCreated',
  NETWORK_LOCK_LIFTED = 'networkLockLifted',
  SEATS_CAPACITY_EXCEEDED = 'seatsCapacityExceeded',
}

export enum NetworkTimeframeType {
  FEW_MONTHS = 'FewMonths',
  FEW_WEEKS = 'FewWeeks',
  NOT_SURE = 'NotSure',
  VERY_SOON = 'VerySoon',
}

export enum NetworkVisibility {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export type NewTheme = {
  colors?: Maybe<ThemeColors>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  typography?: Maybe<Array<ThemeToken>>
}

export type Notification = {
  actor?: Maybe<Payload>
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  meta?: Maybe<NotificationMeta>
  object?: Maybe<Payload>
  read: Scalars['Boolean']
  space?: Maybe<Space>
  target?: Maybe<Payload>
  verb: NotificationVerb
}

export enum NotificationChannel {
  DESKTOP = 'DESKTOP',
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP',
}

export type NotificationEdge = {
  cursor: Scalars['String']
  node: Notification
}

export type NotificationMeta = {
  body: Scalars['String']
  fullTitle: Scalars['String']
  reason: NotificationReason
  relativeUrl: Scalars['String']
  textBody: Scalars['String']
  textFullTitle: Scalars['String']
  textTitle: Scalars['String']
  title: Scalars['String']
  url: Scalars['String']
}

export enum NotificationReason {
  NETWORK_ADMIN = 'NETWORK_ADMIN',
  NETWORK_SUBSCRIPTION = 'NETWORK_SUBSCRIPTION',
  POST_AUTHOR = 'POST_AUTHOR',
  POST_SUBSCRIPTION = 'POST_SUBSCRIPTION',
  SPACE_ADMIN = 'SPACE_ADMIN',
  SPACE_SUBSCRIPTION = 'SPACE_SUBSCRIPTION',
}

export enum NotificationVerb {
  COMMENT_CREATED = 'COMMENT_CREATED',
  COMMENT_DELETED = 'COMMENT_DELETED',
  COMMENT_UPDATED = 'COMMENT_UPDATED',
  JOIN_REQUEST_STATUS_UPDATED = 'JOIN_REQUEST_STATUS_UPDATED',
  MEMBER_MENTIONED = 'MEMBER_MENTIONED',
  POST_CREATED = 'POST_CREATED',
  POST_DELETED = 'POST_DELETED',
  POST_FOLLOWED = 'POST_FOLLOWED',
  POST_UPDATED = 'POST_UPDATED',
  REACTION_CREATED = 'REACTION_CREATED',
  REPLY_CREATED = 'REPLY_CREATED',
  SPACE_MEMBER_ADDED = 'SPACE_MEMBER_ADDED',
}

export type NotificationsCount = {
  new: Scalars['Float']
}

export enum NumberTypeOptions {
  INTEGER = 'integer',
  NUMBER = 'number',
}

export type Page = {
  address: PageAddress
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  layout: Scalars['String']
  networkId: Scalars['String']
  seoDetail: PageSeo
  slate: Slate
  slug: Scalars['String']
  type: PageType
  updatedAt: Scalars['DateTime']
}

export type PageAddress = {
  editable: Scalars['Boolean']
  exact: Scalars['Boolean']
  path: Scalars['String']
}

export type PageAddressInput = {
  editable?: Maybe<Scalars['Boolean']>
  exact: Scalars['Boolean']
  path: Scalars['String']
}

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
}

export type PageSeo = {
  description?: Maybe<Scalars['String']>
  image?: Maybe<Media>
  imageId?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export type PageSeoInput = {
  description?: Maybe<Scalars['String']>
  imageId?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export enum PageType {
  CUSTOM = 'CUSTOM',
  ENTITY = 'ENTITY',
  SYSTEM = 'SYSTEM',
}

export type PaginatedApp = {
  edges?: Maybe<Array<AppEdge>>
  nodes?: Maybe<Array<App>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedAppInstallation = {
  edges?: Maybe<Array<AppInstallationEdge>>
  nodes?: Maybe<Array<AppInstallation>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedMember = {
  edges?: Maybe<Array<MemberEdge>>
  nodes?: Maybe<Array<Member>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedMemberInvitation = {
  edges?: Maybe<Array<MemberInvitationEdge>>
  nodes?: Maybe<Array<MemberInvitation>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedModeration = {
  edges?: Maybe<Array<ModerationItemEdge>>
  nodes?: Maybe<Array<ModerationItem>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedModerationItemReporter = {
  edges?: Maybe<Array<ModerationItemReporterEdge>>
  nodes?: Maybe<Array<ModerationItemReporter>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedNetwork = {
  edges?: Maybe<Array<PluralNetworkEdge>>
  nodes?: Maybe<Array<PluralNetwork>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedNotification = {
  edges?: Maybe<Array<NotificationEdge>>
  nodes?: Maybe<Array<Notification>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedPluralMember = {
  edges?: Maybe<Array<PluralMemberEdge>>
  nodes?: Maybe<Array<PluralMember>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedPost = {
  edges?: Maybe<Array<PostEdge>>
  nodes?: Maybe<Array<Post>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedPostReactionParticipant = {
  edges?: Maybe<Array<PostReactionParticipantEdge>>
  nodes?: Maybe<Array<PostReactionParticipant>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedPostType = {
  edges?: Maybe<Array<PostTypeEdge>>
  nodes?: Maybe<Array<PostType>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedSpace = {
  edges?: Maybe<Array<SpaceEdge>>
  nodes?: Maybe<Array<Space>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedSpaceMember = {
  edges?: Maybe<Array<SpaceMemberEdge>>
  nodes?: Maybe<Array<SpaceMember>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedSpacePostType = {
  edges?: Maybe<Array<SpacePostTypeEdge>>
  nodes?: Maybe<Array<SpacePostType>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedTag = {
  edges?: Maybe<Array<TagEdge>>
  nodes?: Maybe<Array<Tag>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PaginatedWidget = {
  edges?: Maybe<Array<WidgetEdge>>
  nodes?: Maybe<Array<Widget>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PasswordComplexity = {
  complex: Scalars['Boolean']
}

export type PathPermissions = {
  isAuthorized: IsAuthorized
  path: Scalars['String']
}

export type Payload = {
  id: Scalars['ID']
  media?: Maybe<Media>
  member?: Maybe<Member>
  name?: Maybe<Scalars['String']>
  post?: Maybe<Post>
  space?: Maybe<Space>
  summary?: Maybe<Scalars['String']>
  type: PayloadType
}

export enum PayloadType {
  JOIN_REQUEST_STATUS = 'JOIN_REQUEST_STATUS',
  MEMBER = 'MEMBER',
  NETWORK = 'NETWORK',
  POST = 'POST',
  REACTION = 'REACTION',
  SPACE = 'SPACE',
}

export type Permission = {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  scopes: Array<Scalars['String']>
}

export enum PermissionContext {
  MEMBER = 'MEMBER',
  NETWORK = 'NETWORK',
  POST = 'POST',
  SPACE = 'SPACE',
}

export type Permissions = {
  actions: Array<ActionPermissions>
  contextAwareActions: Array<ContextPermissions>
}

export type PermissionsContextInput = {
  context: PermissionContext
  ids: Array<Scalars['String']>
}

export enum PinnedInto {
  MEMBER = 'member',
  NETWORK = 'network',
  POST = 'post',
  SPACE = 'space',
}

export type Plan = {
  createdAt: Scalars['DateTime']
  endDate?: Maybe<Scalars['DateTime']>
  extendable: Scalars['Boolean']
  memberCapacity: Scalars['Int']
  name: PlanName
  renewDate?: Maybe<Scalars['DateTime']>
  renewalType: PlanRenewalType
  seatCapacity: Scalars['Int']
  startDate: Scalars['DateTime']
  trial: Scalars['Boolean']
}

export enum PlanName {
  BASIC = 'basic',
  ENTERPRISE = 'enterprise',
  PLUS = 'plus',
  PREMIUM = 'premium',
}

export enum PlanRenewalType {
  MONTH = 'month',
  YEAR = 'year',
}

export type PluralMember = {
  activeSession?: Maybe<MemberSession>
  attributes: MemberAttributes
  authMemberProps?: Maybe<MemberAuthMemberProps>
  banner?: Maybe<Media>
  bannerId?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  emailStatus?: Maybe<MemberEmailStatus>
  externalId?: Maybe<Scalars['ID']>
  fields?: Maybe<CustomFields>
  id: Scalars['ID']
  lastSeen?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<PluralNetwork>
  networkId: Scalars['ID']
  newEmail?: Maybe<Scalars['String']>
  overrideTeammate: Scalars['Boolean']
  profilePicture?: Maybe<Media>
  profilePictureId?: Maybe<Scalars['ID']>
  role?: Maybe<Role>
  roleId: Scalars['ID']
  sessions?: Maybe<Array<MemberSession>>
  sidebarWidgets?: Maybe<Array<Scalars['String']>>
  spaces?: Maybe<PaginatedSpace>
  status: MemberStatus
  tagline?: Maybe<Scalars['String']>
  teammate: Scalars['Boolean']
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
  verifiedAt?: Maybe<Scalars['DateTime']>
}

export type PluralMemberSpacesArgs = {
  limit: Scalars['Int']
}

export type PluralMemberEdge = {
  cursor: Scalars['String']
  node: PluralMember
}

export type PluralNetwork = {
  activeSso?: Maybe<ActiveSso>
  activeTheme?: Maybe<NewTheme>
  additionalSeatsCapacity: Scalars['Int']
  aliases: Array<Scalars['String']>
  authMemberProps?: Maybe<NetworkAuthMemberProps>
  billingEmail?: Maybe<Scalars['String']>
  brandColor?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<Member>
  createdById: Scalars['ID']
  customCodes?: Maybe<Array<CustomCode>>
  customMemberCapacity: Scalars['Int']
  defaultSpaces?: Maybe<Array<Space>>
  description?: Maybe<Scalars['String']>
  domain: Scalars['String']
  favicon?: Maybe<Media>
  faviconId?: Maybe<Scalars['ID']>
  footer?: Maybe<Footer>
  globalFavicon?: Maybe<Media>
  globalLogo?: Maybe<Media>
  hideDefaultAuthenticationForm: Scalars['Boolean']
  id: Scalars['ID']
  incidentEmails?: Maybe<Array<Scalars['String']>>
  industry?: Maybe<NetworkIndustryType>
  landingPages?: Maybe<NetworkSettings>
  locale: Scalars['String']
  logo?: Maybe<Media>
  logoId?: Maybe<Scalars['ID']>
  /** Calculated member capacity */
  memberCapacity: Scalars['Int']
  memberCapacityDeclared: Scalars['Int']
  memberFields?: Maybe<CustomFieldsSchema>
  members?: Maybe<PaginatedMember>
  membersCount?: Maybe<Scalars['Int']>
  membership: NetworkMembership
  name: Scalars['String']
  navigationSlates: NavigationSlates
  newDomain?: Maybe<Scalars['String']>
  organizationId?: Maybe<Scalars['String']>
  owner?: Maybe<Member>
  ownerId: Scalars['ID']
  pages?: Maybe<Array<Page>>
  privacyPolicyUrl?: Maybe<Scalars['String']>
  releaseChannel?: Maybe<NetworkReleaseChannelType>
  roles?: Maybe<Array<Role>>
  seatCapacityDeclared: Scalars['Int']
  /** Calculated seats capacity */
  seatsCapacity: Scalars['Int']
  spaces?: Maybe<PaginatedSpace>
  status: NetworkStatus
  statusLocked: Scalars['Boolean']
  statusReason?: Maybe<StatusReason>
  subscriptionPlan?: Maybe<Plan>
  systemSpaces?: Maybe<Array<Space>>
  termsOfServiceUrl?: Maybe<Scalars['String']>
  themes?: Maybe<Themes>
  topNavigation?: Maybe<TopNavigation>
  tribeBranding: Scalars['Boolean']
  visibility: NetworkVisibility
  whoCanInvite?: Maybe<Array<Role>>
  whoCanInviteIds: Array<Scalars['ID']>
}

export type PluralNetworkCustomCodesArgs = {
  anonymize: Scalars['Boolean']
}

export type PluralNetworkMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<MemberStatusInput>
}

export type PluralNetworkSpacesArgs = {
  limit: Scalars['Int']
}

export type PluralNetworkEdge = {
  cursor: Scalars['String']
  node: PluralNetwork
}

export type Post = {
  allowedEmojis?: Maybe<Array<Scalars['String']>>
  attachmentIds: Array<Scalars['ID']>
  attachments?: Maybe<Array<File>>
  authMemberProps?: Maybe<PostAuthMemberProps>
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<SpaceMember>
  createdById: Scalars['ID']
  embedIds: Array<Scalars['String']>
  embeds?: Maybe<Array<Embed>>
  followersCount?: Maybe<Scalars['Int']>
  forbiddenEmojis?: Maybe<Array<Scalars['String']>>
  hasMoreContent: Scalars['Boolean']
  id: Scalars['ID']
  imageIds: Array<Scalars['ID']>
  isAnonymous: Scalars['Boolean']
  isHidden?: Maybe<Scalars['Boolean']>
  mappingFields?: Maybe<Array<PostMappingField>>
  mentionedMembers: Array<Scalars['String']>
  mentions?: Maybe<Array<Member>>
  negativeReactions?: Maybe<Array<Scalars['String']>>
  negativeReactionsCount: Scalars['Int']
  networkId: Scalars['ID']
  owner?: Maybe<SpaceMember>
  ownerId: Scalars['ID']
  pinnedInto: Array<PinnedInto>
  pinnedReplies?: Maybe<Array<Post>>
  positiveReactions?: Maybe<Array<Scalars['String']>>
  positiveReactionsCount: Scalars['Int']
  postType?: Maybe<PostType>
  postTypeId: Scalars['ID']
  primaryReactionType: ReactionType
  publishedAt?: Maybe<Scalars['DateTime']>
  reactions?: Maybe<Array<PostReactionDetail>>
  reactionsCount: Scalars['Int']
  repliedTo?: Maybe<Post>
  repliedToId?: Maybe<Scalars['ID']>
  repliedToIds?: Maybe<Array<Scalars['String']>>
  repliedTos?: Maybe<Array<Post>>
  replies?: Maybe<PaginatedPost>
  repliesCount: Scalars['Int']
  seoDetail: PostSeoDetail
  shortContent?: Maybe<Scalars['String']>
  sidebarWidgets?: Maybe<Array<Scalars['String']>>
  singleChoiceReactions: Array<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  space?: Maybe<Space>
  spaceId: Scalars['ID']
  status: PostStatus
  tags?: Maybe<Array<Tag>>
  title?: Maybe<Scalars['String']>
  topRepliers: Array<PostTopReplier>
  /** @deprecated This field will be replaced by tagIds */
  topicIds?: Maybe<Array<Scalars['String']>>
  totalRepliesCount: Scalars['Int']
}

export type PostRepliesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  excludePins?: Maybe<Scalars['Boolean']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<PostListOrderByEnum>
  reverse?: Maybe<Scalars['Boolean']>
}

export type PostAuthMemberProps = {
  availableReplyTypes?: Maybe<Array<PostType>>
  canReact?: Maybe<Scalars['Boolean']>
  context: PermissionContext
  memberPostNotificationSettingsEnabled?: Maybe<Scalars['Boolean']>
  permissions?: Maybe<Array<ActionPermissions>>
  scopes?: Maybe<Array<Scalars['String']>>
}

export type PostEdge = {
  cursor: Scalars['String']
  node: Post
}

export enum PostFieldsEnum {
  BOOLEAN1 = 'boolean1',
  BOOLEAN2 = 'boolean2',
  BOOLEAN3 = 'boolean3',
  BOOLEAN4 = 'boolean4',
  BOOLEAN5 = 'boolean5',
  DATE1 = 'date1',
  DATE2 = 'date2',
  DATE3 = 'date3',
  DATE4 = 'date4',
  DATE5 = 'date5',
  HTML1 = 'html1',
  HTML2 = 'html2',
  HTML3 = 'html3',
  HTML4 = 'html4',
  HTML5 = 'html5',
  HTML6 = 'html6',
  HTML7 = 'html7',
  HTML8 = 'html8',
  HTML9 = 'html9',
  HTML10 = 'html10',
  IMAGE1 = 'image1',
  IMAGE2 = 'image2',
  IMAGE3 = 'image3',
  IMAGE4 = 'image4',
  IMAGE5 = 'image5',
  NUMBER1 = 'number1',
  NUMBER2 = 'number2',
  NUMBER3 = 'number3',
  NUMBER4 = 'number4',
  NUMBER5 = 'number5',
  NUMBER_ARRAY1 = 'numberArray1',
  NUMBER_ARRAY2 = 'numberArray2',
  NUMBER_ARRAY3 = 'numberArray3',
  NUMBER_ARRAY4 = 'numberArray4',
  NUMBER_ARRAY5 = 'numberArray5',
  TEXT1 = 'text1',
  TEXT2 = 'text2',
  TEXT3 = 'text3',
  TEXT4 = 'text4',
  TEXT5 = 'text5',
  TEXT6 = 'text6',
  TEXT7 = 'text7',
  TEXT8 = 'text8',
  TEXT9 = 'text9',
  TEXT10 = 'text10',
  TEXT_ARRAY1 = 'textArray1',
  TEXT_ARRAY2 = 'textArray2',
  TEXT_ARRAY3 = 'textArray3',
  TEXT_ARRAY4 = 'textArray4',
  TEXT_ARRAY5 = 'textArray5',
}

export enum PostListFilterByEnum {
  BOOLEAN1 = 'boolean1',
  BOOLEAN2 = 'boolean2',
  BOOLEAN3 = 'boolean3',
  BOOLEAN4 = 'boolean4',
  BOOLEAN5 = 'boolean5',
  CREATED_AT = 'createdAt',
  DATE1 = 'date1',
  DATE2 = 'date2',
  DATE3 = 'date3',
  DATE4 = 'date4',
  DATE5 = 'date5',
  NUMBER1 = 'number1',
  NUMBER2 = 'number2',
  NUMBER3 = 'number3',
  NUMBER4 = 'number4',
  NUMBER5 = 'number5',
  UPDATED_AT = 'updatedAt',
}

export type PostListFilterByInput = {
  key: PostListFilterByEnum
  operator?: Maybe<PostListFilterByOperator>
  value: Scalars['String']
}

export enum PostListFilterByOperator {
  EQUALS = 'equals',
  GT = 'gt',
  GTE = 'gte',
  IN = 'in',
  LT = 'lt',
  LTE = 'lte',
  NOT = 'not',
}

export enum PostListOrderByEnum {
  BOOLEAN1 = 'boolean1',
  BOOLEAN2 = 'boolean2',
  BOOLEAN3 = 'boolean3',
  BOOLEAN4 = 'boolean4',
  BOOLEAN5 = 'boolean5',
  CREATED_AT = 'createdAt',
  DATE1 = 'date1',
  DATE2 = 'date2',
  DATE3 = 'date3',
  DATE4 = 'date4',
  DATE5 = 'date5',
  NEGATIVE_REACTIONS_COUNT = 'negativeReactionsCount',
  NUMBER1 = 'number1',
  NUMBER2 = 'number2',
  NUMBER3 = 'number3',
  NUMBER4 = 'number4',
  NUMBER5 = 'number5',
  POSITIVE_REACTIONS_COUNT = 'positiveReactionsCount',
  REACTIONS_COUNT = 'reactionsCount',
  REPLIES_COUNT = 'repliesCount',
  TEXT1 = 'text1',
  TEXT2 = 'text2',
  TEXT3 = 'text3',
  TEXT4 = 'text4',
  TEXT5 = 'text5',
  TOTAL_REPLIES_COUNT = 'totalRepliesCount',
  UPDATED_AT = 'updatedAt',
}

export type PostMappingField = {
  key: Scalars['String']
  type: PostMappingTypeEnum
  value: Scalars['String']
}

export type PostMappingFieldInput = {
  key: Scalars['String']
  type: PostMappingTypeEnum
  value: Scalars['String']
}

export enum PostMappingTypeEnum {
  BOOLEAN = 'boolean',
  DATE = 'date',
  HTML = 'html',
  IMAGE = 'image',
  NUMBER = 'number',
  NUMBER_ARRAY = 'numberArray',
  TEXT = 'text',
  TEXT_ARRAY = 'textArray',
}

export type PostReactionDetail = {
  count: Scalars['Int']
  participants?: Maybe<PaginatedPostReactionParticipant>
  reacted: Scalars['Boolean']
  reaction: Scalars['String']
}

export type PostReactionDetailParticipantsArgs = {
  limit: Scalars['Int']
}

export type PostReactionParticipant = {
  participant?: Maybe<Member>
}

export type PostReactionParticipantEdge = {
  cursor: Scalars['String']
  node: PostReactionParticipant
}

export type PostSeoDetail = {
  description?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export enum PostStatus {
  ARCHIVED = 'ARCHIVED',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
  DRAFTED = 'DRAFTED',
  PUBLISHED = 'PUBLISHED',
}

export type PostTopReplier = {
  member?: Maybe<Member>
  repliesCount: Scalars['Int']
}

export type PostType = {
  allowedEmojis?: Maybe<Array<Scalars['String']>>
  context: PostTypeContext
  createdAt: Scalars['DateTime']
  forbiddenEmojis?: Maybe<Array<Scalars['String']>>
  id: Scalars['ID']
  mappings?: Maybe<Array<PostTypeMapping>>
  name: Scalars['String']
  negativeReactions?: Maybe<Array<Scalars['String']>>
  pluralName: Scalars['String']
  positiveReactions?: Maybe<Array<Scalars['String']>>
  primaryReactionType: ReactionType
  shortContentTemplate?: Maybe<Scalars['String']>
  singleChoiceReactions: Array<Scalars['String']>
  slug: Scalars['String']
  titleTemplate?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  validReplyTypes?: Maybe<Array<PostType>>
}

export enum PostTypeContext {
  POST = 'post',
  REPLY = 'reply',
}

export type PostTypeEdge = {
  cursor: Scalars['String']
  node: PostType
}

export type PostTypeMapping = {
  default?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  field: PostFieldsEnum
  isMainContent?: Maybe<Scalars['Boolean']>
  isSearchable?: Maybe<Scalars['Boolean']>
  key: Scalars['String']
  required?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  type: PostMappingTypeEnum
}

export type Price = {
  currency: Scalars['String']
  formattedValue: Scalars['String']
  value: Scalars['Float']
}

export enum PrimaryScopes {
  ALL_ACCESS = 'ALL_ACCESS',
  IMPERSONATE_MEMBER = 'IMPERSONATE_MEMBER',
  UPDATE_NETWORK = 'UPDATE_NETWORK',
  VIEW_APP = 'VIEW_APP',
  VIEW_APP_INSTALLATION = 'VIEW_APP_INSTALLATION',
  VIEW_BILLING_SUBSCRIPTION = 'VIEW_BILLING_SUBSCRIPTION',
  VIEW_IMPORT_REQUEST = 'VIEW_IMPORT_REQUEST',
  VIEW_MEMBER = 'VIEW_MEMBER',
  VIEW_MEMBER_INVITATION = 'VIEW_MEMBER_INVITATION',
  VIEW_MODERATION = 'VIEW_MODERATION',
  VIEW_NETWORK = 'VIEW_NETWORK',
  VIEW_NETWORK_PLAN = 'VIEW_NETWORK_PLAN',
  VIEW_ORGANIZATION = 'VIEW_ORGANIZATION',
  VIEW_POST = 'VIEW_POST',
  VIEW_ROLE = 'VIEW_ROLE',
  VIEW_SPACE = 'VIEW_SPACE',
  VIEW_SPACE_COLLECTION = 'VIEW_SPACE_COLLECTION',
  VIEW_SPACE_JOIN_REQUEST = 'VIEW_SPACE_JOIN_REQUEST',
  VIEW_SPACE_MEMBERSHIP = 'VIEW_SPACE_MEMBERSHIP',
  VIEW_SPACE_ROLE = 'VIEW_SPACE_ROLE',
  VIEW_SSO = 'VIEW_SSO',
  VIEW_SSO_MEMBERSHIP = 'VIEW_SSO_MEMBERSHIP',
  VIEW_SYNC_EVENT = 'VIEW_SYNC_EVENT',
  VIEW_TRACKER = 'VIEW_TRACKER',
}

export type PurchaseInput = {
  billingDetails?: Maybe<BillingDetailsInput>
  planName: PlanName
  renewalType: PlanRenewalType
  seats: Scalars['Int']
}

export type Query = {
  accessGroup: AccessGroup
  accessGroups: Array<AccessGroup>
  app: App
  apps: PaginatedApp
  authMember: Member
  baskets: Array<Basket>
  billingDetails: BillingDetails
  cancelSubscription: Action
  /** @deprecated This query will be replaced by domainAvailability */
  checkDomainAvailability: DomainAvailability
  /** @deprecated This query will be replaced by emailAvailability */
  checkEmailAvailability: EmailAvailability
  /** @deprecated This query will be replaced by invitationLinkValidity */
  checkInvitationLinkValidity: MemberInvitationLink
  /** @deprecated This query will be replaced by memberInvitationValidity */
  checkMemberInvitationValidity: MemberInvitation
  /** @deprecated This query will be replaced by newDomainStatus */
  checkNewDomainStatus: DomainTransferStatus
  /** @deprecated This query will be replaced by passwordComplexity */
  checkPasswordComplexity: PasswordComplexity
  /** @deprecated This query will be replaced by usernameAvailability */
  checkUsernameAvailability: UsernameAvailability
  collection: Collection
  collections: Array<Collection>
  domainAvailability: DomainAvailability
  emailAvailability: EmailAvailability
  embed: Embed
  exploreSpaces: PaginatedSpace
  feed: PaginatedPost
  /** @deprecated This query will be replaced by app */
  getAppById: App
  /** @deprecated This query will be replaced by app */
  getAppBySlug: App
  getAppNetworkSettings: Scalars['String']
  getAppSpaceSettings: Scalars['String']
  getAppWidget: Widget
  getAppWidgets: PaginatedWidget
  /** @deprecated This query will be replaced by apps */
  getApps: PaginatedApp
  /** @deprecated This query will be replaced by authMember */
  getAuthMember: Member
  /** @deprecated This query will be replaced by embed */
  getEmbed: Embed
  /** @deprecated This query will be replaced by feed */
  getFeed: PaginatedPost
  /** @deprecated This query will be replaced by collection */
  getGroup: Collection
  /** @deprecated This query will be replaced by collections */
  getGroups: Array<Collection>
  /** @deprecated This query will be replaced by media */
  getMedia: Media
  /** @deprecated This query will be replaced by member */
  getMember: Member
  getMemberAppInstallations: PaginatedAppInstallation
  /** @deprecated This query will be replaced by memberInvitation */
  getMemberInvitation: MemberInvitation
  /** @deprecated This query will be replaced by memberInvitationLink */
  getMemberInvitationLink: MemberInvitationLink
  /** @deprecated This query will be replaced by memberInvitations */
  getMemberInvitations: PaginatedMemberInvitation
  /** @deprecated This query will be replaced by memberNotificationSettings */
  getMemberNetworkNotificationSettings: Array<MemberNetworkNotificationSettings>
  /** @deprecated This query will be replaced by memberNotificationSettings */
  getMemberNotificationSettings: MemberNotificationSettings
  /** @deprecated This query will be replaced by memberPosts */
  getMemberPosts: PaginatedPost
  /** @deprecated This query will be replaced by memberNotificationSettings */
  getMemberSpaceNotificationSettings: Array<MemberSpaceNotificationSettings>
  /** @deprecated This query will be replaced by memberSpaces */
  getMemberSpaces: PaginatedSpaceMember
  /** @deprecated This query will be replaced by members */
  getMembers: PaginatedMember
  /** @deprecated This query will be replaced by moderationItem */
  getModerationById: ModerationItem
  /** @deprecated This query will be replaced by moderationItemReporters */
  getModerationReporters: PaginatedModerationItemReporter
  /** @deprecated This query will be replaced by moderationSettings */
  getModerationSetting: ModerationSettings
  /** @deprecated This query will be replaced by moderationItems */
  getModerations: PaginatedModeration
  /** @deprecated This query will be replaced by network */
  getNetwork: Network
  getNetworkAppInstallations: PaginatedAppInstallation
  /** @deprecated This query will be replaced by networkApps */
  getNetworkApps: Array<App>
  /** @deprecated This query will be replaced by networkPublicInfo */
  getNetworkPublicInfo: NetworkPublicInfo
  /** @deprecated This query will be replaced by networks */
  getNetworks: PaginatedNetwork
  /** @deprecated This query will be replaced by notifications */
  getNotifications: PaginatedNotification
  /** @deprecated This query will be replaced by notificationsCount */
  getNotificationsCount: NotificationsCount
  /** @deprecated This query will be replaced by permissions */
  getPermissions: Permissions
  /** @deprecated This query will be replaced by post */
  getPost: Post
  getPostAppInstallations: PaginatedAppInstallation
  /** @deprecated This query will be replaced by postReactionParticipants */
  getPostReactionParticipants: PaginatedPostReactionParticipant
  /** @deprecated This query will be replaced by posts */
  getPosts: PaginatedPost
  /** @deprecated This query will be replaced by redirect */
  getRedirectUrl: Redirect
  /** @deprecated This query will be replaced by replies */
  getReplies: PaginatedPost
  /** @deprecated This query will be replaced by report */
  getReport: Report
  /** @deprecated This query will be replaced by roles */
  getRoles: Array<Role>
  /** @deprecated This query will be replaced by scopes */
  getScopes: Scopes
  /** @deprecated This query will be replaced by space */
  getSpace: Space
  getSpaceAppInstallations: PaginatedAppInstallation
  /** @deprecated This query will be replaced by spaceMembers */
  getSpaceMembers: PaginatedSpaceMember
  /** @deprecated This query will be replaced by memberSpaceMembershipRequest */
  getSpaceMembershipRequestForMember: Array<SpaceJoinRequest>
  /** @deprecated This query will be replaced by spaceMembershipRequests */
  getSpaceMembershipRequests: Array<SpaceJoinRequest>
  /** @deprecated This query will be replaced by spacePinnedPosts */
  getSpacePinnedPosts: Array<Post>
  /** @deprecated This query will be replaced by report */
  getSpaceReport: Report
  /** @deprecated This query will be replaced by spaceRoles */
  getSpaceRoles: Array<SpaceRole>
  /** @deprecated This query will be replaced by tagPosts */
  getSpaceTopicPosts: PaginatedPost
  /** @deprecated This query will be replaced by tags */
  getSpaceTopics: PaginatedTag
  /** @deprecated This query will be replaced by spaces */
  getSpaces: PaginatedSpace
  /** @deprecated This query will be replaced by ssoMemberships */
  getSsoMemberships: Array<SsoMembership>
  /** @deprecated This query will be replaced by supportNetworkTokens */
  getSupportNetworkTokens: SupportLimitedAuthToken
  /** @deprecated This query will be replaced by tokens */
  getTokens: AuthToken
  globalApp: App
  globalAppCollaborators: Array<AppCollaborator>
  globalAppPublications: Array<AppPublication>
  globalAppSettings: AppSetting
  globalAppWidget: Widget
  globalAppWidgets: PaginatedWidget
  globalApps: PaginatedApp
  globalEmbed: Embed
  globalEventTypes: Array<EventType>
  globalMedia: Media
  globalNetworks: PaginatedNetwork
  globalToken: GlobalToken
  /** @deprecated This query will be replaced by impersonateLoginToNetwork mutation */
  impersonateLoginToNetwork: AuthInfoWithOtp
  invitationLinkValidity: MemberInvitationLink
  invoices: Array<Invoice>
  leaderboard: Array<Member>
  limitedToken: AppToken
  /** @deprecated This query will be replaced by loginNetwork mutation */
  loginNetwork: AuthToken
  loginNetworkWithGlobalToken: AuthToken
  /** @deprecated This query will be replaced by loginNetworkWithPassword mutation */
  loginNetworkWithPassword: AuthToken
  /** @deprecated This query will be replaced by supportSsoUrl */
  loginSupportWithSso: SupportSsoUrl
  loginSupportWithSsoCode: SupportAuthToken
  /** @deprecated This query will be replaced by ssoUrl */
  loginWithSso: SsoUrl
  /** @deprecated This query will be replaced by loginWithSsoCode mutation */
  loginWithSsoCode: AuthToken
  media: Media
  member: Member
  memberInvitation: MemberInvitation
  memberInvitationLink: MemberInvitationLink
  memberInvitationValidity: MemberInvitation
  memberInvitations: PaginatedMemberInvitation
  memberNotificationSettings: MemberNotificationSettings
  memberPostNotificationSettings: MemberPostNotificationSettings
  memberPosts: PaginatedPost
  memberSpaceMembershipRequest: Array<SpaceJoinRequest>
  memberSpaces: PaginatedSpaceMember
  members: PaginatedMember
  moderationItem: ModerationItem
  moderationItemReporters: PaginatedModerationItemReporter
  moderationItems: PaginatedModeration
  moderationSettings: ModerationSettings
  network: Network
  networkApps: Array<App>
  networkPublicInfo: NetworkPublicInfo
  networks: PaginatedNetwork
  networksMembers: PaginatedPluralMember
  newDomainStatus: DomainTransferStatus
  notifications: PaginatedNotification
  notificationsCount: NotificationsCount
  pages: Array<Page>
  passwordComplexity: PasswordComplexity
  permission: Permission
  permissions: Array<Permission>
  post: Post
  postReactionParticipants: PaginatedPostReactionParticipant
  postType: PostType
  postTypes: PaginatedPostType
  posts: PaginatedPost
  redirect: Redirect
  replies: PaginatedPost
  report: Report
  roles: Array<Role>
  scopes: Scopes
  search: SearchResult
  space: Space
  spaceDefaultNotificationSettings: Array<SpaceDefaultNotificationSettings>
  spaceMembers: PaginatedSpaceMember
  spaceMembershipRequests: Array<SpaceJoinRequest>
  spacePinnedPosts: Array<Post>
  spacePostType: SpacePostType
  spacePostTypes: PaginatedSpacePostType
  spaceRoles: Array<SpaceRole>
  spaces: PaginatedSpace
  spacesByIds: Array<Space>
  ssoMemberships: Array<SsoMembership>
  ssoUrl: SsoUrl
  ssos: Array<Sso>
  subscription: Subscription
  supportNetworkTokens: SupportLimitedAuthToken
  supportSsoUrl: SupportSsoUrl
  systemSpaces: Array<Space>
  tagPosts: PaginatedPost
  tags: PaginatedTag
  tokens: AuthToken
  usernameAvailability: UsernameAvailability
  vatTypes: Array<VatTypeInfo>
}

export type QueryAccessGroupArgs = {
  id: Scalars['ID']
}

export type QueryAppArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type QueryAppsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<StoreItemStatus>
}

export type QueryBasketsArgs = {
  input: BasketsInput
}

export type QueryCheckDomainAvailabilityArgs = {
  input: DomainAvailabilityInput
}

export type QueryCheckEmailAvailabilityArgs = {
  email: Scalars['String']
}

export type QueryCheckInvitationLinkValidityArgs = {
  invitationLinkId: Scalars['String']
}

export type QueryCheckMemberInvitationValidityArgs = {
  token: Scalars['String']
}

export type QueryCheckNewDomainStatusArgs = {
  domain: Scalars['String']
}

export type QueryCheckPasswordComplexityArgs = {
  password: Scalars['String']
}

export type QueryCheckUsernameAvailabilityArgs = {
  username: Scalars['String']
}

export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryCollectionsArgs = {
  orderBy?: Maybe<CollectionListOrderByEnum>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryDomainAvailabilityArgs = {
  input: DomainAvailabilityInput
}

export type QueryEmailAvailabilityArgs = {
  email: Scalars['String']
}

export type QueryEmbedArgs = {
  input: EmbedInput
}

export type QueryExploreSpacesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  collectionId?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryFeedArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  filterBy?: Maybe<Array<PostListFilterByInput>>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  onlyMemberSpaces?: Maybe<Scalars['Boolean']>
  orderBy?: Maybe<PostListOrderByEnum>
  postTypeIds?: Maybe<Array<Scalars['String']>>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetAppByIdArgs = {
  id: Scalars['ID']
}

export type QueryGetAppBySlugArgs = {
  slug: Scalars['String']
}

export type QueryGetAppNetworkSettingsArgs = {
  appId: Scalars['ID']
}

export type QueryGetAppSpaceSettingsArgs = {
  appId: Scalars['ID']
  spaceId: Scalars['ID']
}

export type QueryGetAppWidgetArgs = {
  appId: Scalars['ID']
  widgetId: Scalars['ID']
}

export type QueryGetAppWidgetsArgs = {
  after?: Maybe<Scalars['String']>
  appId: Scalars['ID']
  before?: Maybe<Scalars['String']>
  context?: Maybe<WidgetContexts>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  position?: Maybe<WidgetPositions>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetAppsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<StoreItemStatus>
}

export type QueryGetEmbedArgs = {
  input: EmbedInput
}

export type QueryGetFeedArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  filterBy?: Maybe<Array<PostListFilterByInput>>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  onlyMemberSpaces?: Maybe<Scalars['Boolean']>
  orderBy?: Maybe<PostListOrderByEnum>
  postTypeIds?: Maybe<Array<Scalars['String']>>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetGroupArgs = {
  groupId?: Maybe<Scalars['ID']>
}

export type QueryGetMediaArgs = {
  mediaId: Scalars['ID']
}

export type QueryGetMemberArgs = {
  memberId?: Maybe<Scalars['ID']>
  username?: Maybe<Scalars['String']>
}

export type QueryGetMemberAppInstallationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<AppInstallationStatus>
}

export type QueryGetMemberInvitationArgs = {
  id: Scalars['ID']
}

export type QueryGetMemberInvitationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<MemberInvitationStatus>
}

export type QueryGetMemberNetworkNotificationSettingsArgs = {
  memberId?: Maybe<Scalars['ID']>
}

export type QueryGetMemberNotificationSettingsArgs = {
  memberId?: Maybe<Scalars['ID']>
}

export type QueryGetMemberPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId: Scalars['ID']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetMemberSpaceNotificationSettingsArgs = {
  memberId?: Maybe<Scalars['ID']>
  spaceId: Scalars['ID']
}

export type QueryGetMemberSpacesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  groupId?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId: Scalars['ID']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
}

export type QueryGetMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
  status?: Maybe<MemberStatusInput>
}

export type QueryGetModerationByIdArgs = {
  moderationId: Scalars['ID']
}

export type QueryGetModerationReportersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  moderationId: Scalars['String']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetModerationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  entityId?: Maybe<Scalars['String']>
  entityType?: Maybe<ModerationEntityType>
  flaggedBy?: Maybe<FlaggedType>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId?: Maybe<Scalars['String']>
  status?: Maybe<ModerationStatus>
}

export type QueryGetNetworkAppInstallationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<AppInstallationStatus>
}

export type QueryGetNetworkAppsArgs = {
  status?: Maybe<AppInstallationStatus>
}

export type QueryGetNetworksArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetNotificationsArgs = {
  after?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryGetPermissionsArgs = {
  contexts?: Maybe<Array<PermissionsContextInput>>
}

export type QueryGetPostArgs = {
  postId: Scalars['ID']
}

export type QueryGetPostAppInstallationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  postId: Scalars['ID']
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<AppInstallationStatus>
}

export type QueryGetPostReactionParticipantsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  postId: Scalars['ID']
  reaction: Scalars['ID']
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  excludePins?: Maybe<Scalars['Boolean']>
  filterBy?: Maybe<Array<PostListFilterByInput>>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<PostListOrderByEnum>
  postTypeIds?: Maybe<Array<Scalars['String']>>
  reverse?: Maybe<Scalars['Boolean']>
  spaceIds?: Maybe<Array<Scalars['ID']>>
}

export type QueryGetRedirectUrlArgs = {
  url: Scalars['String']
}

export type QueryGetRepliesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  excludePins?: Maybe<Scalars['Boolean']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<PostListOrderByEnum>
  postId: Scalars['ID']
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetReportArgs = {
  input: ReportInput
}

export type QueryGetScopesArgs = {
  contexts?: Maybe<Array<PermissionsContextInput>>
}

export type QueryGetSpaceArgs = {
  spaceId?: Maybe<Scalars['ID']>
  spaceSlug?: Maybe<Scalars['ID']>
}

export type QueryGetSpaceAppInstallationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId: Scalars['ID']
  status?: Maybe<AppInstallationStatus>
}

export type QueryGetSpaceMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
  spaceId: Scalars['ID']
}

export type QueryGetSpaceMembershipRequestForMemberArgs = {
  status?: Maybe<SpaceJoinRequestStatus>
}

export type QueryGetSpaceMembershipRequestsArgs = {
  spaceId: Scalars['ID']
  status?: Maybe<SpaceJoinRequestStatus>
}

export type QueryGetSpacePinnedPostsArgs = {
  spaceId: Scalars['ID']
}

export type QueryGetSpaceReportArgs = {
  input: ReportInput
  spaceId: Scalars['String']
}

export type QueryGetSpaceRolesArgs = {
  spaceId?: Maybe<Scalars['ID']>
}

export type QueryGetSpaceTopicPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId: Scalars['ID']
  topicId: Scalars['ID']
}

export type QueryGetSpaceTopicsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId: Scalars['ID']
}

export type QueryGetSpacesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId?: Maybe<Scalars['ID']>
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGetSsoMembershipsArgs = {
  memberId: Scalars['String']
}

export type QueryGetSupportNetworkTokensArgs = {
  input: CreateLimitedSupportTokenInput
}

export type QueryGetTokensArgs = {
  networkDomain?: Maybe<Scalars['String']>
  networkId?: Maybe<Scalars['ID']>
  otp?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
}

export type QueryGlobalAppArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type QueryGlobalAppCollaboratorsArgs = {
  appId: Scalars['String']
}

export type QueryGlobalAppPublicationsArgs = {
  appId: Scalars['ID']
}

export type QueryGlobalAppSettingsArgs = {
  context: PermissionContext
  entityId?: Maybe<Scalars['ID']>
  networkId: Scalars['ID']
}

export type QueryGlobalAppWidgetArgs = {
  appId: Scalars['ID']
  widgetId: Scalars['ID']
}

export type QueryGlobalAppWidgetsArgs = {
  after?: Maybe<Scalars['String']>
  appId: Scalars['ID']
  before?: Maybe<Scalars['String']>
  context?: Maybe<WidgetContexts>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  position?: Maybe<WidgetPositions>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryGlobalAppsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<StoreItemStatus>
}

export type QueryGlobalEmbedArgs = {
  input: EmbedInput
}

export type QueryGlobalMediaArgs = {
  id: Scalars['ID']
}

export type QueryGlobalNetworksArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  roleType?: Maybe<RoleType>
}

export type QueryGlobalTokenArgs = {
  input: GlobalTokenInput
}

export type QueryImpersonateLoginToNetworkArgs = {
  input: ImpersonateLoginToNetworkInput
}

export type QueryInvitationLinkValidityArgs = {
  id: Scalars['String']
}

export type QueryLeaderboardArgs = {
  input: ReportInput
}

export type QueryLimitedTokenArgs = {
  context: PermissionContext
  entityId: Scalars['String']
  impersonateMemberId?: Maybe<Scalars['String']>
  networkId: Scalars['String']
}

export type QueryLoginNetworkArgs = {
  input: LoginNetworkWithPasswordInput
}

export type QueryLoginNetworkWithGlobalTokenArgs = {
  input: LoginNetworkWithGlobalTokenInput
}

export type QueryLoginNetworkWithPasswordArgs = {
  input: LoginNetworkWithPasswordInput
}

export type QueryLoginSupportWithSsoArgs = {
  input?: Maybe<SupportSsoUrlInput>
}

export type QueryLoginSupportWithSsoCodeArgs = {
  input: LoginSupportWithSsoCodeInput
}

export type QueryLoginWithSsoArgs = {
  input: SsoUrlInput
}

export type QueryLoginWithSsoCodeArgs = {
  input: LoginWithSsoCodeInput
}

export type QueryMediaArgs = {
  id: Scalars['ID']
}

export type QueryMemberArgs = {
  id?: Maybe<Scalars['ID']>
  username?: Maybe<Scalars['String']>
}

export type QueryMemberInvitationArgs = {
  id: Scalars['ID']
}

export type QueryMemberInvitationValidityArgs = {
  token: Scalars['String']
}

export type QueryMemberInvitationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<MemberInvitationStatus>
}

export type QueryMemberNotificationSettingsArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryMemberPostNotificationSettingsArgs = {
  memberId?: Maybe<Scalars['ID']>
  postId: Scalars['ID']
}

export type QueryMemberPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId: Scalars['ID']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryMemberSpaceMembershipRequestArgs = {
  status?: Maybe<SpaceJoinRequestStatus>
}

export type QueryMemberSpacesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  collectionId?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId: Scalars['ID']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
}

export type QueryMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<MemberListOrderByEnum>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
  status?: Maybe<MemberStatusInput>
}

export type QueryModerationItemArgs = {
  id: Scalars['ID']
}

export type QueryModerationItemReportersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  moderationId: Scalars['String']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryModerationItemsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  entityId?: Maybe<Scalars['String']>
  entityType?: Maybe<ModerationEntityType>
  flaggedBy?: Maybe<FlaggedType>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId?: Maybe<Scalars['String']>
  status?: Maybe<ModerationStatus>
}

export type QueryNetworkAppsArgs = {
  status?: Maybe<AppInstallationStatus>
}

export type QueryNetworksArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryNetworksMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  roleType?: Maybe<RoleType>
  status?: Maybe<MemberStatus>
}

export type QueryNewDomainStatusArgs = {
  domain: Scalars['String']
}

export type QueryNotificationsArgs = {
  after?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryPasswordComplexityArgs = {
  password: Scalars['String']
}

export type QueryPermissionArgs = {
  id: Scalars['ID']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostReactionParticipantsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  postId: Scalars['ID']
  reaction: Scalars['ID']
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryPostTypeArgs = {
  id: Scalars['ID']
}

export type QueryPostTypesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  context?: Maybe<PostTypeContext>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  excludePins?: Maybe<Scalars['Boolean']>
  filterBy?: Maybe<Array<PostListFilterByInput>>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<PostListOrderByEnum>
  postTypeIds?: Maybe<Array<Scalars['String']>>
  reverse?: Maybe<Scalars['Boolean']>
  spaceIds?: Maybe<Array<Scalars['ID']>>
}

export type QueryRedirectArgs = {
  url: Scalars['String']
}

export type QueryRepliesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  excludePins?: Maybe<Scalars['Boolean']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<PostListOrderByEnum>
  postId: Scalars['ID']
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryReportArgs = {
  input: ReportInput
  spaceId?: Maybe<Scalars['String']>
}

export type QueryRolesArgs = {
  orderBy?: Maybe<RoleListOrderByEnum>
  reverse?: Maybe<Scalars['Boolean']>
}

export type QueryScopesArgs = {
  contexts?: Maybe<Array<PermissionsContextInput>>
}

export type QuerySearchArgs = {
  input: SearchInput
}

export type QuerySpaceArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['ID']>
}

export type QuerySpaceDefaultNotificationSettingsArgs = {
  spaceId: Scalars['ID']
}

export type QuerySpaceMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SpaceMemberListOrderByEnum>
  reverse?: Maybe<Scalars['Boolean']>
  roleIds?: Maybe<Array<Scalars['ID']>>
  spaceId: Scalars['ID']
}

export type QuerySpaceMembershipRequestsArgs = {
  spaceId: Scalars['ID']
  status?: Maybe<SpaceJoinRequestStatus>
}

export type QuerySpacePinnedPostsArgs = {
  spaceId: Scalars['ID']
}

export type QuerySpacePostTypeArgs = {
  postTypeId: Scalars['Int']
  spaceId: Scalars['Int']
}

export type QuerySpacePostTypesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  context?: Maybe<PostTypeContext>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId: Scalars['Int']
}

export type QuerySpaceRolesArgs = {
  orderBy?: Maybe<SpaceRoleListOrderByEnum>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId?: Maybe<Scalars['ID']>
}

export type QuerySpacesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  collectionId?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  memberId?: Maybe<Scalars['ID']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SpaceListOrderByEnum>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  type?: Maybe<Array<SpaceType>>
}

export type QuerySpacesByIdsArgs = {
  ids: Array<Scalars['ID']>
}

export type QuerySsoMembershipsArgs = {
  memberId: Scalars['String']
}

export type QuerySsoUrlArgs = {
  input: SsoUrlInput
}

export type QuerySsosArgs = {
  status?: Maybe<SsoStatus>
}

export type QuerySubscriptionArgs = {
  input: SubscriptionInput
}

export type QuerySupportNetworkTokensArgs = {
  networkId: Scalars['String']
}

export type QuerySupportSsoUrlArgs = {
  input?: Maybe<SupportSsoUrlInput>
}

export type QueryTagPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId?: Maybe<Scalars['ID']>
  tagId: Scalars['ID']
}

export type QueryTagsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TagListOrderByEnum>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  spaceId?: Maybe<Scalars['ID']>
}

export type QueryTokensArgs = {
  networkDomain?: Maybe<Scalars['String']>
  networkId?: Maybe<Scalars['ID']>
  otp?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
  ssoToken?: Maybe<Scalars['String']>
}

export type QueryUsernameAvailabilityArgs = {
  username: Scalars['String']
}

export enum ReactionType {
  EMOJI_BASE = 'EMOJI_BASE',
  LIKE_BASE = 'LIKE_BASE',
  VOTE_BASE = 'VOTE_BASE',
}

export type Redirect = {
  resolvedUrl: Scalars['String']
  url: Scalars['String']
}

export enum RelationTypeOptions {
  MEDIA = 'media',
  MEMBER = 'member',
  POST = 'post',
  TAG = 'tag',
}

export type Report = {
  data?: Maybe<Array<ReportData>>
  description?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['DateTime']>
  previousValue?: Maybe<Scalars['String']>
  slug: Scalars['String']
  startDate?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  tooltip?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export enum ReportCategory {
  HARASSMENT = 'HARASSMENT',
  MISINFORMATION = 'MISINFORMATION',
  NUDITY = 'NUDITY',
  SPAM = 'SPAM',
  SUICIDE = 'SUICIDE',
  TERRORISM = 'TERRORISM',
  VIOLENCE = 'VIOLENCE',
}

export type ReportData = {
  description?: Maybe<Scalars['String']>
  key: Scalars['String']
  previousValue?: Maybe<ReportDataValue>
  type: ReportDataType
  value: ReportDataValue
}

export enum ReportDataType {
  CHART_DATA = 'chartData',
  ENTITY_REPORT = 'entityReport',
  INT_VALUE = 'intValue',
  STRING_VALUE = 'stringValue',
}

export type ReportDataValue = ChartData | EntityReport | IntValue | StringValue

export type ReportInput = {
  endDate?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  slug: ReportSlug
  sort?: Maybe<ColumnSortInput>
  startDate?: Maybe<Scalars['String']>
  timeFrame?: Maybe<ReportTimeFrame>
  timeZone: Scalars['String']
}

export enum ReportSlug {
  ACTIVE_MEMBERS = 'activeMembers',
  AVERAGE_DAILY_ACTIVE_MEMBERS = 'averageDailyActiveMembers',
  HIGHLIGHTS = 'highlights',
  NEW_MEMBERS_OVER_TIME = 'newMembersOverTime',
  NEW_POSTS = 'newPosts',
  NEW_REACTIONS = 'newReactions',
  NEW_REPLIES = 'newReplies',
  POPULAR_DAYS_OF_WEEK = 'popularDaysOfWeek',
  POPULAR_HOURS_OF_DAY = 'popularHoursOfDay',
  POSTS_V_SREPLIES = 'postsVSreplies',
  TOP_MEMBERS = 'topMembers',
  TOP_POSTS = 'topPosts',
  TOP_SPACES = 'topSpaces',
  TOTAL_MEMBERS = 'totalMembers',
  TOTAL_POSTS = 'totalPosts',
  TOTAL_REACTIONS = 'totalReactions',
  TOTAL_REPLIES = 'totalReplies',
  TOTAL_VISITORS = 'totalVisitors',
  TRENDING_TAGS = 'trendingTags',
}

export enum ReportTimeFrame {
  ALL_TIME = 'allTime',
  LAST_CALENDAR_QUARTER = 'lastCalendarQuarter',
  LAST_CALENDAR_YEAR = 'lastCalendarYear',
  LAST_MONTH = 'lastMonth',
  LAST_NINETY_DAYS = 'lastNinetyDays',
  LAST_SEVEN_DAYS = 'lastSevenDays',
  LAST_THIRTY_DAYS = 'lastThirtyDays',
  LAST_TWELVE_MONTH = 'lastTwelveMonth',
  LAST_WEEK = 'lastWeek',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
}

export type ReportableEntity = Member | Post | Space | Tag

export enum ReportableEntityType {
  MEMBER = 'member',
  POST = 'post',
  SPACE = 'space',
  TOPIC = 'topic',
}

export type RequestGlobalTokenInput = {
  email: Scalars['String']
}

export type ResetPasswordInput = {
  email: Scalars['String']
}

export enum RichTextTypeOptions {
  HTML = 'html',
  MARKUP = 'markup',
}

export type Role = {
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  scopes: Array<Scalars['String']>
  type?: Maybe<RoleType>
  visible: Scalars['Boolean']
}

export enum RoleListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export enum RoleType {
  ADMIN = 'admin',
  GUEST = 'guest',
  MEMBER = 'member',
  MODERATOR = 'moderator',
}

export type Scopes = {
  contextAwareScopes: Array<ContextScopes>
  scopes: Array<Scalars['String']>
}

export type SearchEntity = {
  by?: Maybe<By>
  content?: Maybe<Scalars['String']>
  created: Scalars['DateTime']
  entityId: Scalars['String']
  entityType: SearchEntityType
  id: Scalars['ID']
  in?: Maybe<In>
  media?: Maybe<Media>
  subtitle?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export type SearchEntityGroup = {
  entityType: SearchEntityType
  hits: Array<SearchEntity>
}

export enum SearchEntityType {
  MEMBER = 'member',
  POST = 'post',
  SPACE = 'space',
}

export type SearchInput = {
  filters?: Maybe<Array<FiltersInput>>
  query: Scalars['String']
}

export type SearchResult = {
  hits: Array<SearchEntityGroup>
  totalCount: Scalars['Float']
}

export type SignedUrl = {
  fields: Scalars['String']
  mediaDownloadUrl: Scalars['String']
  mediaId: Scalars['ID']
  mediaUrl: Scalars['String']
  signedUrl: Scalars['String']
  urls?: Maybe<MediaUrls>
}

export type Slate = {
  acceptsAfter?: Maybe<Scalars['Boolean']>
  acceptsBefore?: Maybe<Scalars['Boolean']>
  components: Array<SlateComponentOrPlaceholder>
  editable?: Maybe<SlateEditable>
  id: Scalars['String']
  rootComponents: Array<Scalars['String']>
}

export type SlateComponent = {
  acceptsAfter?: Maybe<Scalars['Boolean']>
  acceptsBefore?: Maybe<Scalars['Boolean']>
  acceptsChildren?: Maybe<Scalars['Boolean']>
  children?: Maybe<Scalars['String']>
  id: Scalars['String']
  name: Scalars['String']
  output?: Maybe<Scalars['String']>
  props?: Maybe<Scalars['String']>
  removable?: Maybe<Scalars['Boolean']>
}

export type SlateComponentInput = {
  acceptsAfter?: Maybe<Scalars['Boolean']>
  acceptsBefore?: Maybe<Scalars['Boolean']>
  acceptsChildren?: Maybe<Scalars['Boolean']>
  children?: Maybe<Scalars['String']>
  id: Scalars['String']
  name: Scalars['String']
  output?: Maybe<Scalars['String']>
  props?: Maybe<Scalars['String']>
  removable?: Maybe<Scalars['Boolean']>
}

export type SlateComponentOrPlaceholder = SlateComponent | SlatePlaceholder

export enum SlateEditable {
  ADD_COMPONENT = 'addComponent',
  ALL = 'all',
  EDIT_COMPONENT = 'editComponent',
  NONE = 'none',
}

export type SlateInput = {
  acceptsAfter?: Maybe<Scalars['Boolean']>
  acceptsBefore?: Maybe<Scalars['Boolean']>
  components: Array<SlateComponentInput>
  editable?: Maybe<SlateEditable>
  id: Scalars['String']
  rootComponents: Array<Scalars['String']>
}

export type SlatePlaceholder = {
  id: Scalars['String']
  slate: Scalars['String']
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Space = {
  address: SpaceAddress
  authMemberProps?: Maybe<SpaceAuthMemberProps>
  banner?: Maybe<Media>
  bannerId?: Maybe<Scalars['ID']>
  collection?: Maybe<Collection>
  createdAt: Scalars['DateTime']
  createdBy?: Maybe<Member>
  createdById: Scalars['ID']
  customOrderingIndexInGroup: Scalars['Float']
  description?: Maybe<Scalars['String']>
  groupId?: Maybe<Scalars['ID']>
  hidden?: Maybe<Scalars['Boolean']>
  highlightedTags?: Maybe<Array<HighlightedTag>>
  id: Scalars['ID']
  image?: Maybe<Media>
  imageId?: Maybe<Scalars['ID']>
  installedApps?: Maybe<PaginatedAppInstallation>
  inviteOnly?: Maybe<Scalars['Boolean']>
  layout: Scalars['String']
  members?: Maybe<PaginatedSpaceMember>
  membersCount: Scalars['Int']
  name: Scalars['String']
  network?: Maybe<Network>
  networkId: Scalars['ID']
  nonAdminsCanInvite?: Maybe<Scalars['Boolean']>
  pinnedPosts?: Maybe<Array<Post>>
  posts?: Maybe<PaginatedPost>
  postsCount?: Maybe<Scalars['Int']>
  private?: Maybe<Scalars['Boolean']>
  roles?: Maybe<Array<SpaceRole>>
  seoDetail?: Maybe<SpaceSeoDetail>
  sidebarWidgets?: Maybe<Array<Scalars['String']>>
  slate?: Maybe<Slate>
  slug: Scalars['String']
  tagFilter?: Maybe<TagFilter>
  tags?: Maybe<PaginatedTag>
  type: SpaceType
  whoCanPost?: Maybe<Array<Scalars['ID']>>
  whoCanReact?: Maybe<Array<Scalars['ID']>>
  whoCanReply?: Maybe<Array<Scalars['ID']>>
}

export type SpaceInstalledAppsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  reverse?: Maybe<Scalars['Boolean']>
  status?: Maybe<AppInstallationStatus>
}

export type SpaceMembersArgs = {
  limit: Scalars['Int']
}

export type SpacePostsArgs = {
  excludePins?: Maybe<Scalars['Boolean']>
  limit: Scalars['Int']
}

export type SpaceTagsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<TagListOrderByEnum>
  query?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

export type SpaceAddress = {
  editable: Scalars['Boolean']
  exact: Scalars['Boolean']
  path: Scalars['String']
}

export type SpaceAddressInput = {
  editable?: Maybe<Scalars['Boolean']>
  exact: Scalars['Boolean']
  path: Scalars['String']
}

export type SpaceAuthMemberProps = {
  availablePostTypes?: Maybe<Array<PostType>>
  context: PermissionContext
  membershipStatus?: Maybe<SpaceMembershipStatus>
  permissions?: Maybe<Array<ActionPermissions>>
  scopes?: Maybe<Array<Scalars['String']>>
}

export type SpaceDefaultNotificationSettings = {
  channel: NotificationChannel
  enabled?: Maybe<Scalars['Boolean']>
  isDefault: Scalars['Boolean']
  preference?: Maybe<SpaceNotificationPreference>
  sameAsDefault: Scalars['Boolean']
}

export type SpaceEdge = {
  cursor: Scalars['String']
  node: Space
}

export type SpaceJoinRequest = {
  id: Scalars['ID']
  member?: Maybe<Member>
  spaceId: Scalars['ID']
  status: SpaceJoinRequestStatus
}

export enum SpaceJoinRequestStatus {
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}

export enum SpaceListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  CUSTOM_ORDERING_INDEX = 'CUSTOM_ORDERING_INDEX',
  UPDATED_AT = 'UPDATED_AT',
}

export type SpaceMember = {
  member?: Maybe<Member>
  role?: Maybe<SpaceRole>
  space?: Maybe<Space>
}

export type SpaceMemberEdge = {
  cursor: Scalars['String']
  node: SpaceMember
}

export enum SpaceMemberListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export enum SpaceMembershipStatus {
  JOINED = 'joined',
  NOT_JOINED = 'notJoined',
  REQUESTED = 'requested',
}

export enum SpaceNotificationPreference {
  ALL = 'ALL',
  NEW_POST = 'NEW_POST',
  NONE = 'NONE',
}

export type SpacePostType = {
  postType?: Maybe<PostType>
  postTypeId: Scalars['ID']
  space?: Maybe<Space>
  spaceId: Scalars['ID']
  whoCanPost?: Maybe<Array<Scalars['ID']>>
  whoCanReact?: Maybe<Array<Scalars['ID']>>
  whoCanReply?: Maybe<Array<Scalars['ID']>>
}

export type SpacePostTypeEdge = {
  cursor: Scalars['String']
  node: SpacePostType
}

export type SpaceRole = {
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  network?: Maybe<Network>
  scopes: Array<Scalars['String']>
  type?: Maybe<SpaceRoleType>
}

export enum SpaceRoleListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export enum SpaceRoleType {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export type SpaceSeoDetail = {
  description?: Maybe<Scalars['String']>
  image?: Maybe<Media>
  title: Scalars['String']
}

export type SpaceSeoDetailInput = {
  description?: Maybe<Scalars['String']>
  imageId?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export enum SpaceType {
  CUSTOM = 'CUSTOM',
  ENTITY = 'ENTITY',
  SYSTEM = 'SYSTEM',
}

export type Sso = {
  authorizationUrl?: Maybe<Scalars['String']>
  buttonText?: Maybe<Scalars['String']>
  clientId?: Maybe<Scalars['String']>
  clientSecret?: Maybe<Scalars['String']>
  idpUrl?: Maybe<Scalars['String']>
  logoutUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  provider?: Maybe<SsoProvider>
  scopes?: Maybe<Array<Scalars['String']>>
  settingsUrl?: Maybe<Scalars['String']>
  status: SsoStatus
  tokenUrl?: Maybe<Scalars['String']>
  type: SsoType
  userProfileUrl?: Maybe<Scalars['String']>
}

export type SsoMembership = {
  id: Scalars['String']
  memberId: Scalars['String']
  ssoType: SsoType
}

export enum SsoProvider {
  AUTH0 = 'auth0',
  CUSTOM = 'custom',
  MEMBERFUL = 'memberful',
  OKTA = 'okta',
  OUTSETA = 'outseta',
  WORDPRESS = 'wordpress',
}

export enum SsoStatus {
  DISABLE = 'disable',
  ENABLE = 'enable',
}

export enum SsoType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  JWT = 'jwt',
  LINKEDIN = 'linkedin',
  OAUTH2 = 'oauth2',
}

export type SsoUrl = {
  url: Scalars['String']
}

export type SsoUrlInput = {
  callbackUrl?: Maybe<Scalars['String']>
  type: SsoType
}

export type StatusReason = {
  changedAt: Scalars['DateTime']
  changedBy: NetworkStatusChangedBy
  changedById?: Maybe<Scalars['String']>
  reason?: Maybe<NetworkStatusReason>
}

export enum StoreItemStanding {
  OFFICIAL = 'OFFICIAL',
  REGULAR = 'REGULAR',
  VERIFIED = 'VERIFIED',
}

export enum StoreItemStatus {
  DELETED = 'DELETED',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export type StringValue = {
  string: Scalars['String']
}

export type Subscription = {
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  status: SubscriptionStatus
  updatedAt: Scalars['DateTime']
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  FAILED = 'failed',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}

export type SupportAuthToken = {
  accessToken: Scalars['String']
  refreshToken: Scalars['String']
}

export type SupportLimitedAuthToken = {
  accessToken: Scalars['String']
  member: Member
}

export type SupportSsoUrl = {
  url: Scalars['String']
}

export type SupportSsoUrlInput = {
  callbackUrl?: Maybe<Scalars['String']>
}

export type Tag = {
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  slug: Scalars['String']
  title: Scalars['String']
}

export type TagEdge = {
  cursor: Scalars['String']
  node: Tag
}

export type TagFilter = {
  filterType: TagFilterType
  filters: Array<Scalars['String']>
}

export enum TagFilterType {
  BLACKLIST = 'BLACKLIST',
  WHITELIST = 'WHITELIST',
}

export enum TagListOrderByEnum {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export type TestAppWebhookInput = {
  webhookUrl: Scalars['String']
}

export enum TextTypeOptions {
  FULL_TEXT = 'fullText',
  SHORT_TEXT = 'shortText',
}

export type Theme = {
  name: Scalars['String']
  status: ThemeStatus
  tokens: ThemeTokens
}

export type ThemeColor = {
  key: Scalars['String']
  weights: Array<ThemeToken>
}

export type ThemeColors = {
  dark?: Maybe<Array<ThemeColor>>
  light?: Maybe<Array<ThemeColor>>
}

export enum ThemeStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export type ThemeToken = {
  key: Scalars['String']
  value: Scalars['String']
}

export type ThemeTokens = {
  breakpoints?: Maybe<Array<ThemeToken>>
  colors?: Maybe<Array<ThemeToken>>
  fontSizes?: Maybe<Array<ThemeToken>>
  fontWeights?: Maybe<Array<ThemeToken>>
  opacity?: Maybe<Array<ThemeToken>>
  shadows?: Maybe<Array<ThemeToken>>
  sizes?: Maybe<Array<ThemeToken>>
  textStyles?: Maybe<Array<ThemeToken>>
  zIndices?: Maybe<Array<ThemeToken>>
}

export type Themes = {
  active: Theme
  drafts?: Maybe<Array<Theme>>
  published: Array<Theme>
}

export type TopNavigation = {
  alignment: TopNavigationAlignment
  enabled: Scalars['Boolean']
  items: Array<NavigationItem>
}

export enum TopNavigationAlignment {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum UnauthorizedReason {
  ACCESS = 'ACCESS',
  PLAN = 'PLAN',
}

export enum UnsubscribeTokenContext {
  ALL = 'ALL',
  MEMBER = 'MEMBER',
  MENTIONS = 'MENTIONS',
  POST = 'POST',
  REACTIONS = 'REACTIONS',
  SPACE = 'SPACE',
}

export type UnsubscribeWithTokenInput = {
  context: UnsubscribeTokenContext
  entityId?: Maybe<Scalars['String']>
  token: Scalars['String']
}

export type UpdateAccessGroupInput = {
  description?: Maybe<Scalars['String']>
  entityId?: Maybe<Scalars['ID']>
  entityType?: Maybe<AccessGroupEntityType>
  info?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type UpdateAppCustomCodes = {
  body?: Maybe<Scalars['String']>
  head?: Maybe<Scalars['String']>
}

export type UpdateAppInput = {
  about?: Maybe<Scalars['String']>
  authorName?: Maybe<Scalars['String']>
  authorUrl?: Maybe<Scalars['String']>
  bannerId?: Maybe<Scalars['String']>
  comingSoon?: Maybe<Scalars['Boolean']>
  customCodes?: Maybe<UpdateAppCustomCodes>
  description?: Maybe<Scalars['String']>
  docsUrl?: Maybe<Scalars['String']>
  enabledContexts?: Maybe<Array<PermissionContext>>
  faviconId?: Maybe<Scalars['String']>
  imageId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  privacyPolicyUrl?: Maybe<Scalars['String']>
  requiredPermissions?: Maybe<Array<PrimaryScopes>>
  requiredPlan?: Maybe<PlanName>
  slug?: Maybe<Scalars['String']>
  termsOfServiceUrl?: Maybe<Scalars['String']>
  webhookSubscriptions?: Maybe<Array<Scalars['String']>>
  webhookUrl?: Maybe<Scalars['String']>
}

export type UpdateAppInstallationInput = {
  permissions?: Maybe<Array<Scalars['String']>>
}

export type UpdateCollectionInput = {
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type UpdateCustomFieldSchemaInput = {
  default?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  readPrivacy?: Maybe<CustomFieldPrivacyInput>
  required?: Maybe<Scalars['Boolean']>
  settings?: Maybe<Array<CustomFieldSettingsInput>>
  validators?: Maybe<Array<CustomFieldValidatorInput>>
  writePrivacy?: Maybe<CustomFieldPrivacyInput>
}

export type UpdateCustomSsoInput = {
  authorizationUrl?: Maybe<Scalars['String']>
  buttonText?: Maybe<Scalars['String']>
  clientId?: Maybe<Scalars['String']>
  clientSecret?: Maybe<Scalars['String']>
  idpUrl?: Maybe<Scalars['String']>
  logoutUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  provider?: Maybe<SsoProvider>
  scopes?: Maybe<Array<Scalars['String']>>
  settingsUrl?: Maybe<Scalars['String']>
  status?: Maybe<SsoStatus>
  tokenUrl?: Maybe<Scalars['String']>
  type: CustomSsoType
  userProfileUrl?: Maybe<Scalars['String']>
}

export type UpdateFileInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateFooter = {
  urls: Array<UpdateFooterUrl>
}

export type UpdateFooterUrl = {
  title: Scalars['String']
  url: Scalars['String']
}

export type UpdateHighlightedTags = {
  highlightedTags: Array<CreateHighlightedTag>
}

export type UpdateImageInput = {
  cropHeight?: Maybe<Scalars['Int']>
  cropWidth?: Maybe<Scalars['Int']>
  cropX?: Maybe<Scalars['Int']>
  cropY?: Maybe<Scalars['Int']>
  cropZoom?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
}

export type UpdateJwtSsoInput = {
  status: SsoStatus
}

export type UpdateMemberAttributesInput = {
  locale?: Maybe<Scalars['String']>
}

export type UpdateMemberInput = {
  attributes?: Maybe<UpdateMemberAttributesInput>
  bannerId?: Maybe<Scalars['String']>
  currentPassword?: Maybe<Scalars['String']>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  fields?: Maybe<CustomFieldsInput>
  name?: Maybe<Scalars['String']>
  newPassword?: Maybe<Scalars['String']>
  profilePictureId?: Maybe<Scalars['String']>
  roleId?: Maybe<Scalars['ID']>
  tagline?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateMemberNetworkNotificationSettingsInput = {
  enabled?: Maybe<Scalars['Boolean']>
  mention?: Maybe<Scalars['Boolean']>
  /** Required if channel is DESKTOP */
  options?: Maybe<UpdateMemberNetworkNotificationSettingsOptionsInput>
  reaction?: Maybe<Scalars['Boolean']>
  sameAsDefault?: Maybe<Scalars['Boolean']>
}

export type UpdateMemberNetworkNotificationSettingsOptionsInput = {
  /** Required if channel is DESKTOP */
  fcmDeviceToken?: Maybe<Scalars['String']>
}

export type UpdateMemberPostNotificationSettingsInput = {
  enabled?: Maybe<Scalars['Boolean']>
}

export type UpdateMemberSpaceNotificationSettingsInput = {
  enabled?: Maybe<Scalars['Boolean']>
  preference?: Maybe<SpaceNotificationPreference>
  sameAsDefault?: Maybe<Scalars['Boolean']>
}

export type UpdateModerationItemInput = {
  changeStatusReason?: Maybe<Scalars['String']>
  status: ModerationStatus
}

export type UpdateModerationSettingsInput = {
  customBlacklist?: Maybe<Array<Scalars['String']>>
  enableBlacklisting?: Maybe<Scalars['Boolean']>
  useDefaultBlacklisting?: Maybe<Scalars['Boolean']>
}

export type UpdateNavigationItem = {
  link?: Maybe<Scalars['String']>
  openInNewWindow?: Maybe<Scalars['Boolean']>
  text: Scalars['String']
  type: NavigationItemType
}

export type UpdateNetworkInput = {
  aliases?: Maybe<Array<Scalars['String']>>
  billingEmail?: Maybe<Scalars['String']>
  brandColor?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  defaultSpaceIds?: Maybe<Array<Scalars['ID']>>
  description?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  entrancePage?: Maybe<Scalars['String']>
  faviconId?: Maybe<Scalars['String']>
  footer?: Maybe<UpdateFooter>
  hideDefaultAuthenticationForm?: Maybe<Scalars['Boolean']>
  incidentEmails?: Maybe<Array<Scalars['String']>>
  industry?: Maybe<NetworkIndustryType>
  landingPages?: Maybe<UpdateNetworkSettingsInput>
  locale?: Maybe<Scalars['String']>
  logoId?: Maybe<Scalars['String']>
  membership?: Maybe<NetworkMembership>
  name?: Maybe<Scalars['String']>
  newDomain?: Maybe<Scalars['String']>
  primaryMembers?: Maybe<NetworkPrimaryMembersType>
  privacyPolicyUrl?: Maybe<Scalars['String']>
  referrer?: Maybe<Scalars['String']>
  releaseChannel?: Maybe<NetworkReleaseChannelType>
  termsOfServiceUrl?: Maybe<Scalars['String']>
  themes?: Maybe<UpdateThemes>
  timeframe?: Maybe<NetworkTimeframeType>
  topNavigation?: Maybe<UpdateTopNavigation>
  tribeBranding?: Maybe<Scalars['Boolean']>
  utmCampaign?: Maybe<Scalars['String']>
  utmContent?: Maybe<Scalars['String']>
  utmMedium?: Maybe<Scalars['String']>
  utmSource?: Maybe<Scalars['String']>
  utmTerm?: Maybe<Scalars['String']>
  visibility?: Maybe<NetworkVisibility>
  whoCanInviteIds?: Maybe<Array<Scalars['String']>>
}

export type UpdateNetworkSettingsInput = {
  landingPageForGuest?: Maybe<NetworkLandingPage>
  landingPageForMember?: Maybe<NetworkLandingPage>
  landingPageForNewMember?: Maybe<NetworkLandingPage>
}

export type UpdateNetworkStatusInput = {
  status: NetworkStatus
  statusLocked?: Maybe<Scalars['Boolean']>
}

export type UpdateNewDomainInput = {
  domain: Scalars['String']
}

export type UpdatePageInput = {
  address?: Maybe<PageAddressInput>
  layout?: Maybe<Scalars['String']>
  seoDetail?: Maybe<PageSeoInput>
  slate?: Maybe<SlateInput>
}

export type UpdatePasswordWithTokenInput = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type UpdatePermissionInput = {
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
}

export type UpdatePostInput = {
  attachmentIds?: Maybe<Array<Scalars['String']>>
  mappingFields?: Maybe<Array<PostMappingFieldInput>>
  publish?: Maybe<Scalars['Boolean']>
  seoDetail?: Maybe<UpdatePostSeoDetailInput>
  tagNames?: Maybe<Array<Scalars['String']>>
}

export type UpdatePostSeoDetailInput = {
  description?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type UpdateSlateInput = {
  addedComponents?: Maybe<Array<SlateComponentInput>>
  id: Scalars['String']
  removedComponentIds?: Maybe<Array<Scalars['String']>>
  rootComponents?: Maybe<Array<Scalars['String']>>
  updatedComponents?: Maybe<Array<SlateComponentInput>>
}

export type UpdateSpaceDefaultNotificationSettingsInput = {
  enabled?: Maybe<Scalars['Boolean']>
  preference?: Maybe<SpaceNotificationPreference>
  sameAsDefault?: Maybe<Scalars['Boolean']>
}

export type UpdateSpaceInput = {
  address?: Maybe<SpaceAddressInput>
  bannerId?: Maybe<Scalars['String']>
  collectionId?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  hidden?: Maybe<Scalars['Boolean']>
  imageId?: Maybe<Scalars['String']>
  inviteOnly?: Maybe<Scalars['Boolean']>
  layout?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nonAdminsCanInvite?: Maybe<Scalars['Boolean']>
  private?: Maybe<Scalars['Boolean']>
  seoDetail?: Maybe<UpdateSpaceSeoDetailInput>
  slate?: Maybe<SlateInput>
  slug?: Maybe<Scalars['String']>
  type?: Maybe<SpaceType>
  whoCanPost?: Maybe<Array<Scalars['ID']>>
  whoCanReact?: Maybe<Array<Scalars['ID']>>
  whoCanReply?: Maybe<Array<Scalars['ID']>>
  withRoles?: Maybe<Scalars['Boolean']>
}

export type UpdateSpaceMemberRoleInput = {
  roleId: Scalars['String']
}

export type UpdateSpacePostTypeInput = {
  postTypeId: Scalars['ID']
  whoCanPost?: Maybe<Array<Scalars['ID']>>
  whoCanReact?: Maybe<Array<Scalars['ID']>>
  whoCanReply?: Maybe<Array<Scalars['ID']>>
}

export type UpdateSpaceSeoDetailInput = {
  description?: Maybe<Scalars['String']>
  imageId?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type UpdateTagFilter = {
  filterType: TagFilterType
  filters: Array<Scalars['String']>
}

export type UpdateTagInput = {
  description?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type UpdateTheme = {
  name: Scalars['String']
  status: ThemeStatus
  tokens: UpdateThemeTokens
}

export type UpdateThemeColor = {
  key: Scalars['String']
  weights: Array<UpdateThemeToken>
}

export type UpdateThemeColors = {
  dark?: Maybe<Array<UpdateThemeColor>>
  light?: Maybe<Array<UpdateThemeColor>>
}

export type UpdateThemeToken = {
  key: Scalars['String']
  value: Scalars['String']
}

export type UpdateThemeTokens = {
  breakpoints?: Maybe<Array<UpdateThemeToken>>
  colors?: Maybe<Array<UpdateThemeToken>>
  fontSizes?: Maybe<Array<UpdateThemeToken>>
  fontWeights?: Maybe<Array<UpdateThemeToken>>
  opacity?: Maybe<Array<UpdateThemeToken>>
  shadows?: Maybe<Array<UpdateThemeToken>>
  sizes?: Maybe<Array<UpdateThemeToken>>
  textStyles?: Maybe<Array<UpdateThemeToken>>
  zIndices?: Maybe<Array<UpdateThemeToken>>
}

export type UpdateThemes = {
  active: UpdateTheme
  drafts: Array<UpdateTheme>
  published: Array<UpdateTheme>
}

export type UpdateTopNavigation = {
  alignment: TopNavigationAlignment
  enabled: Scalars['Boolean']
  items: Array<UpdateNavigationItem>
}

export type UpdateWidgetInput = {
  context?: Maybe<WidgetContexts>
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<WidgetPositions>
  url?: Maybe<Scalars['String']>
}

export type UploadCollectionError = {
  message: Scalars['String']
  name: Scalars['String']
}

export type UploadCollectionResponse = {
  error?: Maybe<UploadCollectionError>
  key: Scalars['String']
  status: ActionStatus
}

export type UploadCollectionsResponse = {
  responses: Array<UploadCollectionResponse>
}

export type UpsertTheme = {
  active?: Maybe<Scalars['Boolean']>
  colors?: Maybe<UpdateThemeColors>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  typography?: Maybe<Array<UpdateThemeToken>>
}

export type UsernameAvailability = {
  available: Scalars['Boolean']
}

export type ValuePermissions = {
  isAuthorized: IsAuthorized
  value: Scalars['String']
}

export type Vat = {
  text: Scalars['String']
  vatId: Scalars['String']
  vatType: VatType
}

export type VatInput = {
  vatId: Scalars['String']
  vatType: VatType
}

export enum VatType {
  AE_TRN = 'ae_trn',
  AU_ABN = 'au_abn',
  AU_ARN = 'au_arn',
  BR_CNPJ = 'br_cnpj',
  BR_CPF = 'br_cpf',
  CA_BN = 'ca_bn',
  CA_GST_HST = 'ca_gst_hst',
  CA_PST_BC = 'ca_pst_bc',
  CA_PST_MB = 'ca_pst_mb',
  CA_PST_SK = 'ca_pst_sk',
  CA_QST = 'ca_qst',
  CH_VAT = 'ch_vat',
  CL_TIN = 'cl_tin',
  ES_CIF = 'es_cif',
  EU_VAT = 'eu_vat',
  GB_VAT = 'gb_vat',
  HK_BR = 'hk_br',
  ID_NPWP = 'id_npwp',
  IL_VAT = 'il_vat',
  IN_GST = 'in_gst',
  JP_CN = 'jp_cn',
  JP_RN = 'jp_rn',
  KR_BRN = 'kr_brn',
  LI_UID = 'li_uid',
  MX_RFC = 'mx_rfc',
  MY_FRP = 'my_frp',
  MY_ITN = 'my_itn',
  MY_SST = 'my_sst',
  NO_VAT = 'no_vat',
  NZ_GST = 'nz_gst',
  RU_INN = 'ru_inn',
  RU_KPP = 'ru_kpp',
  SA_VAT = 'sa_vat',
  SG_GST = 'sg_gst',
  SG_UEN = 'sg_uen',
  TH_VAT = 'th_vat',
  TW_VAT = 'tw_vat',
  US_EIN = 'us_ein',
  ZA_VAT = 'za_vat',
}

export type VatTypeInfo = {
  key: VatType
  placeholder: Scalars['String']
  text: Scalars['String']
  value: VatType
}

export type VerifyMemberInput = {
  memberId: Scalars['String']
  verificationCode: Scalars['String']
}

export type Widget = {
  appId: Scalars['String']
  context: WidgetContexts
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  position: WidgetPositions
  url: Scalars['String']
}

export enum WidgetContexts {
  MEMBER = 'MEMBER',
  POST = 'POST',
  SPACE = 'SPACE',
}

export type WidgetEdge = {
  cursor: Scalars['String']
  node: Widget
}

export enum WidgetPositions {
  PAGE = 'PAGE',
  SIDEBAR = 'SIDEBAR',
}

export type SubscriptionInput = {
  id: Scalars['String']
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    By: ['Member'],
    In: ['Space'],
    Media: ['Emoji', 'File', 'Image'],
    ModerationItemEntity: ['Member', 'Post'],
    ReportDataValue: ['ChartData', 'EntityReport', 'IntValue', 'StringValue'],
    ReportableEntity: ['Member', 'Post', 'Space', 'Tag'],
    SlateComponentOrPlaceholder: ['SlateComponent', 'SlatePlaceholder'],
  },
}
export default result
