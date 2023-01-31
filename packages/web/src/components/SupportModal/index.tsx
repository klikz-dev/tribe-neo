import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon'
import ChatAltIcon from '@heroicons/react/outline/ChatAltIcon'
import FireIcon from '@heroicons/react/outline/FireIcon'
import StarIcon from '@heroicons/react/outline/StarIcon'
import { useIntercom } from 'react-use-intercom'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

export const SupportModal = ({ open, onClose }) => {
  const { showNewMessages } = useIntercom()
  const openChat = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).Intercom) {
        showNewMessages()
      } else {
        window.open('mailto:success@tribe.so', '_blank')
      }
    }
  }

  const items = [
    {
      title: 'Knowledge Base',
      description: 'Learn everything there is to know about Tribe',
      icon: BookOpenIcon,
      link: 'https://community.tribe.so/knowledge-base-2-0/',
    },
    {
      title: 'Ask the Community',
      description:
        'Find answers, ask questions and help others in our community',
      icon: FireIcon,
      link: 'https://community.tribe.so/',
    },
    {
      title: "What's New?",
      description:
        'Find answers, ask questions and help others in our community',
      icon: StarIcon,
      link: 'https://community.tribe.so/whats-new',
    },
    {
      title: 'Share Feedback',
      description:
        'Share your feedback and feature requests with the community',
      icon: ChatAltIcon,
      link: 'https://community.tribe.so/tribe-2-feedback',
    },
  ]

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title="Help &amp; Community" />
      <Modal.Content>
        <ul className="flex flex-col space-y-1">
          {items.map(item => {
            const Icon = item.icon
            return (
              <li key={item.title}>
                <a
                  target="_blank"
                  href={item.link}
                  className="flex space-x-3 hover:bg-surface-200 rounded-md p-3"
                >
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-actionPrimary-500" />
                  <div>
                    <h3 className="text-base font-medium">{item.title}</h3>
                    <div className="text-sm text-basicSurface-500">
                      {item.description}
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
          <li className="pt-3">
            <h3 className="text-base font-medium">
              Still can’t find what you’re looking for?
            </h3>
            <div className="text-sm text-basicSurface-500">
              Our team’s always available for a chat. Let us know how we can
              help.
            </div>
          </li>
          <li className="pt-3">
            <Button onClick={openChat}>Chat with us</Button>
          </li>
        </ul>
      </Modal.Content>
    </Modal>
  )
}
