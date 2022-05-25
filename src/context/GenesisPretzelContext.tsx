import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './GenesisPretzel.json'
import { useWeb3 } from './Web3Context'

export interface IGenesisPretzelContext {
  contractRead: ethers.Contract | undefined
  contractWrite: ethers.Contract | undefined
  mint: (quantity: number) => Promise<number>
  isSoldOut: () => Promise<boolean>
}

const GenesisPretzelContext = createContext<IGenesisPretzelContext>(
  {} as IGenesisPretzelContext
)

const GenesisPretzelProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [contractWrite, setContractWrite] = useState<ethers.Contract>()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()

  const { provider, standardSigner, address } = useWeb3()

  const mint = async (quantity: number) => {
    if (contractWrite === undefined) return -1
    try {
      const txPending = await contractWrite.mint(quantity)
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

  const isSoldOut = async () => {
    if (contractRead === undefined) return true

    try {
      const totalSupply = await contractRead.totalSupply()
      const maxSupply = await contractRead.MAX_SUPPLY()
      return totalSupply === maxSupply
    } catch (error) {
      console.log(error)
      return true
    }
  }

  useEffect(() => {
    if (provider === undefined) return
    setContractRead(
      new ethers.Contract(
        CONFIG.GENESIS_PRETZEL_CONTRACT.address,
        contract.abi,
        provider
      )
    )
    console.log('provider set')

    if (standardSigner === undefined) return
    setContractWrite(
      new ethers.Contract(
        CONFIG.GENESIS_PRETZEL_CONTRACT.address,
        contract.abi,
        standardSigner
      )
    )
    console.log('standardSigner set')
  }, [provider, standardSigner])

  return (
    <GenesisPretzelContext.Provider
      value={{
        contractRead,
        contractWrite: contractWrite,
        mint,
        isSoldOut,
      }}
    >
      {children}
    </GenesisPretzelContext.Provider>
  )
}

const useGenesisPretzelContract = () => React.useContext(GenesisPretzelContext)

export { GenesisPretzelProvider, useGenesisPretzelContract }
