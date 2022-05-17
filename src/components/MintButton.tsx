import { useContract } from '../context/ContractContext';
import styled from 'styled-components';
import { useWeb3 } from '../context/Web3Context';


export const MintButton = () => {
  const { mint } = useContract()
  const { provider } = useWeb3()

  // provider?.on('block', async (blockNumber) => {
  //     console.log(blockNumber);

  //     getAllSvgs()
  // })

  return (
    <button onClick={mint}>Mint</button>


  )
}

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`

const SvgWrapper = styled.div`
  height: 300px;
  width: 300px;
  /* border: */
`
