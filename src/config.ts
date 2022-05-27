const CHAIN_CONFIG = {
  polygon: {
    NAME: 'Polygon',
    SYMBOL: 'Matic',
    ID: 137,
    SCAN_LINK: 'https://polygonscan.com',
    RPC_URL: 'https://polygon-rpc.com/',
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
  DEV: false,
  GENESIS_PRETZEL_CONTRACT: {
    address: '0x2b98AD929Ee80d23902d27d1A9A9549D4b067448',
    DEV_CONFIG: CHAIN_CONFIG['rinkeby'],
    MAIN_CONFIG: CHAIN_CONFIG['mainnet'],
  },
  SUGAR_PRETZEL_CONTRACT: {
    address: '0xbb542c33014Ea667166361213e94135daB695D9c',
    DEV_CONFIG: CHAIN_CONFIG['polygon'],
    MAIN_CONFIG: CHAIN_CONFIG['polygon'],
  },
  PAYMASTER_CONTRACT: { address: '0x51CD28C89EB7B4620AE9beB3dcCA53b8501768e2' },
  GAS_LIMIT: null,
  BACKEND_URL: 'https://metadata.pretzeldao.com',
}
