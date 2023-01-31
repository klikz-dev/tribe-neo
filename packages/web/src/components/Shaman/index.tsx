import { useState } from 'react'

import ExternalLinkIcon from '@heroicons/react/outline/ExternalLinkIcon'
import { Emoji } from 'emoji-mart-virtualized'

import { RoleType } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

export const Shaman = () => {
  return null
  const {
    data: { member, role },
  } = useAuthToken()
  const [step, setStep] = useState('welcome')
  const [loadingKey, setLoadingKey] = useState('')

  if (role?.type !== RoleType.ADMIN) return null

  const nextStep = () => {
    let activeIndex = messages.findIndex(m => m.key === step)

    while (true) {
      activeIndex += 1
      if (typeof messages[activeIndex]?.condition === 'function') {
        if (messages[activeIndex].condition(values)) break
      } else {
        break
      }
    }

    setStep(messages[activeIndex]?.key)
  }

  const values = {}
  const messages = [
    {
      key: 'welcome',
      message: (
        <>
          Hi, {member.name} <Emoji native emoji=":wave:" size={18} />
          <br />
          Welcome to your Tribe! I&apos;m your Shaman. Let&apos;s get you
          started.
        </>
      ),
      buttons: [
        {
          key: 'next',
          type: 'button',
          text: 'Sounds good!',
        },
        {
          key: 'who-are-you',
          type: 'button',
          text: 'Who are you exactly?',
        },
      ],
    },
    {
      condition: values => values.welcome === 'who-are-you',
      key: 'who-are-you',
      message: `I'm your Shaman. I'm going to help you setting up your Tribe and will provide guidance as we set up your community!`,
      buttons: [
        {
          key: 'next',
          type: 'button',
          text: "Amazing! Let's do it.",
        },
      ],
    },
    {
      key: 'community-privacy',
      message: 'Is you community public or private?',
      buttons: [
        {
          key: 'public',
          type: 'button',
          text: 'Public',
          loading: 'Setting community to public...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('public'), 2000)
            })
          },
        },
        {
          key: 'private',
          type: 'button',
          text: 'Private',
        },
      ],
    },
    {
      condition: values => values['community-privacy'] === 'private',
      key: 'community-private',
      message: (
        <>
          Do you want to set the whole community to private? This means your
          community will not be crawlable by Google.
          <br />
          You can have a public community with private spaces as well.
        </>
      ),
      buttons: [
        {
          key: 'private',
          type: 'button',
          text: 'Make the whole community private',
          loading: 'Setting community to private...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('private'), 2000)
            })
          },
        },
        {
          key: 'public',
          type: 'button',
          text: "I'll make private spaces instead",
        },
      ],
    },
    {
      key: 'community-invitation',
      message: 'Is your community invitation only or anyone can join?',
      buttons: [
        {
          key: 'invitation',
          type: 'button',
          text: 'Only invited members can join',
          loading: 'Setting community invitation only...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('invitation'), 2000)
            })
          },
        },
        {
          key: 'everyone',
          type: 'button',
          text: 'Everyone can join',
          loading: 'Setting community so everyone can join...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('everyone'), 2000)
            })
          },
        },
      ],
    },
    {
      key: 'community-logo',
      message: "Let's upload your community logo! The best ratio is 3 to 1.",
      buttons: [
        {
          key: 'upload',
          type: 'image',
          text: 'Upload logo',
          loading: 'Setting your community logo...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('upload'), 2000)
            })
          },
        },
        {
          key: 'later',
          type: 'button',
          text: "I'll upload later",
        },
      ],
    },
    {
      key: 'community-color',
      message:
        "What's the primary color of your brand? It'll be used for the primary button color.",
      buttons: [
        {
          key: 'color',
          type: 'color',
          text: 'Pick the color',
          loading: 'Setting your community primary color...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('upload'), 2000)
            })
          },
        },
        {
          key: 'later',
          type: 'button',
          text: 'I like the current button color',
        },
      ],
    },
    {
      key: 'community-logo-color-help',
      message:
        'You can change your community logo, color, and customize the header and sidebar using the Tribe community customizer!',
      buttons: [
        {
          key: 'customizer',
          type: 'link',
          text: 'Open the community customizer',
          url: '/customizer',
        },
        {
          key: 'next',
          type: 'button',
          text: 'Got it!',
        },
      ],
    },
    {
      key: 'google-analytics',
      message: 'Do you have a Google Analytics account?',
      buttons: [
        {
          key: 'yes',
          type: 'button',
          text: 'Yes, I have!',
          url: '/customizer',
        },
        {
          key: 'no',
          type: 'button',
          text: 'Not sure what it is.',
        },
      ],
    },
    {
      condition: values => values['google-analytics'] === 'yes',
      key: 'google-analytics-yes',
      message:
        "Let's install the Google Analytics app then! It'll send events to your Google Analytics account so you can measure page views and more!",
      buttons: [
        {
          key: 'install',
          type: 'link',
          text: 'Install Google Analytics app',
          url: '/customizer',
        },
        {
          key: 'done',
          type: 'button',
          text: 'Done!',
        },
      ],
    },
    {
      key: 'community-say-hi',
      message: (
        <>
          Let&apos;s create your community structure!
          <br />
          You can create different spaces for your members for different
          purposes. Do you want me to create a space for your members to
          introduce themselves and say hi?
        </>
      ),
      buttons: [
        {
          key: 'yes',
          text: "Let's do it!",
          loading: 'Creating "Say Hi" space...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('yes'), 2000)
            })
          },
        },
        {
          key: 'no',
          type: 'button',
          text: "I don't need it.",
        },
      ],
    },
    {
      key: 'community-announcement',
      message: (
        <>
          How about an announcement space? Only community admins will be able to
          create new posts in this space and everyone will be part of it by
          default.
        </>
      ),
      buttons: [
        {
          key: 'yes',
          text: "Let's do it!",
          loading: 'Creating "Announcement" space...',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('yes'), 2000)
            })
          },
        },
        {
          key: 'no',
          type: 'button',
          text: "I don't need it.",
        },
      ],
    },
    {
      key: 'all-set',
      message: (
        <>
          You&apos;re all set! I&apos;m going to giving you more tips every now
          and then!
        </>
      ),
      buttons: [
        {
          key: 'thanks',
          text: 'Thanks!',
          loading: 'Enjoy your Tribe!',
          action: () => {
            return new Promise(resolve => {
              setTimeout(() => resolve('thanks'), 2000)
            })
          },
        },
      ],
    },
  ]

  const activeMessage = messages.find(m => m.key === step)

  if (!activeMessage) return null
  const loadingMessage = activeMessage?.buttons?.find(
    b => b.key === loadingKey,
  )?.loading
  return (
    <Card className="mb-5">
      <Card.Content className="flex space-x-3 items-start">
        <div className="flex-shrink-0">
          <img
            alt="Shaman"
            src="https://pbs.twimg.com/profile_images/1400173414686547973/-09Ci0rU_400x400.jpg"
            className="w-12 h-12 rounded-full animate-bounce-slow"
          />
        </div>
        <div className="flex-grow flex flex-col space-y-2">
          <div className="bg-surface-200 text-basicSurface-900 rounded-lg -mt-3 p-3">
            {activeMessage?.message}
          </div>
          {activeMessage?.buttons?.length ? (
            <div className="flex space-x-3 space-y-2 flex-wrap">
              {activeMessage.buttons.map(button => {
                switch (button.type) {
                  case 'link':
                    return (
                      <Button
                        trailingIcon={<ExternalLinkIcon />}
                        as="a"
                        href={button.url}
                        rounded
                        variant="outline"
                        target="_blank"
                      >
                        {button.text}
                      </Button>
                    )
                  default:
                    return (
                      <Button
                        key={button.key}
                        loading={loadingKey === button.key}
                        variant="outline"
                        rounded
                        onClick={async () => {
                          if (typeof button.action === 'function') {
                            setLoadingKey(button.key)
                            const value = await button.action()
                            values[activeMessage.key] = value || button.key
                            setLoadingKey('')
                          } else {
                            values[activeMessage.key] =
                              button.value || button.key
                          }

                          nextStep()
                        }}
                      >
                        {button.text}
                      </Button>
                    )
                }
              })}
            </div>
          ) : null}
          {loadingMessage ? (
            <div className="text-sm text-basicSurface-500">
              {loadingMessage}
            </div>
          ) : null}
        </div>
      </Card.Content>
    </Card>
  )
}
