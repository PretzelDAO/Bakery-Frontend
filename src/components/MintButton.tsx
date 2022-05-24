import { useContract } from '../context/SugarPretzelContext';
import styled from 'styled-components';
import { useWeb3 } from '../context/Web3Context';


export const MintButton = () => {
  const { mintGasless } = useContract()

  // provider?.on('block', async (blockNumber) => {
  //     console.log(blockNumber);

  //     getAllSvgs()
  // })

  return (
    <button onClick={mintGasless}>Mint</button>


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
