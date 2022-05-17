import React, { useEffect } from 'react'
import './App.css'
import { Web3Provider } from './context/Web3Context'
import { Navbar } from './components/Navbar'
import { ContractProvider } from './context/ContractContext'
import { MintButton } from './components/MintButton'
import { MessageProvider, MessageType } from './context/MessageContext'
import { FlowMessage } from './components/FlowComponents/FlowMessage'
import { ChatInterface } from './components/ChatInterface'

function App() {
  return (
    <div className="bg-yellow-800">
      <Web3Provider>
        <MessageProvider>
          {/* <Navbar /> */}
          <h1>hello world</h1>
          <FlowMessage
            content={'Hi there'}
            type={MessageType.text}
            actions={[
              {
                content: 'Connect Metamask',
                onClick: async () => {},
              },
            ]}
          ></FlowMessage>
          <ChatInterface />

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
