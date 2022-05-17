import React from 'react';
import './App.css';
import { Web3Provider } from './context/Web3Context'
import { Navbar } from './components/Navbar'
import { ContractProvider } from './context/ContractContext';
import { MintButton } from './components/MintButton'
import styled from 'styled-components';



function App() {
  return (
    <Web3Provider>
      <Navbar />
      <h1>hello world</h1>

      <ContractProvider>
        {/* <ViewGenerators /> */}
        <MintButton />
      </ContractProvider>

    </Web3Provider >


  );
}



export default App;
