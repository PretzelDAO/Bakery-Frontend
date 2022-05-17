import { useMessageContext } from '../context/MessageContext'
import { FlowButton } from './FlowComponents/FlowButton'
import { FlowMessage } from './FlowComponents/FlowMessage'

export const ChatInterface = () => {
  const messageContext = useMessageContext()

  console.log('Messages:', messageContext.history)
  return (
    <div className="m-4">
      <h1>Chat Below!</h1>
      <div className="mb-3">
        {messageContext.history
          ? messageContext.history.map((m) => FlowMessage(m))
          : 'No Chat'}
      </div>
      <div>
        {messageContext.history[
          messageContext.history.length - 1
        ]?.actions.map((a) => FlowButton(a))}
      </div>
    </div>
  )
}
