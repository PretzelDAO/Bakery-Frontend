import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './SugarPretzel.json'
import { useWeb3 } from './Web3Context'

export interface ISugarPretzelContext {
  contractRead: ethers.Contract | undefined
  contractGaslessWrite: ethers.Contract | undefined
  contractStandardWrite: ethers.Contract | undefined
  mintGasless: () => Promise<void>
  mintSugarPretzel: () => Promise<void>
}

const SugarPretzelContext = createContext<ISugarPretzelContext>(
  {} as ISugarPretzelContext
)

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractGaslessWrite, setContractGaslessWrite] =
    useState<ethers.Contract>()
  const [contractStandardWrite, setContractStandardWrite] =
    useState<ethers.Contract>()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()
  const [blockNumber, setBlockNumber] = useState<Number>()
  const [errorMessage, setErrorMessage] = useState<String>()

  const { provider, gaslessSigner, standardSigner } = useWeb3()

  const mintGasless = async () => {
    console.log(contractGaslessWrite)
    if (contractGaslessWrite === undefined) return

    try {
      const txPending = await contractGaslessWrite?.mintGasless()

      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMined = await txPending.wait()
      console.log(txMined.blockNumber)
      setBlockNumber(txMined.blockNumber)
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
        setErrorMessage(errorMessage)
      }

      console.log(error)
    }
    return
  }

  const mintSugarPretzel = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return

    try {
      const txPending = await contractStandardWrite?.mint()
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMined = await txPending.wait()
      console.log(txMined.blockNumber)
      setBlockNumber(txMined.blockNumber)
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
        setErrorMessage(errorMessage)
      }
    }
    return
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
      }}
    >
      {children}
    </SugarPretzelContext.Provider>
  )
}

const useContract = () => React.useContext(SugarPretzelContext)

export { ContractProvider, useContract }
