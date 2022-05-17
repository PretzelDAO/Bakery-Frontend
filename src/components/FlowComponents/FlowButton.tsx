import { Action, useMessageContext } from '../../context/MessageContext'

export const FlowButton = (action: Action) => {
  const messageContext = useMessageContext()
  console.log('bottun with', action)
  return (
    <div className="h-20">
      <button
        className="p-3 bg-white transform rounded-md border-2 border-black w-max hover:bg-gray-500 hover:translate-y-1 transition-all hover:cursor-pointer"
        onClick={() => action.onClick(messageContext)}
      >
        {action.content}
      </button>
    </div>
  )
}
