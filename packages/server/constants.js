const networkConfig = {
  default: {
    name: "hardhat",
    rpcUrl: "http://127.0.0.1:8545",
  },
  31337: {
    name: "localhost",
    rpcUrl: "http://127.0.0.1:8545",
  },
  42: {
    name: "kovan",
    rpcUrl:
      "https://eth-kovan.alchemyapi.io/v2/H-v5fxmKsmsVVPZe8WzhE13ZKPdjm-eQ",
  },
  137: {
    name: "polygon",
  },
  4: {
    name: "rinkeby",
    rpcUrl:
      "https://eth-rinkeby.alchemyapi.io/v2/H-v5fxmKsmsVVPZe8WzhE13ZKPdjm-eQ",
  },
  1: {
    name: "mainnet",
  },
  5: {
    name: "goerli",
  },
};

const getNetworkIdFromName = async (networkIdName) => {
  for (const id in networkConfig) {
    if (networkConfig[id]["name"] == networkIdName) {
      return id;
    }
  }
  return null;
};
const getRpcUrlFromName = async (networkName) => {
  for (const id in networkConfig) {
    if (networkConfig[id]["name"] == networkName) {
      return networkConfig[id]["rpcUrl"];
    }
  }
  return null;
};

module.exports = {
  networkConfig,
  getNetworkIdFromName,
  getRpcUrlFromName,
};
