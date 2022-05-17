import { Link } from 'react-router-dom'
import { colors } from '../theme'
import { isAddress } from 'ethers/lib/utils'
import { useWeb3 } from '../context/Web3Context'

export const Navbar = () => {
  const { address, loginMetamask, switchToEthereum, isCorrectChain } = useWeb3()

  return (
    <div>
      <div>Test</div>
      {address ? (
        <div>{address}</div>
      ) : (
        <button
          onClick={() => loginMetamask(false)}
          className="bg-red-700 w-36"
        >
          Connect Wallet
        </button>
      )}
      {isCorrectChain() || (
        <>
          <div>wrong chain!</div>
          <button onClick={switchToEthereum}>Switch</button>
        </>
      )}
    </div>
  )
}
