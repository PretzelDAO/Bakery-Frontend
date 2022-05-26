import { CONFIG } from '../config'
import {
  AppState,
  MessageContent,
  MessageType,
} from '../context/MessageContext'
import { LoginState } from '../context/Web3Context'
import { sleep } from '../utils/flowutils'
import { IMessageContext } from '../context/MessageContext'
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

function changeToInside(messageContext: any) {
  messageContext.setBackgroundColor('#ffd4a4')
  messageContext.setBackgroundColor2('#ffd4a4')
  messageContext.setAppState(AppState.chat)
  return
}

function changeToSecret(messageContext: any) {
  messageContext.setBackgroundColor('#0e1234')
  messageContext.setBackgroundColor2('#0e1234')
  messageContext.setAppState(AppState.secret)
  return
}

function changeToOutside(messageContext: any) {
  messageContext.setAppState(AppState.welcome)
  messageContext.setBackground('outside_bakery_scene.gif')
  messageContext.setBackgroundColor('transparent')
  messageContext.setBackgroundColor2('transparent')
}
// Mint Special Pretzel. Removed this function from specialPretzelMessage1 to have less double code for different number of Pretzels
//TODO @Johannes please review this function, I have almost no clue, what I am doing
async function mintSpecialPretzel(
  messageContext: IMessageContext,
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
      //TODO @Johannes, this fails
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
          changeToSecret(messageContext)
          if (!web3Context.isCorrectChain()) {
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
          changeToSecret(messageContext)
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

export const whatIsAWalletMessage: MessageContent = {
  content: [
    'A Wallet is your account on the blockchain. \nIf you have not used one before, check out this lesson on Wallets:',
  ],
  actions: [
    {
      content: 'Show me!',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'Doing the lesson now.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url = 'https://app.banklessacademy.com/lessons/wallet-basics'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        newHist = await messageContext.addMessage(
          {
            content: 'Great, let me know when you are ready!',
            type: MessageType.text,
          },
          newHist
        )
        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage2,
            newHist
          )
        } else {
          return messageContext.addMessage(
            connectWalletPolygonMessage2,
            newHist
          )
        }
      },
    },
    {
      content: 'I know everything!',
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: 'I know everything.',
          type: MessageType.text,
          sendByUser: true,
        })
        newHist = await context.addMessage(
          {
            content: 'Great! Let us continue, then.',
            type: MessageType.text,
          },
          newHist
        )
        if (web3.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return context.addMessage(connectWalletEthereumMessage2, newHist)
        } else {
          return context.addMessage(connectWalletPolygonMessage2, newHist)
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const whatIsAChainMessage: MessageContent = {
  content: [
    'A blockchain is a decentralized ledger that lets you store data.\nFor example it stores which NFT belongs to which Wallet.',
    'At the moment, the most common chain for NFTs is Ethereum.\nHowever, it is also quite expensive.',
    'For our Sugar Pretzels we therefore use Polygon.\nAnd our Special Pretzels are on Ethereum',
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
          return messageContext.addMessage(changeChainEthereumMessage2, newHist)
        } else {
          return messageContext.addMessage(changeChainPolygonMessage2, newHist)
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
        changeToSecret(context)
        web3.setTargetContract('GENESIS_PRETZEL_CONTRACT')
        console.log('ON CHAIN:', web3.targetContract)

        if (address) {
          console.log('Wallet connected')
          changeToSecret(context)
          if (!web3.isCorrectChain()) {
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
        changeToOutside(context)
        return []
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// *********************************************************
// ******************** Free Pretzels Minting *******************

export const connectWalletPolygonMessage: MessageContent = {
  content: [
    'Free Pretzels are stored on the Polygon blockchain.',
    'In order to mint them, you need to connect your wallet.',
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
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
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

export const connectWalletPolygonMessage2: MessageContent = {
  content: [],
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
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
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
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
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
        const _canMintGasless = await ISugarPretzelContext.canMintGasless()
        if (_canMintGasless) {
          return messageContext.addMessage(firstFreePretzelMessage, newHist)
        } else {
          return messageContext.addMessage(freePretzelMessage, newHist)
        }
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
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
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

export const changeChainPolygonMessage2: MessageContent = {
  content: ['Great, now let us switch Chain'],
  actions: [
    {
      content: 'Change to Polygon!',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
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
        const _canMintGasless = await ISugarPretzelContext.canMintGasless()
        if (_canMintGasless) {
          return messageContext.addMessage(firstFreePretzelMessage, newHist)
        } else {
          return messageContext.addMessage(freePretzelMessage, newHist)
        }
      },
    },
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
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

          newHist = await messageContext.addMessage(
            {
              content: [
                'While we are baking, let me tell you a bit about Sugar Pretzels',
                'Which pretzel and topping you get is completely randomized.\nHowever, some traits are less common.\nIf you get toppings in the PretzelDAO CI colors, you were especially lucky!',
                'As for the Background color, we are looking at the weather data in Munich in the last day.\nThe Background will depend on the temperature and the amount of rain.',
                'Now let us wait for the Pretzel...',
              ],
              delay: 2000,
              type: MessageType.text,
            },
            newHist
          )
          //TODO @Johannes spinning wheel?
          const tokenId = await contractContext.mintGasless()
          const mintSuccessful = tokenId >= 0
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return messageContext.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            const data = await fetch(CONFIG.BACKEND_URL + '/bakery/' + tokenId)
            const datajson = await data.json()
            newHist = await messageContext.addMessage(
              {
                content: 'Look at this fantastic Pretzel:',
                type: MessageType.text,
              },
              newHist
            )
            console.log('RESPONSE:', datajson)
            newHist = await messageContext.addMessage(
              {
                content: datajson?.image,
                type: MessageType.image,
              },
              newHist
            )
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
          newHist = await messageContext.addMessage(
            {
              content: [
                'While we are baking, let me tell you a bit about Sugar Pretzels',
                'Which pretzel and topping you get is completely randomized.\nHowever, some traits are less common.\nIf you get toppings in the PretzelDAO CI colors, you were especially lucky!',
                'As for the Background color, we are looking at the weather data in Munich in the last day.\nThe Background will depend on the temperature and the amount of rain.',
                'Now let us wait for the Pretzel...',
              ],
              delay: 2000,
              type: MessageType.text,
            },
            newHist
          )
          //TODO @Johannes spinning wheel?
          const tokenId = await sugarPretzelContext.mintSugarPretzel()

          const mintSuccessful = tokenId >= 0
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return messageContext.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
            const data = await fetch(CONFIG.BACKEND_URL + '/bakery/' + tokenId)
            const datajson = await data.json()
            newHist = await messageContext.addMessage(
              {
                content: 'Look at this fantastic Pretzel:',
                type: MessageType.text,
              },
              newHist
            )
            console.log('RESPONSE:', datajson)
            newHist = await messageContext.addMessage(
              {
                content: datajson?.image,
                type: MessageType.image,
              },
              newHist
            )
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

export const freePretzelMessage2: MessageContent = {
  content: ['Do you also want to look at your Pretzel on Opensea?'],
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
  type: [MessageType.text, MessageType.text],
}

// *********************************************************
// ******************** Special Pretzels Minting *******************

export const connectWalletEthereumMessage: MessageContent = {
  content: [
    'Special Pretzels are stored on the Ethereum blockchain.',
    'In order to mint them, you need to connect your wallet.',
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
          return context.addMessage(changeChainEthereumMessage, newHist)
        }
        const _canMintGasless = await ISugarPretzelContext.canMintGasless()
        if (_canMintGasless) {
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
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(context)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const connectWalletEthereumMessage2: MessageContent = {
  content: [],
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
          return context.addMessage(changeChainEthereumMessage, newHist)
        }
        const _canMintGasless = await ISugarPretzelContext.canMintGasless()
        if (_canMintGasless) {
          return context.addMessage(firstFreePretzelMessage, newHist)
        } else {
          return context.addMessage(freePretzelMessage, newHist)
        }
      },
    },
    {
      content: 'Go Back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
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
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(context)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainEthereumMessage2: MessageContent = {
  content: ['Great, now let us switch Chain'],
  actions: [
    {
      content: 'Change to Ethereum!',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'Change to Ethereum!',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Nick @Johannes check this seams to be buggy.
        await web3Context.switchToCorrectChain()
        if (!web3Context.isCorrectChain()) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        }
        return messageContext.addMessage(specialPretzelMessage1, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (context) => {
        const newHist = await context.addMessage({
          content: 'I do not want a Pretzel',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(context)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

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
        changeToInside(context)
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
        changeToInside(context)
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
    'They are all unique and will be revealed on Friday 3rd of June.',
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
        changeToInside(context)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

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
        //TODO @Johannes Link to Opensea
        const url = buildURL(1)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        changeToInside(context)
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
        changeToInside(context)
        return context.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// *********************************************************
// ******************** Error Handling *******************

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
