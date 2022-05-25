import { CONFIG } from '../config'
import {
  AppState,
  MessageContent,
  MessageType,
} from '../context/MessageContext'
import { LoginState } from '../context/Web3Context'
import { sleep } from '../utils/flowutils'
import { MessageContext } from '../context/MessageContext'
import { IGenesisPretzelContext } from '../context/GenesisPretzelContext'

// Build the URL for opening NFT in opensea
function buildURL(tokenid: number) {
  const url_built =
    'https://opensea.io/' +
    CONFIG.SUGAR_PRETZEL_CONTRACT.address +
    '/' +
    tokenid
  return url_built
}

function changeToInside() {
  return
}

function changeToSecret() {
  return
}

// Mint Special Pretzel. Removed this function from specialPretzelMessage1 to have less double code for different number of Pretzels
//TODO @Johannes please review this function, I have almost no clue, what I am doing
async function mintSpecialPretzel(
  messageContext: MessageContext,
  genesisPretzelContext: IGenesisPretzelContext,
  numberOfPretzels: number,
  newHist: MessageContent[]
) {
  //TODO @Nick what network is wallet on?
  const walletNetwork = 'Ethereum'
  newHist = await messageContext.addMessage({
    content: 'Minting Pretzel(s) now ...',
    type: MessageType.text,
  })
  if (walletNetwork == 'Ethereum') {
    console.log('trying to mint now')
    console.log(genesisPretzelContext)
    const tokenId = await genesisPretzelContext.mint(numberOfPretzels)

    const mintSuccessful = tokenId >= 0
    if (!mintSuccessful) {
      console.log('Mint unSuccessful')
      return messageContext.addMessage(
        somethingWentWrongWhileMintingMessage,
        newHist
      )
    } else {
      console.log('Mint successful')
      //TODO @Johannes, this failes
      return await messageContext.addMessage(specialPretzelMessage2, newHist)
    }
  } else {
    console.log('wrong chain')
    return messageContext.addMessage(changeChainEthereumMessage, newHist)
  }
}

