import { CONFIG } from '../config'
import {
  AppState,
  MessageContent,
  MessageType,
  useMessageContext,
} from '../context/MessageContext'
import { LoginState, useWeb3 } from '../context/Web3Context'
import { sleep } from '../utils/flowutils'
import { ISugarPretzelContext } from '../context/SugarPretzelContext'

// Build the URL for opening NFT in opensea
function buildURL(tokenid: number) {
  const url_built =
    'https://opensea.io/' +
    CONFIG.SUGAR_PRETZEL_CONTRACT.address +
    '/' +
    tokenid
  return url_built
}

// ******************* Intro Wallet Connect *******************
export const welcomeMessage: MessageContent = {
  content: [
    'Beep Boop!',
    'Welcome to the PretzelDAO NFT Bakery!',
    'If it is your first time here, you can get a free Sugar Pretzel.',
    'Not your first time?\nYou can have as many Pretzels as you want as long as you pay the gas.',
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
        if (address) {
          console.log('Wallet connected')
          //const canMintGasless = ISugarPretzelContext.canMintGasless()
          //TODO @Nick was not able to use function because of this Error: This condition will always return true since this 'Promise<boolean | undefined>' is always defined.  TS2801
          const canMintGasless = true
          if (canMintGasless) {
            //TODO @Nick canMitGasless testing
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

export const connectWalletPolygonMessage: MessageContent = {
  content: [
    'Free Pretzels are stored on the Polygon Blockchain.',
    'In order to mint them, you need to connect your Polygon wallet.',
  ],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (context, web3, ISugarPretzelContext) => {
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
          return context.addMessage(changeChainPolygonMessage, newHist)
        }
        //const canMintGasless = ISugarPretzelContext.canMintGasless()
        //TODO @Nick was not able to use function because of this Error: This condition will always return true since this 'Promise<boolean | undefined>' is always defined.  TS2801
        const canMintGasless = true
        if (canMintGasless) {
          //TODO @Nick canMitGasless testing
          return context.addMessage(firstFreePretzelMessage, newHist)
        } else {
          return context.addMessage(freePretzelMessage, newHist)
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

export const whatIsAWalletMessage: MessageContent = {
  content: [
    'A Wallet is your account on the Blockchain. \nIf you have not used one before, check out this lesson on Wallets:',
  ],
  actions: [
    {
      content: 'Show me!',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'Doing the lesson now.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url = 'https://app.banklessacademy.com/lessons/wallet-basics'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return context.addMessage(connectWalletPolygonMessage, newHist)
      },
    },
    {
      content: 'I know everything!',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I know everything.',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(connectWalletPolygonMessage, newHist)
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
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'Got it!',
          type: MessageType.text,
          sendByUser: true,
        })
        return context.addMessage(connectWalletPolygonMessage, newHist)
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
      content: 'Free Pretzel',
      onClick: async (context, web3, ISugarPretzelContext) => {
        let address = web3.address
        let newHist = await context.addMessage({
          content: 'Free Pretzels sounds great!',
          type: MessageType.text,
          sendByUser: true,
        })
        if (address) {
          console.log('Wallet connected')
          //const canMintGasless = ISugarPretzelContext.canMintGasless()
          //TODO @Nick was not able to use function because of this Error: This condition will always return true since this 'Promise<boolean | undefined>' is always defined.  TS2801
          const canMintGasless = true
          if (canMintGasless) {
            //TODO @Nick canMitGasless testing
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
      onClick: async (context) => {
        let newHist = await context.addMessage({
          content: "Ok let's try again.",
          type: MessageType.text,
          sendByUser: true,
        })
        context.setBackground('inside_bakery.gif')
        return context.addMessage(connectWalletPolygonMessage, newHist)
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
      onClick: async (context, web3context, contractContext) => {
        let newHist = await context.addMessage({
          content: 'Yes, give Pretzel!',
          type: MessageType.text,
          sendByUser: true,
        })

        //TODO @Nick variable to see on what chain user is
        const walletNetwork = 'Polygon'
        if (walletNetwork == 'Polygon') {
          console.log('trying to mint now')
          console.log(contractContext)
          //TODO @Johannes is this mint correct?
          await contractContext.mintGasless()

          const mintSuccessful = true
          //TODO @Nick mintSuccessful check
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return context.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            return context.addMessage(freePretzelMessage2, newHist)
          }
        } else {
          console.log('wrong chain')
          return context.addMessage(changeChainPolygonMessage, newHist)
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
      onClick: async (context, web3, contractContext) => {
        let newHist = await context.addMessage({
          content: 'Yes, please!',
          type: MessageType.text,
          sendByUser: true,
        })

        //TODO @Nick variable to see on what chain user is
        const walletNetwork = 'Polygon'
        if (walletNetwork == 'Polygon') {
          console.log('trying to mint now')
          console.log(contractContext)
          await contractContext.mintSugarPretzel()

          const mintSuccessful = true
          //TODO @Nick mintSuccessful check
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return context.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            return context.addMessage(freePretzelMessage2, newHist)
          }
        } else {
          console.log('wrong chain')
          return context.addMessage(changeChainPolygonMessage, newHist)
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

export const changeChainPolygonMessage: MessageContent = {
  content: [
    'Your Wallet is connected! But we need to change the Chain to Polygon.',
  ],
  actions: [
    {
      content: 'Change to Polygon!',
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: 'Changing to Polygon',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Johannes change to correct Chain
        await web3?.switchToEthereum()
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainPolygonMessage, newHist)
        }
        return context.addMessage(freePretzelMessage, newHist)
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
    //TODO @Nick correct image
    '/logo192.png',
    'Do you also want to look at your Pretzel on Opensea?',
  ],
  actions: [
    {
      content: 'Yes',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'Yes, let me have a look.',
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Johannes correct toke id
        const url = buildURL(1)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return context.addMessage(mainMenuMessage, newHist)
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
