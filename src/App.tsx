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
import { BGWrapper } from './components/BGWrapper'

function App() {
  return (
    <div className="">
      <Web3Provider>
        <ContractProvider>
          <MessageProvider>
            <BGWrapper>
              <div className="flex flex-row justify-end mr-4 ml-2">
                <ChatInterface />
              </div>

              {/* <MintButton /> */}
            </BGWrapper>
          </MessageProvider>
        </ContractProvider>
      </Web3Provider>
    </div>
  )
}

export default App
