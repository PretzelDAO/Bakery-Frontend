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
  GENESIS_PRETZEL_ADDRESS: '0x7472e6fC5b459B90a5aD2A61F5ad3D4AdcB544ba',
  SUGAR_PRETZEL_ADDRESS: '0x729ffA252F7Aad9DB163b8Ad032d020865b0EC3d',
  PAYMASTER_ADDRESS: '0x7126647DD1191C13EAd3e79bDdcdfdfb17fBc852',
  MAIN_CHAIN: CHAIN_CONFIG['polygon'],
  DEV_CHAIN: CHAIN_CONFIG['kovan'],
  GAS_LIMIT: null,
};
