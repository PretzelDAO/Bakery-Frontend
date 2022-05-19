import { MessageContent, MessageType } from '../context/MessageContext'
import { sleep } from '../utils/flowutils'

// function messageFromDict(dict: { content: String }) {
//   return new MessageContent(MessageType.text, dict.content, [
//     {
//       content: 'Continue',
//       onClick: async (context) =>
//         context.addMessage(messageFromDict(connectedMessage2)),
//     },
//   ])
// }

export const connectedMessage: MessageContent = {
  content: [
    'Yay! you connected your wallet',
    'you are literally the best',
    'we all love you!',
  ],
  actions: [
    {
      content: 'Continue',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Connecting metamask',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(connectedMessage, newHist)
        // return context.addMessage(connectedMessage)
      },
    },
    {
      content: 'Continue Anyways',
      onClick: async (context) => {
        await sleep(5000)
        return context.addMessage(connectedMessage)
        // return context.addMessage(connectedMessage)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}
// export const connectedMessage: MessageContent = new MessageContent(
//   MessageType.text,
//   [
//     'Yay! you connected your wallet',
//     'you are literally the best',
//     'we all love you!',
//   ],
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => {
//         await sleep(500)
//         return context.addMessage(connectedMessage)
//         // return context.addMessage(connectedMessage)
//       },
//     },
//     {
//       content: 'Continue Anyways',
//       onClick: async (context) => {
//         await sleep(5000)
//         return context.addMessage(connectedMessage)
//         // return context.addMessage(connectedMessage)
//       },
//     },
//   ],
//   400,
// )

// export const connectedMessage: MessageContent = new MessageContent(
//   MessageType.text,
//   'Yay! you connected yout wallet',
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => {
//         await sleep(2000)
//         return context.addMessage(connectedMessage)
//         return context.addMessage(connectedMessage)
//       },
//     },
//   ],
// )

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
