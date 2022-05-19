import { Transition } from '@headlessui/react'
import { MessageContent } from '../../context/MessageContext'
import { FlowButton } from './FlowButton'

export const FlowMessage = (message: MessageContent) => {
  return message.delay != null ? (
    <div className="my-2">
      <div className="mx-2  rounded-full w-max px-2 col bg-white pb-1 pt-2">
        {message.content[message.content.length - 1]}
        <div className="flex flex-col justify-evenly"></div>
      </div>
    </div>
  ) : (
    <div className="my-2">
      <div className="mx-2  rounded-full w-max px-2 col bg-white pb-1 pt-2">
        {message.content}
        <div className="flex flex-col justify-evenly"></div>
      </div>
    </div>
  )
}
