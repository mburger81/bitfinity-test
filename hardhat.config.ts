import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.6.2',
      },
      {
        version: '0.8.9',
        settings: { optimizer: { enabled: true, runs: 1000000 } },
      }
    ]
  },
  networks: {
    bitfinityTestnet: {
      chainId: 355113,
      timeout: 2000000,
      url: process.env.ETH_BITFINITY_TESTNET_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      // gasLimit: 3000000,
      gasPrice: 10,
    },
  }
};

export default config;
