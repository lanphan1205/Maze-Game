const { networkConfig, getNetworkIdFromName } = require("../../constants");
const { ethers } = require("hardhat");
const fs = require("fs");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("\n\n 📡 Deploying...\n");
  log("----------------------------------------------------");

  const chainId = await getChainId();
  const MG = await deploy("MazeGame", {
    from: deployer,
    args: [
      0.001 * 10 ** 18,
      [10, 10]
    ],
    log: true,
  });
  log(`You have deployed an MazeGame contract to ${MG.address}`);
  const networkName = networkConfig[chainId]["name"];
  log(
    `Verify with:\n npx hardhat verify --network ${networkName} ${MG.address}`
  );
};
module.exports.tags = ["mg"];
