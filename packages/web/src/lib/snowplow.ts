import {
  enableActivityTracking,
  newTracker,
  trackPageView,
  trackSelfDescribingEvent,
} from '@snowplow/browser-tracker'

import { RuntimeConfigs, StaticConfigs } from '../config'

/* Each event is occurred in specific context or about specific item.
 * by default all events are occurred in specific organization and network and they should be set.
 * other events can be triggered for specific space or post or topic
 * */
export type targetDataContext = {
  organizationId: string
  networkId?: string
  groupId?: string
  templateId?: string
  spaceId?: string
  postId?: string
  topicId?: string
  reactionId?: string
  memberId?: string
  appId?: string
}

/* An Event has an actor which is a user who triggered that.
 * for example a page view event is triggered by a user
 * we need to have the some information about the user.
 * Guest users also have id and role
 * */
export type actorDataContext = {
  id: string
  locale: string
  roleId: string
  roleType: string
  spaceRoleId?: string
  spaceRoleType?: string
}

type serviceDataContext = {
  version: string
  build: string
  channel?: string
}

class SnowplowTracker {
  actor: actorDataContext

  target: targetDataContext

  service: serviceDataContext

  active: boolean

  enablePageView: boolean

  enablePagePing: boolean

  /* You can initialize the snowplowTracker userInfo as AuthUser and target info by Partial of targetDataContext
   * */
  constructor(
    authUser?: Partial<actorDataContext>,
    targetData?: Partial<targetDataContext>,
  ) {
    const snowplowCollectorAddress = RuntimeConfigs.SNOWPLOW_COLLECTOR_ADDRESS
    /*
      Initialize snowplow tracker based on snowplow documentation
      https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-trackers/browser-tracker/quick-start-guide/
      */
    this.active = !!snowplowCollectorAddress
    if (!this.active) {
      console.warn('Snowplow variable, Collector Address, is not defined')
      return
    }

    this.enablePagePing = RuntimeConfigs.SNOWPLOW_ENABLE_PAGE_PING
    this.enablePageView = RuntimeConfigs.SNOWPLOW_ENABLE_PAGE_VIEW
    this.setService(StaticConfigs.APP_VERSION, RuntimeConfigs.RELEASE_CHANNEL)
    if (authUser) this.setActor(authUser)
    if (targetData) this.setTarget(targetData)

    newTracker('tribe-neo-tracker', snowplowCollectorAddress, {
      appId: 'tribe-neo',
      platform: 'web',
      cookieDomain: '',
      discoverRootDomain: true,
      cookieName: 'tribe_sp',
      cookieSameSite: 'None',
      cookieSecure: true,
      encodeBase64: false,
      respectDoNotTrack: false,
      eventMethod: 'post',
      bufferSize: 1,
      maxPostBytes: 40000,
    })

    if (this.enablePageView) {
      enableActivityTracking({
        minimumVisitLength: 10,
        heartbeatDelay: 10,
      })
    }
  }

  /**
   * Set the Actor of the events
   * @param {actorDataContext} authUser
   * @returns void
   */
  setActor(authUser?: Partial<actorDataContext>) {
    this.actor = { ...this.actor, ...authUser }
  }

  /**
   * Set the Target of the events
   * @param {targetDataContext} targetData
   * @returns void
   */
  setTarget(targetData: Partial<targetDataContext>) {
    this.target = { ...this.target, ...targetData }
  }

  /**
   * Set the App version of the events
   * @param {string} versionString
   * @param {string} channel
   * @returns void
   */
  setService(versionString: string, channel: string) {
    const [versionNumber, ...buildIds] = versionString.split('-')

    this.service = {
      version: versionNumber,
      build: buildIds.join('-'),
      channel,
    }
  }

  track(
    name: string,
    eventBody: Record<string, unknown> = {},
    targetData?: Partial<targetDataContext>,
  ): void {
    if (!this.active) return
    let customEventTarget: targetDataContext = this.target
    if (targetData) customEventTarget = { ...customEventTarget, ...targetData }
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:so.tribe/self_described/jsonschema/1-0-0',
        data: {
          name,
          ...eventBody,
        },
      },
      context: [
        {
          schema: 'iglu:so.tribe/service/jsonschema/1-0-0',
          data: this.service,
        },
        {
          schema: 'iglu:so.tribe/actor/jsonschema/1-0-0',
          data: this.actor,
        },
        {
          schema: 'iglu:so.tribe/target/jsonschema/1-0-0',
          data: customEventTarget,
        },
      ],
    })
  }

  /**
   * Set the Target of the Event
   * @param {string} pageTitle : each page should have a title, if it is a space page or post page or admin dashboard
   *                 there is no need to set the specific name and event the uri parameter of "space" or "post" is enough
   * @param {targetDataContext} targetData : as user surfs among pages,...
   *                            the page view event target is changed so it can be updated by this parameter
   * @returns void
   */
  trackPageView(
    pageTitle: string,
    targetData?: Partial<targetDataContext>,
  ): void {
    if (!this.active || !this.enablePageView) return
    if (targetData) this.setTarget(targetData)

    // Todo: this condition should be deleted later as the organizationId set for all networks
    if (typeof this.target.organizationId === 'undefined') {
      this.setTarget({ organizationId: 'NA' })
    }

    trackPageView({
      title: pageTitle,
      context: [
        {
          schema: 'iglu:so.tribe/service/jsonschema/1-0-0',
          data: this.service,
        },
        {
          schema: 'iglu:so.tribe/actor/jsonschema/1-0-0',
          data: this.actor,
        },
        {
          schema: 'iglu:so.tribe/target/jsonschema/1-0-0',
          data: this.target,
        },
      ],
    })
  }
}

export const tracker = new SnowplowTracker()
