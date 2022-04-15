// const { networkConfig, getNetworkIdFromName } = require("../../constants");
// const { ethers } = require("hardhat");

// module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
//   const { deploy, get, log } = deployments;
//   const { deployer } = await getNamedAccounts();

//   log("\n\n 📡 Deploying...\n");
//   log("----------------------------------------------------");

//   const chainId = await getChainId();
//   const MG = await deploy("MazeGame", {
//     from: deployer,
//     args: [],
//     log: true,
//   });
//   log(`You have deployed an MazeGame contract to ${MG.address}`);
//   const networkName = networkConfig[chainId]["name"];
//   log(
//     `Verify with:\n npx hardhat verify --network ${networkName} ${MG.address}`
//   );
// };
// module.exports.tags = ["mg"];
