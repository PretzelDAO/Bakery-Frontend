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
    backgroundImage: `url('/scenes/${messageContext.background}')`,
    backgroundColor: messageContext.backgroundColor,
  }
  const bgprops2: CSS.Properties = {
    background: `linear-gradient(0.25turn,#00000000,${messageContext.backgroundColor})`,
  }
  const bgpropsColor: CSS.Properties = {
    backgroundColor: `${messageContext.backgroundColor}`,
  }

  return (
    <div className="bg-yellow-800 flex flex-col h-screen bg-center" style={bgprops}>
      <div style={bgpropsColor}>
      <div className="flex flex-col h-screen bg-center" style={bgprops2}>
        <AppHeader />
        {children}
        {messageContext.appState == AppState.chat && (
            <div className="flex h-screen flex-row justify-end mr-4 ml-2">
            <div className="container mx-auto flex flex-row p-4">
              <div className="container z-0 flex flex-row justify-start">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute object-fit w-3/5 z-0"
                >
                  <source
                    src="/scenes/inside_bakery_scene.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="container z-50 flex flex-row justify-end" style={bgprops2}>
                <div className="w-10/12">
                  <ChatInterface />
                </div>
              </div>
            </div>
          </div>
        )}
        {messageContext.appState == AppState.welcome && <Welcome></Welcome>}
        <AppFooter />
      </div>
      </div>
    </div>
  )
}
