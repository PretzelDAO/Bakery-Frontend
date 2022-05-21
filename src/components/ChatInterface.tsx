import { Transition } from '@headlessui/react'
import { useEffect, useRef } from 'react'
import {
  MessageContent,
  MessageType,
  useMessageContext,
} from '../context/MessageContext'
import { useWeb3 } from '../context/Web3Context'
import { introMessage2 } from '../messages/connectedMessage'
import { sleep } from '../utils/flowutils'
import { FlowButton } from './FlowComponents/FlowButton'
import { FlowMessage } from './FlowComponents/FlowMessage'


export const ChatInterface = () => {
  const messageContext = useMessageContext()
  const web3Context = useWeb3()

  const introMessage: MessageContent = {
    content: [
      'Beep Boop!',
      'Welcome to the PretzelDAO Pretzery!',
      'Before you start shopping, let me know where I should put your Pretzels?',
    ],
    actions: [
      {
        content: 'In my Metamask.',
        onClick: async (context) => {
          await sleep(500)
          console.log('lol:', context)
          await web3Context.loginMetamask(true)
          const newHist = await context.addMessage({
            content: 'In my Metamask.',
            type: MessageType.text,
            sendByUser: true,
          })
          await sleep(1500)
          // TO-DO
          return context.addMessage(introMessage2, newHist)
        },
      },
      {
        content: 'In my Wallet Connect.',
        onClick: async (context) => {
          await sleep(500)
          console.log('lol wallet connect:', context)
          // Wallet Connect here
          const newHist = await context.addMessage({
            content: 'In my Wallet Connect.',
            type: MessageType.text,
            sendByUser: true,
          })
          await sleep(1500)
          // TO-DO
          return context.addMessage(introMessage2, newHist)
        },
      },
    ],
    delay: 400,
    type: MessageType.text,
  }

  useEffect(() => {
    if (messageContext.history.length == 0)
      messageContext.addMessage(introMessage)
  }, [])

  // const messagesEndRef = useRef(null)

  // const scrollToBottom = () => {
  //   if (messagesEndRef.current)
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(scrollToBottom, [messageContext.history])

  console.log('Messages:', messageContext.history)
  return (
    <div className="m-4 mb-3 flex flex-col overflow-y-auto mostofscreen scrollbar-hide">
      <h1>Chat Below!</h1>
      <div className="mb-4 min-w-full px-2">
        {messageContext.history
          ? messageContext.history.map((m) => {
              return (
                <Transition
                  appear={true}
                  show={true}
                  enter="transition transform scale ease-linear duration-300 "
                  enterFrom="opacity-0 -translate-y-2 scale-40"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {FlowMessage(m)}
                </Transition>
              )
            })
          : 'No Chat'}
        <div id="#last" />
      </div>
      <div className="mb-40 flex flex-row">
        {messageContext.history[
          messageContext.history.length - 1
        ]?.actions?.map((a) => (
          <Transition
            appear={true}
            show={true}
            enter="transition transform scale ease-linear duration-300 delay-200"
            enterFrom="opacity-0 -translate-y-2 scale-40"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition transform scale ease-linear duration-300 delay-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <FlowButton action={a}></FlowButton>
          </Transition>
        ))}
      </div>
    </div>
  )
}
