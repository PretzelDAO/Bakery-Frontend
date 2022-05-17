import { Action } from '../../context/MessageContext'

export const FlowButton = (action: Action) => {
  console.log('bottun with', action)
  return (
    <div className="p-3 bg-white  rounded-md border-2 border-black w-max hover:bg-gray-500 hover:translate-y-10">
      {action.content}
    </div>
  )
}
