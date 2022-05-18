import React, { useEffect } from 'react'
import './App.css'
import { Web3Provider } from './context/Web3Context'
import { Navbar } from './components/Navbar'
import { ContractProvider } from './context/ContractContext'
import { MintButton } from './components/MintButton'
import { MessageProvider, MessageType } from './context/MessageContext'
import { FlowMessage } from './components/FlowComponents/FlowMessage'
import { ChatInterface } from './components/ChatInterface'
import CSS from 'csstype'

function App() {
  const bgprops: CSS.Properties = {
    backgroundImage: "url('/scenes/outside_bakery_1920.gif')",
  }

  return (
    <div className="bg-yellow-800 h-screen bg-center" style={bgprops}>
      <Web3Provider>
        <MessageProvider>
          {/* <Navbar /> */}
          <div className="flex flex-row justify-end mr-4 ml-2">
            <ChatInterface />
          </div>
          <ContractProvider>
            {/* <ViewGenerators /> */}
            <MintButton />
          </ContractProvider>
        </MessageProvider>
      </Web3Provider>
    </div>
  )
}

export default App
