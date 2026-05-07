import "@nomicfoundation/hardhat-ethers";

export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: ["64118600c40a57f736740097b844d94a9a17aaabf3502bc04d0bb21184471dee"]
    }
  }
};
