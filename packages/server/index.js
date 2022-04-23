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
const { generateFullMaze, revealBlocks, Blocks } = require("./maze");
const { FullMaze, RevealedMaze } = generateFullMaze(5, 5, 3);
console.log("--- Full Maze ---");
console.log(FullMaze);
console.log("--- Revealed Maze ---");
console.log(RevealedMaze);

// smart contracts
const { networkConfig, getRpcUrlFromName } = require("./constants");

const { ethers } = require("ethers");
const fs = require("fs");

const network = process.argv[2];

const MGContractFile = fs.readFileSync(
  `./hardhat/deployments/${network}/MazeGame.json`
);
const MGContract = JSON.parse(MGContractFile.toString());

const provider = new ethers.providers.JsonRpcProvider(
  getRpcUrlFromName[network]
);

const signer = provider.getSigner();
const MG = new ethers.Contract(MGContract.address, MGContract.abi, signer);

const initGame = async () => {
  const tx = {
    from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    to: MGContract.address,
    value: ethers.utils.parseEther("1"),
  };
  await signer.sendTransaction(tx);
  let tx_update_map = await MG.initGame(RevealedMaze, FullMaze.exitsCount);
  await tx_update_map.wait(1);
};

// provider.listAccounts().then((result) => {

// };

initGame().then(() => {
  console.log("Game initialised ");
});
// express route
app.get("/contract-owner", (req, res) => {
  // print contract owner
  const owner = async () => {
    return await MG.owner();
  };
  owner().then((owner) => res.send(owner));
});

app.post("/start", (req, res) => {
  if (req.body.address) {
    const register = async (address) => {
      let tx_reg = await MG.register(address, FullMaze.start);
      await tx_reg.wait(1);
    };
    register(req.body.address).then(() => {
      res.send({
        rows: FullMaze.rows,
        cols: FullMaze.cols,
        maze: RevealedMaze,
        start: FullMaze.start,
        exitsCount: FullMaze.exitsCount,
      });
    });
  }
});

app.post("/move", (req, res) => {
  if (req.body.address && req.body.position) {
    const updateMap = async () => {
      const r_pos = await MG.playerPositions(req.body.address, 0);
      const c_pos = await MG.playerPositions(req.body.address, 1);
      console.log(r_pos.toNumber());
      console.log(c_pos.toNumber());
      if (
        r_pos.toNumber() === req.body.position[0] &&
        c_pos.toNumber() === req.body.position[1]
      ) {
        revealBlocks(
          r_pos.toNumber(),
          c_pos.toNumber(),
          FullMaze.maze,
          RevealedMaze
        );
        if (RevealedMaze[r_pos.toNumber()][c_pos.toNumber()] == Blocks.EXIT) {
          RevealedMaze[r_pos.toNumber()][c_pos.toNumber()] = Blocks.CLAIMED;
          let rewardTx = await MG.reward(req.body.address);
          await rewardTx.wait(1);
        }
        let updateTx = await MG.updateMap(RevealedMaze);
        await updateTx.wait(1);
        res.send(RevealedMaze);
      }
    };
    updateMap();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