// ******************* Intro Wallet Connect *******************
export const welcomeMessage: MessageContent = {
  content: [
    'Beep Boop!',
    'Welcome to the PretzelDAO NFT Bakery!',
    'If it is your first time here, you can get a free Sugar Pretzel.\nYou can also have a look at our Special Pretzels.',
  ],
  actions: [
    {
      content: 'Free Pretzel',
      onClick: async (context, web3, ISugarPretzelContext) => {
        let address = web3.address
        let newHist = await context.addMessage({
          content: 'Free Pretzels sounds great!',
          type: MessageType.text,
          sendByUser: true,
        })

        web3.setTargetContract('SUGAR_PRETZEL_CONTRACT')
        if (address) {
          console.log('Wallet connected')
          if (!web3.isCorrectChain()) {
            //TODO: @vici check flow
            return context.addMessage(changeChainPolygonMessage, newHist)
          }
          const _canMintGasless = await ISugarPretzelContext.canMintGasless()
          if (_canMintGasless) {
            return context.addMessage(firstFreePretzelMessage, newHist)
          } else {
            return context.addMessage(freePretzelMessage, newHist)
          }
        } else {
          console.log('Wallet not connected')
          return context.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Special Pretzel',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let address = web3Context.address
        let newHist = await messageContext.addMessage({
          content: 'Special Pretzel sounds interesting!',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO: WE NEED TO ADD AN EXTRA MESSAGE FOR STRATE UPDATE
        web3Context.setTargetContract('GENESIS_PRETZEL_CONTRACT')
        if (address) {
          console.log('Wallet connected')
          //TODO @Alex REDO Background
          //changeToSecret()
          messageContext.setBackground('/scenes/secret_bakery_scene.mp4')
          messageContext.setBackgroundColor('#0e1234')
          messageContext.setBackgroundColor2('#0e1234')
          messageContext.setAppState(AppState.secret)

          if (!web3Context.isCorrectChain()) {
            //TODO: @Vici check if   right flow here

            return messageContext.addMessage(
              changeChainEthereumMessage,
              newHist
            )
          }

          const soldOut = await genesisPretzelContext.isSoldOut()
          if (soldOut) {
            return messageContext.addMessage(
              specialPretzelsSoldOutMessage,
              newHist
            )
          } else {
            return messageContext.addMessage(specialPretzelMessage1, newHist)
          }
        } else {
          //changeToSecret()
          messageContext.setBackground('/scenes/inside_bakery_scene.mp4')
          messageContext.setBackgroundColor('#ffd4a4')
          messageContext.setBackgroundColor2('#ffd4a4')
          messageContext.setAppState(AppState.chat)
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            newHist
          )
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const connectWalletPolygonMessage: MessageContent = {
  content: [
    'Free Pretzels are stored on the Polygon Blockchain.',
    'In order to mint them, you need to connect your Polygon wallet.',
  ],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (messageContext, web3Context, sugarPretzelContext) => {
        let loginState = LoginState.notInstalled
        let newHist = await messageContext.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context) {
          loginState = await web3Context.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await messageContext.addMessage(
            {
              content:
                'Metamask is not installed, please install it! \nYou can find a tutorial here: https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await messageContext.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        if (!web3Context?.isCorrectChain()) {
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
        const canMintGasless = await sugarPretzelContext.canMintGasless()
        if (canMintGasless) {
          return messageContext.addMessage(firstFreePretzelMessage, newHist)
        } else {
          return messageContext.addMessage(freePretzelMessage, newHist)
        }
      },
    },
    {
      content: 'What is a Wallet?',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'What is a Wallet?',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(whatIsAWalletMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const connectWalletEthereumMessage: MessageContent = {
  content: [
    'Special Pretzels are stored on the Ethereum Blockchain.',
    'In order to mint them, you need to connect your Ethereum wallet.',
  ],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (context, web3) => {
        let loginState = LoginState.notInstalled
        let newHist = await context.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3) {
          loginState = await web3.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await context.addMessage(
            {
              content:
                'Metamask is not installed, please install it! \nYou can find a tutorial here: https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await context.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await context.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await context.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainEthereumMessage, newHist)
        }
        return context.addMessage(freePretzelMessage, newHist)
      },
    },
    {
      content: 'What is a Wallet?',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'What is a Wallet?',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(whatIsAWalletMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const whatIsAWalletMessage: MessageContent = {
  content: [
    'A Wallet is your account on the Blockchain. \nIf you have not used one before, check out this lesson on Wallets:',
  ],
  actions: [
    {
      content: 'Show me!',
      onClick: async (messageContext, web3Context) => {
        const newHist = await messageContext.addMessage({
          content: 'Doing the lesson now.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url = 'https://app.banklessacademy.com/lessons/wallet-basics'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null

        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            newHist
          )
        } else {
          return messageContext.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'I know everything!',
      onClick: async (context, web3) => {
        const newHist = await context.addMessage({
          content: 'I know everything.',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return context.addMessage(connectWalletEthereumMessage, newHist)
        } else {
          return context.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const whatIsAChainMessage: MessageContent = {
  content: [
    'A Blockchain is a decentralized ledger that lets you store data.\nFor example it stores which NFT belongs to which Wallets.',
    'At the moment, the most common chain for NFTs is Ethereum.\nHowever, it is also quite expensive.',
    'For our free Pretzels we therefore use Polygon.',
  ],
  actions: [
    {
      content: 'Got it!',
      onClick: async (messageContext, web3Context) => {
        const newHist = await messageContext.addMessage({
          content: 'Got it!',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            newHist
          )
        } else {
          return messageContext.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const mainMenuMessage: MessageContent = {
  content: ['What else can I do for you?'],
  actions: [
    {
      content: 'Free Pretzels',
      onClick: async (context, web3, ISugarPretzelContext) => {
        let address = web3.address
        let newHist = await context.addMessage({
          content: 'Free Pretzels sounds great!',
          type: MessageType.text,
          sendByUser: true,
        })

        web3.setTargetContract('SUGAR_PRETZEL_CONTRACT')
        console.log('ON CHAIN:', web3.targetContract)
        if (address) {
          console.log('Wallet connected')
          if (!web3.isCorrectChain()) {
            //TODO: @Vici check if right flow here

            return context.addMessage(changeChainPolygonMessage, newHist)
          }
          const canMintGasless = await ISugarPretzelContext.canMintGasless()
          if (canMintGasless) {
            return context.addMessage(firstFreePretzelMessage, newHist)
          } else {
            return context.addMessage(freePretzelMessage, newHist)
          }
        } else {
          console.log('Wallet not connected')
          return context.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Special Pretzels',
      onClick: async (context, web3) => {
        let address = web3.address
        let newHist = await context.addMessage({
          content: 'Special Pretzels sounds interesting!',
          type: MessageType.text,
          sendByUser: true,
        })
        web3.setTargetContract('GENESIS_PRETZEL_CONTRACT')
        console.log('ON CHAIN:', web3.targetContract)

        if (address) {
          console.log('Wallet connected')
          //changeToSecret()
          context.setBackground('/scenes/secret_bakery_scene.mp4')
          context.setBackgroundColor('#0e1234')
          context.setBackgroundColor2('#0e1234')
          context.setAppState(AppState.secret)
          if (!web3.isCorrectChain()) {
            //TODO: @Vici check if   right flow here

            return context.addMessage(changeChainEthereumMessage, newHist)
          }
          return context.addMessage(specialPretzelMessage1, newHist)
        } else {
          return context.addMessage(connectWalletEthereumMessage, newHist)
        }
      },
    },
    {
      content: 'Leave Shop',
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: 'Thank you so much! See you soon.',
          type: MessageType.text,
          sendByUser: true,
        })
        context.setAppState(AppState.welcome)
        return []
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const somethingWentWrongWhileMintingMessage: MessageContent = {
  content: ['Uh oh, seams like something went wrong.'],
  actions: [
    {
      content: 'Try Again',
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: "Ok let's try again.",
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return context.addMessage(connectWalletEthereumMessage, newHist)
        } else {
          context.setBackground('inside_bakery.gif')
          return context.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Never Mind',
      onClick: async (context) => {
        let newHist = await context.addMessage({
          content: 'No, I am done.',
          type: MessageType.text,
          sendByUser: true,
        })
        context.setBackground('inside_bakery.gif')
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const firstFreePretzelMessage: MessageContent = {
  content: [
    "Since it's your first pretzel, it's completely free. No gas either.",
    'Are you ready to mint?',
  ],
  actions: [
    {
      content: 'Yes',
      onClick: async (messageContext, web3Context, contractContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Yes, give Pretzel!',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3Context.isCorrectChain()) {
          console.log('trying to mint now')
          console.log(contractContext)
          const tokenId = await contractContext.mintGasless()

          const mintSuccessful = tokenId >= 0
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return messageContext.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            newHist = await messageContext.addMessage({
              content: CONFIG.BACKEND_URL + '/bakery/' + tokenId,
              type: MessageType.image,
              sendByUser: true,
            })
            await sleep(400)
            return messageContext.addMessage(freePretzelMessage2, newHist)
          }
        } else {
          console.log('wrong chain')
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'No',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'No, I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}
export const freePretzelMessage: MessageContent = {
  content: [
    'Since you already have your first Pretzel,\nyou will now have to pay gas yourself.',
    'Do you still want your Pretzel?',
  ],
  actions: [
    {
      content: 'Yes',
      onClick: async (messageContext, web3Context, sugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Yes, please!',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3Context.isCorrectChain()) {
          console.log('trying to mint now')
          console.log(sugarPretzelContext)
          const tokenId = await sugarPretzelContext.mintSugarPretzel()

          const mintSuccessful = tokenId >= 0
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return messageContext.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            newHist = await messageContext.addMessage({
              content: CONFIG.BACKEND_URL + '/bakery/' + tokenId,
              type: MessageType.image,
              sendByUser: true,
            })
            await sleep(400)
            return messageContext.addMessage(freePretzelMessage2, newHist)
          }
        } else {
          console.log('wrong chain')
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'No',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'No, I changed my mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// Not used
// export const userDidNotSignTransactionMessage: MessageContent = {
//   content: [
//     'In order to mint your Pretzel, you need to sign the Transaction in your Wallet',
//   ],
//   actions: [
//     {
//       content: 'Try again',
//       onClick: async (context, web3) => {
//         let newHist = await context.addMessage({
//           content: 'Ok, let me try this again!',
//           type: MessageType.text,
//           sendByUser: true,
//         })
//         //TODO if user has a free pretzel -> FreePretzelMessage, If user does not have free Pretzel -> FirstFreePretzelMessage
//         return context.addMessage(freePretzelMessage, newHist)
//       },
//     },
//     {
//       content: 'Abort!',
//       onClick: async (context, web3) => {
//         let newHist = await context.addMessage({
//           content: "I don't want to mint a pretzel!",
//           type: MessageType.text,
//           sendByUser: true,
//         })
//         return context.addMessage(mainMenuMessage, newHist)
//       },
//     },
//   ],
//   delay: 1000,
//   type: MessageType.text,
// }

export const changeChainPolygonMessage: MessageContent = {
  content: [
    'Your Wallet is connected! But we need to change the Chain to Polygon.',
  ],
  actions: [
    {
      content: 'Change to Polygon!',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'Changing to Polygon',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Nick @Johannes fix because not reliable!
        await web3Context.switchToCorrectChain()
        if (!web3Context.isCorrectChain()) {
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
        return messageContext.addMessage(freePretzelMessage, newHist)
      },
    },
    {
      content: 'What is a chain?',
      onClick: async (context) => {
        let newHist = await context.addMessage({
          content: 'What is a chain?',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(whatIsAChainMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainEthereumMessage: MessageContent = {
  content: [
    'Your Wallet is connected! But we need to change the Chain to Ethereum.',
  ],
  actions: [
    {
      content: 'Change to Ethereum!',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'In my Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Nick @Johannes check
        await web3Context.switchToCorrectChain()
        if (!web3Context.isCorrectChain()) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        }
        return messageContext.addMessage(specialPretzelMessage1, newHist)
      },
    },
    {
      content: 'What is a chain?',
      onClick: async (context) => {
        let newHist = await context.addMessage({
          content: 'What is a chain?',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(whatIsAChainMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// ************* Show Pretzel (Frame 79 - Inside Scene) *******************
// TO-DO:
// - Display preview image of pretzel in text
// - add proper Opensea URL here
// - Get the contract address and build the URL
// - Structure: opensea.io/asset/<Chain>/<Contract_Address>/<Number>

export const freePretzelMessage2: MessageContent = {
  content: [
    'Look at this fantastic Pretzel:',
    'Do you also want to look at your Pretzel on Opensea?',
  ],
  actions: [
    {
      content: 'Yes',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Yes, let me have a look.',
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Nick think about way to store last token mint
        const url = buildURL(1)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'No',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: [MessageType.text, MessageType.image, MessageType.text],
}

// *********************************************************
// ******************** Special Pretzels *******************

// *********** Secret Room Intro (Frame 61 - Secret Scene) ****************
// TO-DO
// - Select of how many pretzels

export const specialPretzelsSoldOutMessage: MessageContent = {
  content: [
    'Oh no, we are already out of Special Pretzels.',
    'Have a look at Opensea to buy some on the secondary market',
  ],
  actions: [
    {
      content: 'View on Opensea',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'Let me look.',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO Nick not sure if this link works .... OS added their route structure
        const url =
          'https://opensea.com/assets/ethereum/' +
          CONFIG.GENESIS_PRETZEL_CONTRACT.address
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'I am good',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I am good.',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const specialPretzelMessage1: MessageContent = {
  content: [
    'Welcome to my secret stash.',
    'Special Pretzels were created by our DAO Members to collect funds \n for making more cool stuff.',
    'They are all unique and will be revealed on Friday 3rd of June',
    'You can mint as many as you want. They are 0.1 eth each.',
    'If you want several, minting in bulk is cheaper. How many do you want?',
  ],
  actions: [
    {
      content: '1',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: '1 is fine, thx!',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintSpecialPretzel(
          messageContext,
          genesisPretzelContext,
          1,
          newHist
        )
      },
    },
    {
      content: '2',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'I am having 2, please.',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintSpecialPretzel(
          messageContext,
          genesisPretzelContext,
          2,
          newHist
        )
      },
    },
    {
      content: '3',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'I am having 3, please!',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintSpecialPretzel(
          messageContext,
          genesisPretzelContext,
          3,
          newHist
        )
      },
    },
    {
      content: 'Go Back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: "Actually, I don't want to buy one.",
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Alex change background to light scene
        //changeToInsde()
        context.setBackground('/scenes/inside_bakery_scene.mp4')
        context.setBackgroundColor('#ffd4a4')
        context.setBackgroundColor2('#ffd4a4')
        context.setAppState(AppState.chat)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// ******************* Show Purchase (Frame 85 - Secret Scene) **************************
// TO-DO:
// - Link to Opensea

export const specialPretzelMessage2: MessageContent = {
  content: [
    'I put your pretzel(s) in your Wallet!',
    'You can have a look at the preview on Opensea. \nBut they will only be revealed on Friday 3rd of June.',
  ],
  actions: [
    {
      content: 'Take me to Opensea',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: "Yes, let's go to Opensea",
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Nick think about how to store tken id
        const url = buildURL(1)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        //TODO @Alex return to light scene
        //changeToInsde()
        context.setBackground('/scenes/inside_bakery_scene.mp4')
        context.setBackgroundColor('#ffd4a4')
        context.setBackgroundColor2('#ffd4a4')
        context.setAppState(AppState.chat)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'I am good.',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Alex return to light scene
        //changeToInsde()
        context.setBackground('/scenes/inside_bakery_scene.mp4')
        context.setBackgroundColor('#ffd4a4')
        context.setBackgroundColor2('#ffd4a4')
        context.setAppState(AppState.chat)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}
