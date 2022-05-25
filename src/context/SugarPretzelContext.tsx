import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './SugarPretzel.json'
import { useWeb3 } from './Web3Context'

export interface ISugarPretzelContext {
  contractRead: ethers.Contract | undefined
  contractGaslessWrite: ethers.Contract | undefined
  contractStandardWrite: ethers.Contract | undefined
  mintGasless: () => Promise<number>
  mintSugarPretzel: () => Promise<number>
  canMintGasless: () => Promise<boolean>
}

const SugarPretzelContext = createContext<ISugarPretzelContext>(
  {} as ISugarPretzelContext
)

const SugarPretzelProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractGaslessWrite, setContractGaslessWrite] =
    useState<ethers.Contract>()
  const [contractStandardWrite, setContractStandardWrite] =
    useState<ethers.Contract>()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()

  const { provider, gaslessSigner, standardSigner, address } = useWeb3()

  const _mint = async (fn: (args: any) => Promise<any>, args: object) => {
    try {
      const txPending = await fn(args ?? {})
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMinted = await txPending.wait()
      console.log(txMinted)
      console.log(txMinted.blockNumber)

      const tokenId = txMinted.events[0].args[2] as ethers.BigNumber

      console.log(tokenId)
      console.log(tokenId.toNumber())
      return tokenId.toNumber()
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
      }
      return -1
    }
  }

  const mintGasless = async () => {
    console.log(contractGaslessWrite)
    if (contractGaslessWrite === undefined) return -1

    return _mint(contractGaslessWrite.mintGasless, {
      gasLimit: 300000,
    })
  }

  const mintSugarPretzel = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _mint(contractStandardWrite.mintStandard, {})
  }

  const canMintGasless = async () => {
    if (contractRead === undefined) return false

    try {
      const hasMintedGasless = await contractRead.hasMintedGasless(address)
      return !hasMintedGasless
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    if (provider === undefined) return
    setContractRead(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        provider
      )
    )
    console.log('provider set')

    if (standardSigner === undefined) return
    setContractStandardWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        standardSigner
      )
    )
    console.log('standardSigner set')

    if (gaslessSigner === undefined) return
    setContractGaslessWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        gaslessSigner
      )
    )
    console.log('gaslessSigner set')
  }, [provider, standardSigner, gaslessSigner])

  return (
    <SugarPretzelContext.Provider
      value={{
        contractRead,
        contractGaslessWrite,
        contractStandardWrite,
        mintGasless,
        mintSugarPretzel,
        canMintGasless,
      }}
    >
      {children}
    </SugarPretzelContext.Provider>
  )
}

const useSugarPretzelContract = () => React.useContext(SugarPretzelContext)

export { SugarPretzelProvider, useSugarPretzelContract }
