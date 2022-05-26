import React, { createContext, useEffect, useState } from 'react'
import { IWeb3Context } from './Web3Context'
import { ISugarPretzelContext } from './SugarPretzelContext'
import { IGenesisPretzelContext } from './GenesisPretzelContext'

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
    messageContext: IMessageContext,
    web3Context: IWeb3Context,
    sugarPretzelContext: ISugarPretzelContext,
    genesisPretzelContext: IGenesisPretzelContext
  ) => Promise<MessageContent[]>
}

export interface MessageContent {
  type: MessageType | MessageType[]
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

export enum AppState {
  welcome,
  chat,
  secret,
}

export interface IMessageContext {
  history: MessageContent[]
  addMessage: (
    message: MessageContent,
    alternateHistory?: MessageContent[]
  ) => Promise<MessageContent[]>

  //BG
  background: string
  setBackground: (bg: string) => boolean
  appState: AppState
  setAppState: (newAppState: AppState) => boolean
  backgroundColor: string
  setBackgroundColor: (bgColor: string) => boolean
  backgroundColor2: string
  setBackgroundColor2: (bgColor: string) => boolean
}

const MessageContext = createContext<IMessageContext>({} as IMessageContext)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState([] as MessageContent[])
  const [background, setBackground] = useState('outside_bakery_scene.gif')
  const [appState, setAppStateProp] = useState(AppState.welcome)
  const [backgroundColor, setBackgroundColor] = useState('#ffd4a4')
  const [backgroundColor2, setBackgroundColor2] = useState('transparent')

  const setAppState = (newAppState: AppState) => {
    if (appState === newAppState) return false
    setAppStateProp(newAppState)
    return true
  }
  const setBG = (bg: string) => {
    if (bg === background) return false
    setBackground(bg)
    return true
  }
  const setBGColor = (bgColor: string) => {
    if (bgColor === backgroundColor) return false
    setBackgroundColor(bgColor)
    return true
  }
  const setBGColor2 = (bgColor2: string) => {
    if (bgColor2 === backgroundColor) return false
    setBackgroundColor2(bgColor2)
    return true
  }

  const addMessage = async (
    message: MessageContent,
    alternateHistory?: MessageContent[]
  ) => {
    // console.log('ADDING MESSAGE', message)
    let hist = alternateHistory ?? history
    const multitype = typeof message.type == 'object'
    if (message.delay && message.delay != null) {
      // var toAdd: MessageContent[] = []
      for (let i = 0; i < message.content.length - 1; i++) {
        const m = message.content[i]
        console.log('setting content ', message.content, m)
        hist = hist.concat([
          {
            type: multitype ? (message.type as MessageType[])[i] : message.type,
            content: m,
          },
        ])
        setHistory(hist)
        await sleep(message.delay ?? 100)
      }
    }
    hist = hist.concat([message])
    setHistory(hist)

    return hist
  }

  return (
    <MessageContext.Provider
      value={{
        history,
        addMessage,
        setBackground: setBG,
        background,
        appState,
        backgroundColor,
        backgroundColor2,
        setAppState,
        setBackgroundColor: setBGColor,
        setBackgroundColor2: setBGColor2,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = () => React.useContext(MessageContext)

export { MessageProvider, useMessageContext, MessageType }
