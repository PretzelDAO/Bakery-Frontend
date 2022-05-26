import CSS from 'csstype'
import React from 'react'
import { AppState, useMessageContext } from '../context/MessageContext'
import { Welcome } from '../Welcome'
import { ChatInterface } from './ChatInterface'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { Transition } from '@headlessui/react'
export const BGWrapper: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  const bgprops: CSS.Properties = {
    // backgroundImage: `url('/scenes/${messageContext.background}')`,
    backgroundColor: messageContext.backgroundColor,
  }
  const bgprops2: CSS.Properties = {
    background: `linear-gradient(0.25turn,#00000000,${messageContext.backgroundColor})`,
  }
  const bgpropsColor: CSS.Properties = {
    backgroundColor: messageContext.backgroundColor2,
  }

  return (
    <div
      className="bg-yellow-800 flex flex-col h-screen bg-center overflow-hidden"
      style={bgprops}
    >
      
      <Transition
      appear={true}
      key={"bg"}
      show={messageContext.appState == AppState.welcome }
      enter={`transition transform scale ease-linear duration-1600 delay-200`}
      enterFrom="opacity-0 -translate-y-10 "
      enterTo="opacity-100 translate-y-0"
      leave="transition transform scale ease-linear duration-800  "
      leaveFrom="opacity-100 translate-x-0 scale-y-100"
      leaveTo="opacity-0 -translate-x-5 scale-y-120"
    >
      <video
                  autoPlay
                  loop
                  muted
                  className="absolute object-fit h-screen w-screen"
                >
                  <source
                    src="/scenes/outside_bakery_scene.webm"
                    type="video/webm"
                  />
                </video></Transition>
      <div className="flex flex-col h-screen bg-center" style={bgpropsColor}>
        <AppHeader />
        {children}
        
          <Transition className="flex h-full flex-row justify-end mr-4 ml-2" appear={true}
          key={"bg"}
          show={messageContext.appState == AppState.chat }
          enter={`transition transform scale ease-linear duration-2000 delay-500`}
          enterFrom="opacity-0 -translate-y-4 "
          enterTo="opacity-100 translate-y-0"
          >
            
            <div className="container mx-auto flex flex-row p-4">
              <div className="container z-0 flex flex-row justify-start items-center">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute object-fit w-3/5 z-0 overflow-hidden"
                >
                  <source
                    src="/scenes/inside_bakery_scene.webm"
                    type="video/webm"
                  />
                </video>
              </div>
              <div
                className="container z-50 flex flex-row justify-end"
                style={bgprops2}
              >
                <div className="w-10/12 overflow-visible">
                  <ChatInterface />
                </div>
              </div>
            </div>
          </Transition>
        
        {messageContext.appState === AppState.secret && (
          <div className="flex h-screen flex-row justify-end mr-4 ml-2">
            <div className="container mx-auto flex flex-row p-4">
              <div className="container z-0 flex flex-row justify-start items-center">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute object-fit w-3/5 z-0"
                >
                  <source
                    src="/scenes/secret_bakery_scene.webm"
                    type="video/webm"
                  />
                </video>
              </div>
              <div
                className="container z-50 flex flex-row justify-end"
                style={bgprops2}
              >
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
  )
}
