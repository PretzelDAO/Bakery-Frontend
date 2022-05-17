import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../theme'
import { isAddress } from 'ethers/lib/utils';
import { useWeb3 } from '../context/Web3Context';


export const Navbar = () => {

  const { address, loginMetamask, switchToEthereum, isCorrectChain } = useWeb3()

  return (
    <Bar>
      <MenuLink>
        Test
      </MenuLink>
      {
        address ?
          <MenuLink>
            {address}
          </MenuLink>
          :
          <button onClick={() => loginMetamask(false)}>
            Connect Wallet
          </button>

      }
      {isCorrectChain() || <>
        <MenuLink>wrong chain!</MenuLink>
        <button onClick={switchToEthereum}>
          Switch
        </button>
      </>}


    </Bar>
  )
}


const Bar = styled.div`
  width: 100%;
  background-color: #000;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr auto auto auto auto auto;
  grid-gap: 20px;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const MenuLink = styled.a`
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  text-transform: lowercase;
  transition: color 200ms ease;
  cursor: pointer;
  :hover {
    color: ${colors.lightAccent};
  }
  @media screen and (max-width: 1000px) {
    padding: 10px 0;
  }
`;

const MenuItem = styled(Link)`
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  text-transform: lowercase;
  transition: color 200ms ease;
  :hover {
    color: ${colors.lightAccent};
  }
  @media screen and (max-width: 1000px) {
    padding: 10px 0;
  }
`;

const Logo = styled(MenuItem)`
  font-size: 22px;
`;

const MenuButton = styled.div`
  position: absolute;
  font-size: 20px;
  color: #fff;
  top: 0;
  right: 0;
`;

const Menuicon = styled.img`
  width: 35px;
  margin: 0 auto;
  :hover {
    opacity: 0.8;
  }
`;