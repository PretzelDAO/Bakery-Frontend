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
  kovan: {
    NAME: 'Kovan',
    SYMBOL: 'ETH',
    ID: 42,
    SCAN_LINK: 'https://kovan.etherscan.io',
    RPC_URL: 'https://kovan.infura.io/v3/',
  },
};

export const CONFIG = {
  DEV: true,
  GENESIS_PRETZEL_ADDRESS: 'none',
  SUGAR_PRETZEL_ADDRESS: '0xf1838fe1459bD63aBb242E528Bc0401AA6105A35',
  PAYMASTER_ADDRESS: '0x262FafB7cA705f7B7c3C8BFe21A9Aa2b5BaD82C7',
  MAIN_CHAIN: CHAIN_CONFIG['polygon'],
  DEV_CHAIN: CHAIN_CONFIG['kovan'],
  GAS_LIMIT: null,
};
