const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
// 0x5F3313814F7FB3E11C4a240141689BA9933c5607
module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, Url, 2)
      },
    network_id: "4",
    networkCheckTimeout: 1000000,
    timeoutBlocks: 200,
    addressIndex: 2

  },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(process.env.MAINNET_MNEMONIC, process.env.MAINNET_RPC_URL)
      },
      network_id: '1',
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  }
}
