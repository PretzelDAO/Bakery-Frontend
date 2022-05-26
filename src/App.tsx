import './App.css'
import { Web3Provider } from './context/Web3Context'
import { SugarPretzelProvider } from './context/SugarPretzelContext'
import { GenesisPretzelProvider } from './context/GenesisPretzelContext'
import { MessageProvider } from './context/MessageContext'
import { BGWrapper } from './components/BGWrapper'

function App() {
  return (
    <div className="">
      <Web3Provider>
        <SugarPretzelProvider>
          <GenesisPretzelProvider>
            <MessageProvider>
              <BGWrapper>{/* <MintButton /> */}</BGWrapper>
            </MessageProvider>
          </GenesisPretzelProvider>
        </SugarPretzelProvider>
      </Web3Provider>
    </div>
  )
}

export default App
