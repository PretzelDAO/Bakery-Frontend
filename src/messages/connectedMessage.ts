import { MessageContent, MessageType } from '../context/MessageContext'

// function messageFromDict(dict: { content: String }) {
//   return new MessageContent(MessageType.text, dict.content, [
//     {
//       content: 'Continue',
//       onClick: async (context) =>
//         context.addMessage(messageFromDict(connectedMessage2)),
//     },
//   ])
// }

export const connectedMessage: MessageContent = new MessageContent(
  MessageType.text,
  'Yay! you connected yout wallet',
  [
    {
      content: 'Continue',
      onClick: async (context) => context.addMessage(connectedMessage),
    },
  ],
)

// export const connectedMessage2 = new MessageContent(
//   MessageType.text,
//   'Yay! you connected yout wallet',
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => context.addMessage(connectedMessage),
//     },
//   ],
// )
