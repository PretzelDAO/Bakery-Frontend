import React, { createContext, useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { RelayProvider } from '@opengsn/provider'

import { ethers } from 'ethers'
import { CONFIG } from '../config'
import { IWeb3Context } from './Web3Context'
// import { connectedMessage } from '../messages/connectedMessage'

enum MessageType {
  text,
  image,
  link,
}

export interface Action {
  // type: MessageType,
  content: String
  onClick: (
    context: MessageContext,
    web3?: IWeb3Context,
  ) => Promise<MessageContent[]>
}

export interface MessageContent {
  type: MessageType
  delay?: number | null
  content: any | any[]
  actions?: Action[]
  sendByUser?: Boolean
  // constructor(
  //   type: MessageType,
  //   content: any,
  //   actions?: Action[],
  //   delay?: number | null,
  // ) {
  //   this.type = type
  //   this.delay = delay ?? null
  //   this.content = content
  //   this.actions = actions ?? []
  // }
}

interface MessageContext {
  history: MessageContent[]
  addMessage: (
    message: MessageContent,
    alternateHistory?: MessageContent[],
  ) => Promise<MessageContent[]>
}

const MessageContext = createContext<MessageContext>({} as MessageContext)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState([] as MessageContent[])

  const addMessage = async (
    message: MessageContent,
    alternateHistory?: MessageContent[],
  ) => {
    // console.log('ADDING MESSAGE', message)
    let hist = alternateHistory ?? history
    if (message.delay && message.delay != null) {
      // var toAdd: MessageContent[] = []
      for (let i = 0; i < message.content.length - 1; i++) {
        const m = message.content[i]
        console.log('setting content ', message.content, m)
        hist = hist.concat([{ type: message.type, content: m }])
        setHistory(hist)
        await sleep(message.delay ?? 2000)
      }
      await sleep(message.delay ?? 2000)
    }
    hist = hist.concat([message])
    setHistory(hist)

    return hist
  }

  return (
    <MessageContext.Provider value={{ history, addMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = () => React.useContext(MessageContext)

export { MessageProvider, useMessageContext, MessageType }
