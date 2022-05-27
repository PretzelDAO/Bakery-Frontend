import React, { createContext, useEffect, useState } from 'react'
import { RelayProvider } from '@opengsn/provider'

import { ethers } from 'ethers'
import { CONFIG } from '../config'

export enum LoginState {
  success,
  error,
  notInstalled,
}

export interface IWeb3Context {
  address: string
  gaslessSigner: ethers.providers.JsonRpcSigner | undefined
  provider: ethers.providers.Web3Provider | undefined
  standardSigner: ethers.providers.JsonRpcSigner | undefined
  currentChainId: number
  targetContract: string
  loginMetamask: (autologin: boolean) => Promise<LoginState>
  switchToCorrectChain: () => Promise<boolean>
  isCorrectChain: (manualTargetContract?: string) => boolean
  setTargetContract: (targetContract: string) => void
}

// class WrappedProvider implements ethers.providers.ExternalProvider {
//     readonly provider: gsn.RelayProvider;

//     constructor(provider: gsn.RelayProvider) {
//         this.provider = provider
//     }

//     send(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void): void {
//         this.provider.send({
//             jsonrpc: '2.0',
//             method: request.method,
//             params: request.params ?? []
//         }, callback)
//     }

// }

// wrapper needed because of typescript struggles
class WrappedRelayProvider
  extends RelayProvider
  implements ethers.providers.ExternalProvider
{
  send(
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void | undefined
  ): void {
    super.send(
      {
        jsonrpc: '2.0',
        method: request.method,
        params: request.params ?? [],
      },
      callback
    )
  }
}

const Web3Context = createContext<IWeb3Context>({} as IWeb3Context)

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [gaslessSigner, setGaslessSigner] =
    useState<ethers.providers.JsonRpcSigner>()
  const [standardSigner, setStandardSigner] =
    useState<ethers.providers.JsonRpcSigner>()
  const [currentChainId, setCurrentChainId] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [ethereum, setEthereum] = useState<any>()
  const [targetContract, setTargetContract] = useState('SUGAR_PRETZEL_CONTRACT')

  const loginMetamask = async (autologin: boolean) => {
    // nothing todo if already logged in
    // if (loggedIn) return

    console.log(autologin)

    let ethereum

    ethereum = (window as any).ethereum
    if (!ethereum) {
      console.error('MetaMask not installed')
      return LoginState.notInstalled
    }

    setEthereum(ethereum)

    try {
      await ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: string[]) => {
          console.log('result', result)

          if (result && result.length > 0) {
            setAddress(result[0].toLowerCase())
            console.log('ethaddress', result[0].toLowerCase())
          } else {
            console.error('MetaMask login failed')
          }
        })
      // .catch((error: any) => {
      //   if (error.code === 4001) {
      //     // EIP-1193 userRejectedRequest error
      //     console.log('Please connect to MetaMask.')
      //   } else {
      //     console.error(error)
      //   }
      // })

      console.log('requesting chain id!!!')

      await ethereum
        .request({ method: 'eth_chainId' })
        .then((result: string) => {
          const id = parseInt(result, 16)
          console.log('chainId', result, id)
          setCurrentChainId(id)
        })
    } catch (e) {
      console.log('COULD NOT SET METAMASK:', e)
      return LoginState.error
    }

    ethereum.on('accountsChanged', (accounts: string[]) => {
      setAddress(accounts[0])
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    })

    ethereum.on('chainChanged', (chainId: string) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload()
      setCurrentChainId(Number(chainId))
    })

    // Subscribe to provider connection
    ethereum.on('connect', (info: { chainId: number }) => {
      console.log(info)
      console.log('conntected')
    })

    // Subscribe to provider disconnection
    ethereum.on('disconnect', (error: { code: number; message: string }) => {
      console.log(error)
      console.log('disconnected')
    })

    setLoggedIn(true)
    return LoginState.success
  }

  const switchToCorrectChain = async () => {
    const chainConfig = getCorrectChain()
    const chainId = `0x${Number(chainConfig.ID).toString(16)}`
    const params = [{ chainId }]
    console.log('Swapping to:', chainId)

    try {
      await ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params,
      })
      setCurrentChainId(chainConfig.ID)
      return true
    } catch (switchError) {
      // option to add a chain
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName: chainConfig.NAME,
                nativeCurrency: {
                  name: chainConfig.NAME,
                  symbol: chainConfig.SYMBOL,
                  decimals: 18,
                },
                rpcUrls: [chainConfig.RPC_URL],
                blockExplorerUrls: [chainConfig.SCAN_LINK],
              },
            ],
          })
          setCurrentChainId(chainConfig.ID)
          return true
        } catch (addError) {
          // handle "add" error
          console.log(addError)
          return false
        }
      }
      // handle other "switch" errors
      return false
    }
  }

  const getCorrectChain = (manualTargetContract?: string) => {
    console.log('fn: chain id', currentChainId)
    console.log('dev?', CONFIG.DEV)

    if (manualTargetContract)
      return (CONFIG as { [key: string]: any })[manualTargetContract][
        CONFIG.DEV ? 'DEV_CONFIG' : 'MAIN_CONFIG'
      ]

    return (CONFIG as { [key: string]: any })[targetContract][
      CONFIG.DEV ? 'DEV_CONFIG' : 'MAIN_CONFIG'
    ]
  }

  const isCorrectChain = (manualTargetContract?: string) => {
    const correctChain = getCorrectChain(manualTargetContract)

    console.log('checking to:', correctChain.ID)
    return correctChain.ID === currentChainId
  }

  // const walletConnected = localStorage.getItem('walletConnected');
  // if (walletConnected && !loggedIn) loginMetamask();

  useEffect(() => {
    // we only want to autologin the user, if it needs no interaction

    const ethereum = (window as any).ethereum
    if (!ethereum) return
    const provider = new ethers.providers.Web3Provider(ethereum)

    provider.listAccounts().then((accounts) => {
      console.log('check', accounts)
      if (accounts.length > 0) loginMetamask(true)
    })
  }, [])

  const setupProviders = async () => {
    const standardProvider = new ethers.providers.Web3Provider(ethereum)
    setProvider(standardProvider)
    setStandardSigner(standardProvider.getSigner())

    const relayConfing = {
      paymasterAddress: CONFIG.PAYMASTER_CONTRACT.address,
      // the two properties below are needed because some public RPCs only support
      // limited historic block lookups
      // on polygon gotta be below 10.000
      relayLookupWindowBlocks: 998,
      relayRegistrationLookupBlocks: 998,
    }

    try {
      const gsnProvider = (await RelayProvider.newProvider({
        provider: ethereum,
        config: relayConfing,
      }).init()) as WrappedRelayProvider
      const ethersProvider = new ethers.providers.Web3Provider(gsnProvider)
      setGaslessSigner(ethersProvider.getSigner())
    } catch (error) {
      // console.log(error)
      console.log('Could not set up gasless signer because on wrong network.')
    }
  }

  useEffect(() => {
    if (ethereum) setupProviders()
  }, [ethereum, currentChainId])

  return (
    <Web3Context.Provider
      value={{
        address,
        provider,
        gaslessSigner,
        standardSigner,
        currentChainId,
        targetContract,
        loginMetamask,
        switchToCorrectChain,
        isCorrectChain,
        setTargetContract,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

const useWeb3 = () => React.useContext(Web3Context)

export { Web3Provider, useWeb3 }
