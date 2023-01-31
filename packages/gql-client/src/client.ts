import {
  AppClient,
  AuthClient,
  BillingClient,
  CollectionsClient,
  DevClient,
  GraphqlClient,
  InvitationsClient,
  MediaClient,
  MembersClient,
  ModerationClient,
  NetworkClient,
  NotificationsClient,
  PagesClient,
  PostsClient,
  ReportClient,
  RolesClient,
  SlatesClient,
  SpaceMembersClient,
  SpaceMembershipClient,
  SpacePostTypeClient,
  SpaceRolesClient,
  SpacesClient,
  TagsClient,
  ThemeClient,
  TribeClientOptions,
} from './clients'
import {
  AuthTokenFields,
  getLimitedTokenGQLQuery,
  getTokensGQLQuery,
  LimitedTokenFields,
  SearchEntityFields,
  searchGQLQuery,
} from './graphql'
import {
  AppToken,
  AuthToken,
  PermissionContext,
  QueryLimitedTokenArgs,
  QuerySearchArgs,
  QueryTokensArgs,
  SearchResult,
} from './types'

export class TribeClient {
  app: AppClient

  auth: AuthClient

  billing: BillingClient

  collections: CollectionsClient

  dev: DevClient

  invitations: InvitationsClient

  media: MediaClient

  members: MembersClient

  moderation: ModerationClient

  network: NetworkClient

  notifications: NotificationsClient

  posts: PostsClient

  report: ReportClient

  roles: RolesClient

  spaceMembers: SpaceMembersClient

  spaceMembership: SpaceMembershipClient

  spaceRoles: SpaceRolesClient

  spaces: SpacesClient

  spacePostType: SpacePostTypeClient

  tags: TagsClient

  theme: ThemeClient

  slates: SlatesClient

  pages: PagesClient

  private client: GraphqlClient

  constructor(options: TribeClientOptions) {
    this.client = new GraphqlClient(options)

    this.app = new AppClient(this.client)
    this.auth = new AuthClient(this.client)
    this.billing = new BillingClient(this.client)
    this.collections = new CollectionsClient(this.client)
    this.dev = new DevClient(this.client)
    this.invitations = new InvitationsClient(this.client)
    this.media = new MediaClient(this.client)
    this.members = new MembersClient(this.client)
    this.moderation = new ModerationClient(this.client)
    this.network = new NetworkClient(this.client)
    this.notifications = new NotificationsClient(this.client)
    this.posts = new PostsClient(this.client)
    this.report = new ReportClient(this.client)
    this.roles = new RolesClient(this.client)
    this.spaceMembers = new SpaceMembersClient(this.client)
    this.spaceMembership = new SpaceMembershipClient(this.client)
    this.spaceRoles = new SpaceRolesClient(this.client)
    this.spaces = new SpacesClient(this.client)
    this.tags = new TagsClient(this.client)
    this.theme = new ThemeClient(this.client)
    this.slates = new SlatesClient(this.client)
    this.pages = new PagesClient(this.client)
    this.spacePostType = new SpacePostTypeClient(this.client)
  }

  setToken(accessToken: string): void {
    this.client.setToken(accessToken)
  }

  /**
   * Get the guest access token for a community.
   * @query tokens(): AuthToken!
   * @example
   * ```typescript
   *  t.client.getTokens({networkDomain: 'community.tribe.so'})
   * ```
   * @returns The AuthToken.
   */
  async getTokens(
    variables: QueryTokensArgs,
    fields: AuthTokenFields = 'default',
  ): Promise<AuthToken> {
    type QueryResult = { tokens: AuthToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getTokensGQLQuery(fields),
      variables,
    })
    return result.tokens
  }

  async getLimitedToken(
    variables: QueryLimitedTokenArgs,
    fields: LimitedTokenFields = 'basic',
    useBasicToken?: boolean,
  ): Promise<AppToken> {
    type QueryResult = { limitedToken: AppToken }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: getLimitedTokenGQLQuery(fields),
      variables,
      useBasicToken,
    })
    return result.limitedToken
  }

  async search(
    variables: QuerySearchArgs,
    fields: SearchEntityFields = 'basic',
    accessToken?: string,
  ): Promise<SearchResult> {
    type QueryResult = { search: SearchResult }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: searchGQLQuery(fields),
      variables,
      customToken: accessToken,
    })
    return result.search
  }

  async generateToken(options: {
    networkId: string
    memberId?: string
  }): Promise<string> {
    const { networkId, memberId } = options
    return this.getLimitedToken(
      {
        context: PermissionContext.NETWORK,
        networkId,
        entityId: networkId,
        impersonateMemberId: memberId,
      },
      'basic',
      true,
    ).then(x => x.accessToken)
  }
}
