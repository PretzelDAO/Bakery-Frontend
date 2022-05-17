import React, { createContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { RelayProvider } from "@opengsn/provider";


import { ethers } from "ethers";
import { CONFIG } from '../config'

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "INFURA_ID" // required
        }
    }
}
const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    // cacheProvider: true, // optional
    providerOptions // required
});

interface IWeb3Context {
    address: string,
    provider: ethers.providers.Web3Provider | undefined,
    signer: ethers.providers.JsonRpcSigner | undefined,
    chainId: number,
    loginMetamask: (autologin: boolean) => void,
    switchToEthereum: () => void,
    isCorrectChain: () => boolean,
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

// below doesn't work because the RelayProvider gets instantiated with a factory method.
class WrappedRelayProvider extends RelayProvider implements ethers.providers.ExternalProvider {

    send(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void | undefined): void {
        super.send({
            jsonrpc: '2.0',
            method: request.method,
            params: request.params ?? []
        }, callback)
    }

}

const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);


const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const [address, setAddress] = useState('')
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
    const [chainId, setChainId] = useState(0)
    const [loggedIn, setLoggedIn] = useState(false)
    const [ethereum, setEthereum] = useState<any>()

    const loginMetamask = async (autologin: boolean) => {

        // nothing todo if already logged in
        // if (loggedIn) return

        console.log(autologin);


        let ethereum;
        if (autologin) {
            ethereum = (window as any).ethereum
        }
        else {
            try {
                ethereum = await web3Modal.connect();
            } catch (error) {
                // modal closed by user
                console.log(error);
            }
            if (!ethereum) {
                console.error('MetaMask not installed');
                return;
            }
        }

        setEthereum(ethereum)


        ethereum.request({ method: 'eth_requestAccounts' })
            .then((result: string[]) => {
                console.log('result', result);

                if (result && result.length > 0) {
                    setAddress(result[0].toLowerCase())
                    console.log('ethaddress', result[0].toLowerCase());
                } else {
                    console.error('MetaMask login failed');
                }
            })
            .catch((error: any) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(error);
                }
            })


        ethereum.request({ method: 'eth_chainId' })
            .then((result: string) => {

                const id = parseInt(result, 16)
                console.log('chainId', result, id);
                setChainId(id)

            })


        ethereum.on('accountsChanged', (accounts: string[]) => {
            setAddress(accounts[0])
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
        });

        ethereum.on('chainChanged', (chainId: string) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            window.location.reload();
        });

        // Subscribe to provider connection
        ethereum.on("connect", (info: { chainId: number }) => {
            console.log(info);
            console.log('conntected');

        });

        // Subscribe to provider disconnection
        ethereum.on("disconnect", (error: { code: number; message: string }) => {
            console.log(error);
            console.log('disconnected');

        });

        setLoggedIn(true)

    }

    const switchToEthereum = async () => {
        const chainConfig = CONFIG.DEV ? CONFIG.DEV_CHAIN : CONFIG.MAIN_CHAIN
        const chainId = `0x${Number(chainConfig.ID).toString(16)}`
        const params = [{ chainId }]

        try {
            await ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params
            });
        }
        // option to add a chain
        catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId,
                            chainName: chainConfig.NAME,
                            nativeCurrency: {
                                name: chainConfig.NAME,
                                symbol: chainConfig.SYMBOL,
                                decimals: 18
                            },
                            rpcUrls: [
                                chainConfig.RPC_URL
                            ],
                            blockExplorerUrls: [
                                chainConfig.SCAN_LINK
                            ]
                        }],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }
    }



    const isCorrectChain = () => {
        console.log('fn: chain id', chainId);
        console.log('what', CONFIG.DEV);


        const supposedChainId = CONFIG.DEV ? CONFIG.DEV_CHAIN.ID : CONFIG.MAIN_CHAIN.ID
        return supposedChainId === chainId
    }

    // const walletConnected = localStorage.getItem('walletConnected');
    // if (walletConnected && !loggedIn) loginMetamask();

    useEffect(() => {
        // we only want to autologin the user, if it needs no interaction

        const ethereum = (window as any).ethereum
        if (!ethereum) return
        const provider = new ethers.providers.Web3Provider(ethereum)

        provider.listAccounts().then((accounts) => {
            console.log('check', accounts);
            if (accounts.length > 0) loginMetamask(true)
        })

    }, [])

    const setupProvider = async () => {
        const relayConfing = {
            paymasterAddress: CONFIG.PAYMASTER_ADDRESS,
            // the two properties below are needed because some public RPCs only support
            // limited historic block lookups
            relayLookupWindowBlocks: 999,
            relayRegistrationLookupBlocks: 999,
        }

        const gsnProvider = (await RelayProvider.newProvider({ provider: ethereum, config: relayConfing }).init()) as WrappedRelayProvider
        const ethersProvider = new ethers.providers.Web3Provider(gsnProvider)
        setProvider(ethersProvider)
        setSigner(ethersProvider.getSigner())
    }

    useEffect(() => {
        if (isCorrectChain())
            setupProvider()
    }, [chainId])


    return (
        <Web3Context.Provider value={{
            address,
            provider,
            signer,
            chainId,
            loginMetamask,
            switchToEthereum,
            isCorrectChain,
        }}>
            {children}
        </Web3Context.Provider>
    )

}

const useWeb3 = () => React.useContext(Web3Context)

export { Web3Provider, useWeb3 }