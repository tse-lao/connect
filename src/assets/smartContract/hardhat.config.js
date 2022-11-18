/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("ethereum-waffle");
require("@nomiclabs/hardhat-waffle")
require("./scripts/deploy.js");


const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "maticmum",
  networks: {
   hardhat: {},
   maticmum: {
     url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`,
     accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
   },
   ethereum: {
     chainId: 1,
     url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`,
     accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
   },
 },
};
