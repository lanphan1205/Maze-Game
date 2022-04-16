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

const MGContractFile = fs.readFileSync(
  `./hardhat/deployments/${network}/MazeGame.json`
);
const MGContract = JSON.parse(MGContractFile.toString());

const signer = new ethers.providers.JsonRpcProvider(
  getRpcUrlFromName[network]
).getSigner();
const MG = new ethers.Contract(MGContract.address, MGContract.abi, signer);

// const GreeterContractFile = fs.readFileSync(
//   `./hardhat/deployments/${network}/Greeter.json`
// );
// const GreeterContract = JSON.parse(GreeterContractFile.toString());

// const signer = new ethers.providers.JsonRpcProvider(
//   getRpcUrlFromName[network]
// ).getSigner();
// const Greeter = new ethers.Contract(GreeterContract.address, GreeterContract.abi, signer);

// maze
const { generateFullMaze, revealBlocks } = require("./maze")
const { FullMaze, RevealedMaze } = generateFullMaze(10, 10, 3)
console.log("--- Full Maze ---");
console.log(FullMaze);
console.log("--- Revealed Maze ---");
console.log(RevealedMaze);

// express route
app.get("/contract-owner", (req, res) => {
  // res.send("Hello World!");
  // print contract owner
  const owner = async() => {
    return await MG.owner();
  }
  owner().then((owner) => res.send(owner));
});

app.get("/start", (req, res) => {
  res.send({
    rows: FullMaze.rows,
    cols: FullMaze.cols,
    maze: RevealedMaze,
    start: FullMaze.start,
    exitsCount: FullMaze.exitsCount,
  })
})

app.post("/move", (req, res) => {
  if (req.body.position) {
    revealBlocks(req.body.position[1], req.body.position[0], FullMaze.maze, RevealedMaze);
    res.send(RevealedMaze);
  }
})
