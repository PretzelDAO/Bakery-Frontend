import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './SugarPretzels.json'
import { useWeb3 } from './Web3Context'

export interface IContractContext {
  contractRead: ethers.Contract | undefined
  contractGaselessWrite: ethers.Contract | undefined
  contractStandardWrite: ethers.Contract | undefined
  mintGaseless: () => Promise<void>
  mintSugarPretzel: () => Promise<void>
}

const ContractContext = createContext<IContractContext>({} as IContractContext)

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractGaselessWrite, setContractGaselessWrite] = useState<
    ethers.Contract
  >()
  const [contractStandardWrite, setContractStandardWrite] = useState<
    ethers.Contract
  >()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()
  const [blockNumber, setBlockNumber] = useState<Number>()
  const [errorMessage, setErrorMessage] = useState<String>()

  const { provider, gaselessSigner, standardSigner } = useWeb3()

  const mintGaseless = async () => {
    console.log(contractGaselessWrite)
    if (contractGaselessWrite === undefined) return

    try {
      const txPending = await contractGaselessWrite?.mintWithoutGas()
      // const txPending = await contractGaselessWrite?.transferFrom('0x56512613DbF01D92F69dAC490aC9d4C03Fd12c39', '0xB4599439114a6a814218254008ed5c60D0d8049d', '1')

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
      new ethers.Contract(CONFIG.SUGAR_PRETZEL_CONTRACT.address, contract.abi, provider),
    )
    console.log('provider set')

    if (standardSigner === undefined) return
    setContractStandardWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        standardSigner,
      ),
    )
    console.log('standardSigner set')

    if (gaselessSigner === undefined) return
    setContractGaselessWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        gaselessSigner,
      ),
    )
    console.log('gaselessSigner set')
  }, [provider, standardSigner, gaselessSigner])

  return (
    <ContractContext.Provider
      value={{
        contractRead,
        contractGaselessWrite,
        contractStandardWrite,
        mintGaseless,
        mintSugarPretzel,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

const useContract = () => React.useContext(ContractContext)

export { ContractProvider, useContract }
