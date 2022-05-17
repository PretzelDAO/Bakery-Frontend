import React, { createContext, useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { RelayProvider } from '@opengsn/provider'

import { ethers } from 'ethers'
import { CONFIG } from '../config'

enum MessageType {
  text,
  image,
  link,
}

export interface Action {
  // type: MessageType,
  content: String
  onClick: () => Promise<void>
}

class MessageContent {
  type: MessageType
  content: any
  actions: Action[]

  constructor(type: MessageType, content: any, actions: Action[]) {
    this.type = type
    this.content = content
    this.actions = actions
  }
}

interface MessageContext {
  history: MessageContent[]
  addMessage: (message: MessageContent) => number
}

const MessageContext = createContext<MessageContext>({} as MessageContext)

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState([
    new MessageContent(MessageType.text, 'Hi there, connect a wallet', [
      {
        content: 'Connect Metamask',
        onClick: async () => console.log('clicked me'),
      },
    ]),
  ] as MessageContent[])

  const addMessage = (message: MessageContent) => {
    setHistory(history.concat([message]))
    return history.length
  }

  return (
    <MessageContext.Provider value={{ history, addMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = () => React.useContext(MessageContext)

export { MessageProvider, useMessageContext, MessageContent, MessageType }
