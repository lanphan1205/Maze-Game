// express server
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();

app.use(jsonParser);
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// maze
const { generateFullMaze, revealBlocks } = require("./maze");
const { FullMaze, RevealedMaze } = generateFullMaze(21, 21, 3);
console.log("--- Full Maze ---");
console.log(FullMaze);
console.log("--- Revealed Maze ---");
console.log(RevealedMaze);

// express route
// app.get("/contract-owner", (req, res) => {
//   // res.send("Hello World!");
//   // print contract owner
//   const owner = async() => {
//     return await MG.owner();
//   }
//   owner().then((owner) => res.send(owner));
// });

app.get("/start", (req, res) => {
  res.send({
    rows: FullMaze.rows,
    cols: FullMaze.cols,
    maze: RevealedMaze,
    start: FullMaze.start,
    exitsCount: FullMaze.exitsCount,
  });
});

app.post("/move", (req, res) => {
  // req contains position array of where the player **says** he has moved to[row_pos, col_pos] & player address(NOT DONE YET)
  // Verify player position(using his address) with the smart contract's address -> position mapping, return some error if invalid
  // Smart contract should have already verified player move was valid before recording, so no need to do another check here.
  // Call revealBlocks to update the server's RevealedMaze state
  // Send this RevealedMaze to the smart contract.
  // When the smart contract responds(I hope it does),
  // Only then do we send RevealedMaze to the client via res.send(RevealedMaze) so his frontend updates

  if (req.body.position) {
    revealBlocks(
      req.body.position[0],
      req.body.position[1],
      FullMaze.maze,
      RevealedMaze
    );
    res.send(RevealedMaze);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// smart contracts
// const { networkConfig, getRpcUrlFromName } = require("./constants");

// const { ethers } = require("ethers");
// const fs = require("fs");

// const network = process.argv[2];

// const MGContractFile = fs.readFileSync(
//   `./hardhat/deployments/${network}/MazeGame.json`
// );
// const MGContract = JSON.parse(MGContractFile.toString());

// const signer = new ethers.providers.JsonRpcProvider(
//   getRpcUrlFromName[network]
// ).getSigner();
// const MG = new ethers.Contract(MGContract.address, MGContract.abi, signer);

// const GreeterContractFile = fs.readFileSync(
//   `./hardhat/deployments/${network}/Greeter.json`
// );
// const GreeterContract = JSON.parse(GreeterContractFile.toString());

// const signer = new ethers.providers.JsonRpcProvider(
//   getRpcUrlFromName[network]
// ).getSigner();
// const Greeter = new ethers.Contract(GreeterContract.address, GreeterContract.abi, signer);
