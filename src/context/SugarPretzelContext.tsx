import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './SugarPretzel.json'
import { useWeb3 } from './Web3Context'

export interface ISugarPretzelContext {
  contractRead: ethers.Contract | undefined
  contractGaslessWrite: ethers.Contract | undefined
  contractStandardWrite: ethers.Contract | undefined
  mintGasless: () => Promise<{ mintState: MintState; tokenId: number }>
  mintSugarPretzel: () => Promise<{ mintState: MintState; tokenId: number }>
}

export enum MintState {
  success,
  failure,
}

const SugarPretzelContext = createContext<ISugarPretzelContext>(
  {} as ISugarPretzelContext
)

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractGaslessWrite, setContractGaslessWrite] = useState<
    ethers.Contract
  >()
  const [contractStandardWrite, setContractStandardWrite] = useState<
    ethers.Contract
  >()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()
  const [blockNumber, setBlockNumber] = useState<Number>()
  const [errorMessage, setErrorMessage] = useState<String>()

  const { provider, gaslessSigner, standardSigner, address } = useWeb3()

  const mintGasless = async () => {
    console.log(contractGaslessWrite)
    if (contractGaslessWrite === undefined)
      return { mintState: MintState.failure, tokenId: -1 }

    try {
      const txPending = await contractGaslessWrite?.mintGasless()
      // const txPending = await contractGaselessWrite?.transferFrom('0x56512613DbF01D92F69dAC490aC9d4C03Fd12c39', '0xB4599439114a6a814218254008ed5c60D0d8049d', '1')

      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMined = await txPending.wait()
      console.log(txMined.blockNumber)
      setBlockNumber(txMined.blockNumber)
      return { mintState: MintState.success, tokenId: 1 }
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
        setErrorMessage(errorMessage)
      }

      console.log(error)
      return { mintState: MintState.failure, tokenId: -1 }
    }
    return { mintState: MintState.failure, tokenId: -1 }
  }

  const mintSugarPretzel = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined)
      return { mintState: MintState.failure, tokenId: -1 }

    try {
      const txPending = await contractStandardWrite?.mintStandard()
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMined = await txPending.wait()
      console.log('minted on:', txMined.blockNumber)
      setBlockNumber(txMined.blockNumber)
      return { mintState: MintState.success, tokenId: 1 }
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
        setErrorMessage(errorMessage)
      }
      return { mintState: MintState.failure, tokenId: -1 }
    }
    return { mintState: MintState.failure, tokenId: -1 }
  }

  const canMintGasless = async () => {
    if (contractRead === undefined) return

    const _hasMintedGasless = await contractRead.hasMintedGasless(address)

    return !_hasMintedGasless
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

const useContract = () => React.useContext(SugarPretzelContext)

export { SugarPretzelProvider, useContract }
