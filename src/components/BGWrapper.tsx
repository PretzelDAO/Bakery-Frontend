import CSS from 'csstype'
import React from 'react'
import { AppState, useMessageContext } from '../context/MessageContext'
import { Welcome } from '../Welcome'
import { ChatInterface } from './ChatInterface'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
export const BGWrapper: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  const bgprops: CSS.Properties = {
    backgroundImage: `url('/scenes/scene1.png')`,
    backgroundColor: messageContext.backgroundColor,
  }
  const bgprops2: CSS.Properties = {
    background: `linear-gradient(0.25turn,#00000000,${messageContext.backgroundColor})`,
  }

  return (
    <div className="bg-yellow-800 flex flex-col h-screen bg-center" style={bgprops}>
      <div className="flex flex-col h-screen bg-center" style={bgprops2}>
        <AppHeader />
        {children}
        {messageContext.appState == AppState.chat && (
          <div className="flex h-screen flex-row justify-end mr-4 ml-2">
            <ChatInterface />
          </div>
        )}
        {messageContext.appState == AppState.welcome && <Welcome></Welcome>}
        <AppFooter />
      </div>
    </div>
  )
}
