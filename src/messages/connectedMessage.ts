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

// Build the URL for opening NFT in opensea
function buildURL() {
  const url_built = 'https://opensea.io/'
  return url_built
}

// ******************* Intro Wallet Connect *******************
export const introMessage: MessageContent = {
  content: [
    'Beep Boop!',
    'Welcome to the PretzelDAO Pretzery!',
    'Before you start shopping, let me know where I should put your Pretzels?',
  ],
  actions: [
    {
      content: 'In my Metamask.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(introMessage2, newHist)
      },
    },
    {
      content: 'In my Wallet Connect.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Wallet Connect.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(introMessage2, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// ********************* Intro (Frame 27) *********************
export const introMessage2: MessageContent = {
  content: [
    'Fantastic! You\'re connected now.',
    'Boop Boop! How can I help you today?',
  ],
  actions: [
    {
      content: 'I\'d like a free pretzel.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'I\'d like a free pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(freePretzelMessage2, newHist)
      },
    },
    {
      content: 'I want to look at the special 1/1 Pretel.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'I want to look at the special 1/1 Pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(specialPretzelMessage1, newHist)
      },
    },
    {
      content: 'Actually, I don\'t need anything today.',
      onClick: async (context) => {
        await sleep(500)
        // TO-DO: Redirect to landing page with "Enter Bakery" sign
        return context.addMessage(introMessage)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// *********************************************************
// ********************* Free Pretzels *********************

/*************** Wallet Sign-In [Archived] (Frame 75) *************
TO-DO:
 - execute connect with Metamask
 - execute connect with Wallet Connect
export const freePretzelMessage1: MessageContent = {
  content: [
    'Delicious choice!',
    'Where should I put your free Pretzel?',
  ],
  actions: [
    {
      content: 'In my Metamask.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(freePretzelMessage2, newHist)
      },
    },
    {
      content: 'In my Wallet Connect.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Wallet Connect.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(freePretzelMessage2, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}
*/

// ************ Execute Mint (Frame 77) ********************
// TO-DO:
// - sign via Wallet and execute mint contract
export const freePretzelMessage2: MessageContent = {
  content: [
    'Delicious choice!',
    'Since it\'s your first pretzel, it’/s completely free.',
    'That also means no gas fees!',
    'So, shall I give you your Pretzel?',
  ],
  actions: [
    {
      content: 'Yes, give Pretzel!',
      onClick: async (context) => {
        await sleep(2000)
        const newHist = await context.addMessage({
          content: 'Yes, give Pretzel!',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(4000)
        // TO-DO
        // Mint should happen here
        return context.addMessage(freePretzelMessage3, newHist)
      },
    },
    {
      content: 'No, I changed my mind.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'No, I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(introMessage2, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// ************* Show Pretzel (Frame 79) *******************
// TO-DO:
// - Display preview image of pretzel in text
// - add proper Opensea URL here 
// - Get the contract address and build the URL
// - Structure: opensea.io/asset/<Chain>/<Contract_Address>/<Number>
export const freePretzelMessage3: MessageContent = {
  content: [
    'I put your Pretzel in your wallet!',
    '(image){Show Pretzel Here}',
    'You can also look at your Pretzel on Opensea.',
    'Do you want to go to Opensea?',
  ],
  actions: [
    {
      content: 'Yes, let me take a look.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Yes, let me take a look.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        // TO-DO 
        const url = buildURL()
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return context.addMessage(freePretzelMessage4, newHist)
      },
    },
    {
      content: 'No, I\'m good.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'No, I\'m good.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(freePretzelMessage4, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// *************** Redirect Intro (Frame 80) ***************
// TO-DO:
// - Redirect to landing page with "Enter Bakery" sign
export const freePretzelMessage4: MessageContent = {
  content: [
    'I hope you like your Pretzel!',
    'So, anything else I can do for you?'
  ],
  actions: [
    {
      content: 'I want another regular Pretzel.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'I want another regular Pretzel',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(freePretzelMessage5, newHist)
      },
    },
    {
      content: 'I\'m curious about the special 1/1 Pretzels.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'I\'m curious about the special 1/1 Pretzels.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(specialPretzelMessage1, newHist)
      },
    },
    {
      content: 'No, I think I\'m done.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'No, I think I\'m done.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        // TO-DO
        return context.addMessage(introMessage2, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// ************** Another Pretzel (Frame 81) ***************
// - sign via Wallet and execute mint contract
export const freePretzelMessage5: MessageContent = {
  content: [
    'Oh yes! More Pretzels, more fun!',
    'However, only your first pretzel was free.',
    'The next pretzels will cost a little bit.'
  ],
  actions: [
    {
      content: 'Yes, I\'ll take another Pretzel!',
      onClick: async (context) => {
        await sleep(2000)
        const newHist = await context.addMessage({
          content: 'Yes, I\'ll take another Pretzel!',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(4000)
        // TO-DO
        // Mint should happen here
        return context.addMessage(freePretzelMessage3, newHist)
      },
    },
    {
      content: 'No, I changed my mind.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'No, I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(introMessage, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// *********************************************************
// ******************** Special Pretzels *******************

// ********************* Frame 83 **************************
// TO-DO
// Special case of the chat. No action should be required.
// Instead it should be 2 chat items => scene transition => follow up chat
// I.e. no button press inbetween
// - Scene transition
export const specialPretzelMessage1: MessageContent = {
  content: [
    'OOHHHEEE! Delicious choice!',
    'Let\'s go into the secret room',
  ],
  actions: [
    {
      content: 'Let\'s go!',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Let\'s go!',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        // TO-DO
        // Here the scene change should happen => secrete_scene.gif
        return context.addMessage(specialPretzelMessage2, newHist)
      },
    },
    {
      content: 'Actually I changed my mind.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Actually I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(introMessage2, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}

// ********************* Frame 84 **************************

export const specialPretzelMessage2: MessageContent = {
  content: [
    'OOHHHEEE! Delicious choice!',
    'Let\'s go into the secret room',
  ],
  actions: [
    {
      content: 'Let\'s go!',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Let\'s go!',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        // TO-DO
        // Here the scene change should happen => secrete_scene.gif
        return context.addMessage(specialPretzelMessage2, newHist)
      },
    },
    {
      content: 'Actually I changed my mind.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'Actually I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(500)
        return context.addMessage(introMessage2, newHist)
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
