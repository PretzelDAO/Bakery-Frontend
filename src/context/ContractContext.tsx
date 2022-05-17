import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONFIG } from '../config'
import contract from './SugarPretzels.json'
import { useWeb3 } from "./Web3Context";


interface IContractContext {
    contractRead: ethers.Contract | undefined,
    contractWrite: ethers.Contract | undefined,
    mint: () => void,
}

const ContractContext = createContext<IContractContext>({} as IContractContext);

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
    const [contractWrite, setContractWrite] = useState<ethers.Contract>()
    const [contractRead, setContractRead] = useState<ethers.Contract>()
    const [txHash, setTxHash] = useState<String>()
    const [blockNumber, setBlockNumber] = useState<Number>()
    const [errorMessage, setErrorMessage] = useState<String>()

    const { provider, signer, chainId } = useWeb3()

    const mint = async () => {
        console.log(contractWrite);
        if (contractWrite === undefined) return

        try {
            const txPending = await contractWrite?.safeMint()
            console.log(txPending.hash);
            setTxHash(txPending.hash)

            const txMined = await txPending.wait()
            console.log(txMined.blockNumber);
            setBlockNumber(txMined.blockNumber)
        } catch (error: any) {

            if (error?.code === -32603) {
                const errorMessage = error.data.message.split(': ')[1]
                console.log(errorMessage);
                setErrorMessage(errorMessage)
            }


        }
        return


    }


    useEffect(() => {
        console.log(CONFIG.CONTRACT_ADDRESS);
        console.log(contract.abi);


        if (provider === undefined) return

        setContractRead(new ethers.Contract(
            CONFIG.CONTRACT_ADDRESS,
            contract.abi,
            provider
        ))

        console.log('provider set');


        if (signer === undefined) return

        setContractWrite(new ethers.Contract(
            CONFIG.CONTRACT_ADDRESS,
            contract.abi,
            signer
        ))

        console.log('signer set');
    }, [provider, signer])


    return (
        <ContractContext.Provider value={{
            contractRead,
            contractWrite,
            mint
        }}>
            {children}
        </ContractContext.Provider>
    )

}




const useContract = () => React.useContext(ContractContext)

export { ContractProvider, useContract }