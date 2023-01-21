require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require('./tasks/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        localhost: {
            url:"http://127.0.0.1:8545",
            chainId:1337,
        }
    },
    gasReporter:{
        enabled:true,
        outputFile:'gasReporter.txt',
        noColors:true,
        currency:'USD',
    }
};
