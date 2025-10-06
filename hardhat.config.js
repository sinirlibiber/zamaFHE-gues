require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",  // Kendi API key'ini ekle
      accounts: ["YOUR_PRIVATE_KEY"]  // Güvenlik için .env kullan
    }
  }
};