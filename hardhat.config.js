require("@nomicfoundation/hardhat-toolbox");

// Localhost
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
// };

//SEPOLIA
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
