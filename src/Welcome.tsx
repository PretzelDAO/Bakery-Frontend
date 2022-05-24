import CSS from 'csstype'
import React from 'react'
import { AppState, useMessageContext } from './context/MessageContext'
export const Welcome: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  return (
    <div className="p-4 flex-grow justify-center">

      <button
        className="text-lg bg-white rounded-md w-40 transform border-2 border-black hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer"
        onClick={() => messageContext.setAppState(AppState.chat)}
      >
        Enter
      </button>
    </div>
  )
}
