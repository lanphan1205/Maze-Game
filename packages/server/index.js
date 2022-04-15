// express server
const express = require("express");
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();

app.use(jsonParser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// smart contracts
const { networkConfig, getRpcUrlFromName } = require("./constants");

const { ethers } = require("ethers");
const fs = require("fs");

const network = process.argv[2];

// const MGContractFile = fs.readFileSync(
//   `./hardhat/deployments/${network}/MazeGame.json`
// );
// const MGContract = JSON.parse(MGContractFile.toString());

// const signer = new ethers.providers.JsonRpcProvider(
//   getRpcUrlFromName[network]
// ).getSigner();
// const MG = new ethers.Contract(MGContract.address, MGContract.abi, signer);

const GreeterContractFile = fs.readFileSync(
  `./hardhat/deployments/${network}/Greeter.json`
);
const GreeterContract = JSON.parse(GreeterContractFile.toString());

const signer = new ethers.providers.JsonRpcProvider(
  getRpcUrlFromName[network]
).getSigner();
const Greeter = new ethers.Contract(GreeterContract.address, GreeterContract.abi, signer);


// express route
app.get("/", (req, res) => {
  // res.send("Hello World!");
  // print contract owner
  const owner = async() => {
    return await Greeter.owner();
  }
  owner().then((owner) => res.send(owner));
});
