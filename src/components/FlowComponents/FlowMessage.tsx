import { Transition } from '@headlessui/react'
import { MessageContent, MessageType } from '../../context/MessageContext'
import { FlowButton } from './FlowButton'

export const FlowMessage = (message: MessageContent) => {
  const mtype = message.type == MessageType.image
  const mcontent =
    message.delay != null
      ? message.content[message.content.length - 1]
      : message.content

  return (
    <div
      className={`flex flex-row w-full ${
        message.sendByUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="my-2">
        <div
          className={`mx-2  ${
            mtype ? 'rounded-md' : 'rounded-2xl'
          } w-max px-2 col ${
            message.sendByUser ? 'bg-yellow-200' : 'bg-white'
          } pb-1 pt-2 shadow-xl drop-shadow-lg whitespace-pre-line`}
        >
          {mtype ? (
            <img src={mcontent} className="w-full mx-2 my-4"></img>
          ) : (
            mcontent
          )}
          <div className="flex flex-col justify-evenly"></div>
        </div>
      </div>
    </div>
  )
}
