const CHAIN_CONFIG = {
  polygon: {
    NAME: 'Polygon',
    SYMBOL: 'Matic',
    ID: 0,
    SCAN_LINK: '',
    RPC_URL: '',
  },
  mumbai: {
    NAME: 'Mumbai',
    SYMBOL: 'Matic',
    ID: 80001,
    SCAN_LINK: 'https://explorer-mumbai.maticvigil.com',
    RPC_URL: 'https://rpc-mumbai.maticvigil.com',
  },
  mainnet: {
    NAME: 'Ethereum',
    SYMBOL: 'ETH',
    ID: 1,
    SCAN_LINK: 'https://etherscan.io',
    RPC_URL: 'https://mainnet.infura.io/v3/',
  },
  kovan: {
    NAME: 'Kovan',
    SYMBOL: 'ETH',
    ID: 42,
    SCAN_LINK: 'https://kovan.etherscan.io',
    RPC_URL: 'https://kovan.infura.io/v3/',
  },
  rinkeby: {
    NAME: 'Rinkeby',
    SYMBOL: 'ETH',
    ID: 4,
    SCAN_LINK: 'https://rinkeby.etherscan.io',
    RPC_URL: 'https://rinkeby.infura.io/v3/',
  },
}

export const CONFIG = {
  DEV: true,
  GENESIS_PRETZEL_CONTRACT: {
    address: '0x7472e6fC5b459B90a5aD2A61F5ad3D4AdcB544ba',
    DEV_CONFIG: CHAIN_CONFIG['rinkeby'],
    MAIN_CONFIG: CHAIN_CONFIG['mainnet'],
  },
  SUGAR_PRETZEL_CONTRACT: {
    address: '0xbb542c33014Ea667166361213e94135daB695D9c',
    DEV_CONFIG: CHAIN_CONFIG['polygon'],
    MAIN_CONFIG: CHAIN_CONFIG['polygon'],
  },
  PAYMASTER_CONTRACT: { address: '0x7126647DD1191C13EAd3e79bDdcdfdfb17fBc852' },
  GAS_LIMIT: null,
  BACKEND_URL: 'https://bakery-metdata.onrender.com',
}
