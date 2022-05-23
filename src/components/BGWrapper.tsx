import CSS from 'csstype'
import React from 'react'
import { useMessageContext } from '../context/MessageContext'
export const BGWrapper: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  const bgprops: CSS.Properties = {
    backgroundImage: `url('/scenes/${messageContext.background}')`,
  }
  return (
    <div className="bg-yellow-800 h-screen bg-center" style={bgprops}>
      {children}
    </div>
  )
}
