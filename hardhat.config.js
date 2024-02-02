/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

if (!API_URL || !PRIVATE_KEY) {
  throw new Error("Please provide both API_URL and PRIVATE_KEY in your .env file.");
}

if (PRIVATE_KEY.length !== 64) {
  throw new Error("Private key length is invalid. It should be a 64-character hexadecimal string.");
}

module.exports = {
   solidity: "0.8.4",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [PRIVATE_KEY],
      }
   },
}
