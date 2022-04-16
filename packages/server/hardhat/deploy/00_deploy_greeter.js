const { networkConfig, getNetworkIdFromName } = require("../../constants");
const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("\n\n 📡 Deploying...\n");
  log("----------------------------------------------------");

  const chainId = await getChainId();
  const Greeter = await deploy("Greeter", {
    from: deployer,
    args: ["Greetings!"],
    log: true,
  });
  log(`You have deployed an Greeter contract to ${Greeter.address}`);
  const networkName = networkConfig[chainId]["name"];
  log(
    `Verify with:\n npx hardhat verify --network ${networkName} ${Greeter.address}`
  );
};
module.exports.tags = ["gr"];
