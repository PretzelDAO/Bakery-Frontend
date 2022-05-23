import CSS from 'csstype'
import React from 'react'
import { AppState, useMessageContext } from '../context/MessageContext'
import { Welcome } from '../Welcome'
import { ChatInterface } from './ChatInterface'
export const BGWrapper: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  const bgprops: CSS.Properties = {
    backgroundImage: `url('/scenes/${messageContext.background}')`,
  }

  return (
    <div className="bg-yellow-800 h-screen bg-center" style={bgprops}>
      {children}
      {messageContext.appState == AppState.chat && (
        <div className="flex flex-row justify-end mr-4 ml-2">
          <ChatInterface />
        </div>
      )}
      {messageContext.appState == AppState.welcome && <Welcome></Welcome>}
    </div>
  )
}
