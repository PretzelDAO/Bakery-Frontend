import { FC, useState } from 'react'
import { Action, useMessageContext } from '../../context/MessageContext'

interface FlowButtonProps {
  action: Action
}

export const FlowButton: FC<FlowButtonProps> = ({ action }) => {
  const [loading, setLoading] = useState(false)
  const messageContext = useMessageContext()
  console.log('bottun with', action)
  return (
    <div className="h-20">
      <button
        className="p-3 bg-white transform rounded-md border-2 border-black w-max hover:bg-gray-500 hover:translate-y-1 transition-all hover:cursor-pointer"
        onClick={() => {
          setLoading(true)
          action
            .onClick(messageContext)
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
