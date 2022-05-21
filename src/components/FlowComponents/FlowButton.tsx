import { FC, useState } from 'react'
import { Action, useMessageContext } from '../../context/MessageContext'
import { useWeb3 } from '../../context/Web3Context'

interface FlowButtonProps {
  action: Action
}

export const FlowButton: FC<FlowButtonProps> = ({ action }) => {
  const [loading, setLoading] = useState(false)
  const messageContext = useMessageContext()
  const web3Context = useWeb3()
  return (
    <div className="h-20 transition-all">
      <button
        className="p-3 bg-white transform rounded-md border-2 border-black w-max hover:bg-gray-500 hover:translate-y-1 transition-all hover:cursor-pointer mx-2"
        onClick={() => {
          setLoading(true)
          action
            .onClick(messageContext, web3Context)
            .then(() => setLoading(false))
            .finally(() => setLoading(false))
        }}
      >
        {loading ? (
          <img
            src={require('./loading_dots.gif').default}
            className="w-14"
          ></img>
        ) : (
          <div>{action.content}</div>
        )}
      </button>
    </div>
  )
}
