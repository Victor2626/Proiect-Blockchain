require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28", // Versiunea Solidity folosită
  networks: {
    hardhat: {}, // Rețeaua locală implicită
    goerli: { // Rețeaua testnet Goerli
      url: process.env.GOERLI_RPC_URL, // URL-ul RPC din Alchemy sau Infura
      accounts: [process.env.PRIVATE_KEY], // Cheia privată a walletului tău
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Cheia API Etherscan pentru verificare
  },
};
