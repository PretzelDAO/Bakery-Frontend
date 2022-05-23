import { MessageContent } from '../../context/MessageContext'

export const FlowMessage = (message: MessageContent) => {
  return message.delay != null ? (
    <div
      className={`flex flex-row w-full ${
        message.sendByUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="my-2">
        <div
          className={`mx-2  rounded-full w-max px-2 col ${
            message.sendByUser ? 'bg-yellow-200' : 'bg-white'
          } pb-1 pt-2`}
        >
          <img src={message.content[message.content.length - 1]}></img>

          <div className="flex flex-col justify-evenly"></div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-row w-full ${
        message.sendByUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="my-2">
        <div
          className={`mx-2  rounded-full w-max px-2 col ${
            message.sendByUser ? 'bg-yellow-200' : 'bg-white'
          } pb-1 pt-2`}
        >
          <img src={message.content}></img>
          <div className="flex flex-col justify-evenly"></div>
        </div>
      </div>
    </div>
  )
}
