import { Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { useMessageContext } from '../context/MessageContext'
import { welcomeMessage } from '../messages/connectedMessage'
import { FlowButton } from './FlowComponents/FlowButton'
import { FlowMessage } from './FlowComponents/FlowMessage'

export const ChatInterface = () => {
  const messageContext = useMessageContext()

  // const welcomeMessage: MessageContent = welcomeMessage;

  useEffect(() => {
    if (messageContext.history.length === 0)
      messageContext.addMessage(welcomeMessage)
  }, [messageContext])

  // const messagesEndRef = useRef(null)

  // const scrollToBottom = () => {
  //   if (messagesEndRef.current)
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(scrollToBottom, [messageContext.history])

  // console.log('Messages:', messageContext.history)
  return (
    <div className="m-4 mb-3 flex flex-col overflow-y-auto  scrollbar-hide h-full justify-center overflow-visible">
      {/* <h1>Chat Below!</h1> */}
      <div className="mb-4 px-2 overflow-visible">
        {messageContext.history
          ? messageContext.history.map((m, index) => {
              return (
                <Transition
                  appear={true}
                  key={index}
                  show={index >= messageContext.history.length - 4}
                  enter={`transition transform scale ease-linear duration-300 delay-${(index+1)*300}`}
                  enterFrom="opacity-0 -translate-y-5 scale-y-0"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition transform scale ease-linear duration-300  "
                  leaveFrom="opacity-100 translate-y-0 scale-y-100"
                  leaveTo="opacity-0 -translate-y-10 scale-y-80"
                >
                  {FlowMessage(m)}
                </Transition>
              )
            })
          : 'No Chat'}
        <div id="#last" />
      </div>
      <div className=" flex flex-row overflow-visible">
        {messageContext.history[
          messageContext.history.length - 1
        ]?.actions?.map((a, index) => (
          <Transition
            key={index}
            appear={true}
            show={true}
            enter="transition transform scale ease-linear duration-300 delay-200"
            enterFrom="opacity-0 -translate-y-2 scale-40"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition transform scale ease-linear duration-300 delay-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="overflow-visible"
          >
            <FlowButton action={a}></FlowButton>
          </Transition>
        ))}
      </div>
    </div>
  )
}
