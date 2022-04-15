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

// SERVER SIDE LOGIC
const Blocks = {
  WALL: 0,
  PATH: 1,
  EXIT: 2,
  START: 3,
  HIDDEN: 4,
};

let FullMaze;
let RevealedMaze;

function Maze(rows, cols, maze, start, exitsCount) {
  this.rows = rows;
  this.cols = cols;
  this.maze = maze;
  this.start = start;
  this.exitsCount = exitsCount;
}

function randInt(num) {
  return Math.floor(Math.random() * num);
}

function isBlocked(r, c, maze) {
  let rows = maze.length;
  let cols = maze[0].length;
  if (
    r === 0 &&
    (maze[r + 1][c] === Blocks.WALL || maze[r + 1][c] === Blocks.EXIT)
  ) {
    return true;
  } else if (
    r === rows - 1 &&
    (maze[r - 1][c] === Blocks.WALL || maze[r - 1][c] === Blocks.EXIT)
  ) {
    return true;
  } else if (
    c === 0 &&
    (maze[r][c + 1] === Blocks.WALL || maze[r][c + 1] === Blocks.EXIT)
  ) {
    return true;
  } else if (
    c === cols - 1 &&
    (maze[r][c - 1] === Blocks.WALL || maze[r][c - 1] === Blocks.EXIT)
  ) {
    return true;
  } else if (
    r !== 0 &&
    r !== rows - 1 &&
    c !== 0 &&
    c !== cols - 1 &&
    maze[r][c - 1] === Blocks.WALL &&
    maze[r][c + 1] === Blocks.WALL &&
    maze[r - 1][c] === Blocks.WALL &&
    maze[r + 1][c] === Blocks.WALL
  ) {
    return true;
  }
  return false;
}

function isNearStart(r, c, start, rows, cols) {
  // console.log(Math.abs(start[0] - r), Math.abs(start[1] - c));
  return Math.abs(r - start[0]) < rows / 8 || Math.abs(c - start[1]) < cols / 8;
}

function addStartAndExits(maze, exitCount) {
  let start;
  let rows = maze.length;
  let cols = maze[0].length;
  while (true) {
    let r = randInt(rows);
    let c = randInt(cols);
    if (maze[r][c] === Blocks.PATH) {
      maze[r][c] = Blocks.START;
      start = [r, c];
      break;
    }
  }
  while (exitCount > 0) {
    let r = randInt(rows);
    let c = randInt(cols);
    if (maze[r][c] === Blocks.WALL) {
      if (isNearStart(r, c, start, rows, cols) || isBlocked(r, c, maze)) {
        continue;
      }
      maze[r][c] = Blocks.EXIT;
      exitCount -= 1;
    }
  }

  return start;
}

function generateFullMaze(rows, cols, exitCount) {
  let maze = new Array(rows);
  for (let i = 0; i < rows; i++) {
    maze[i] = new Array(cols).fill(Blocks.WALL);
  }
  let r = randInt(rows);
  let c = randInt(cols);
  let frontierList = [[r, c, r, c]];
  while (frontierList.length !== 0) {
    let index = randInt(frontierList.length);
    let f = frontierList[index];
    frontierList.splice(index, 1);
    let r = f[2];
    let c = f[3];
    if (maze[r][c] === Blocks.WALL) {
      maze[f[0]][f[1]] = Blocks.PATH;
      maze[r][c] = Blocks.PATH;
      // check for top frontier
      if (r >= 2 && maze[r - 2][c] === Blocks.WALL) {
        frontierList.push([r - 1, c, r - 2, c]);
      }
      // check for left frontier
      if (c >= 2 && maze[r][c - 2] === Blocks.WALL) {
        frontierList.push([r, c - 1, r, c - 2]);
      }
      // check for right frontier
      if (c < cols - 2 && maze[r][c + 2] === Blocks.WALL) {
        frontierList.push([r, c + 1, r, c + 2]);
      }
      // check for bottom frontier
      if (r < rows - 2 && maze[r + 2][c] === Blocks.WALL) {
        frontierList.push([r + 1, c, r + 2, c]);
      }
    }
  }
  let start = addStartAndExits(maze, exitCount);
  FullMaze = new Maze(rows, cols, maze, start, exitCount);
  RevealedMaze = generateRevealed(FullMaze);
}

function generateRevealed(mazeObj) {
  let revealMaze = new Array(mazeObj.rows);
  for (let i = 0; i < mazeObj.rows; i++) {
    revealMaze[i] = new Array(mazeObj.cols).fill(Blocks.HIDDEN);
  }
  // reveal start
  revealMaze[mazeObj.start[0]][mazeObj.start[1]] = Blocks.START;
  let surroundingBlocks = getSurrondingBlocks(
    mazeObj.start[0],
    mazeObj.start[1],
    mazeObj.rows,
    mazeObj.cols
  );
  revealBlocks(surroundingBlocks, mazeObj.maze, revealMaze);
  return revealMaze;
}

function revealBlocks(surroundingBlocks, maze, revealMaze) {
  for (let i = 0; i < surroundingBlocks.length; i++) {
    let block = surroundingBlocks[i];
    let r = block[0];
    let c = block[1];
    if (revealMaze[r][c] === Blocks.HIDDEN) {
      revealMaze[r][c] = maze[r][c];
    }
  }
}

function getSurrondingBlocks(r, c, rows, cols) {
  topRow = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
  ];
  middleRow = [
    [r, c - 1],
    [r, c + 1],
  ];
  bottomRow = [
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];

  if (c === 0) {
    topRow.splice(0, 1);
    middleRow.splice(0, 1);
    bottomRow.splice(0, 1);
  }

  if (c === cols - 1) {
    topRow.splice(2, 1);
    middleRow.splice(1, 1);
    bottomRow.splice(2, 1);
  }

  if (r === 0) {
    return middleRow.concat(bottomRow);
  }
  if (r === rows - 1) {
    return topRow.concat(middleRow);
  }
  return topRow.concat(middleRow, bottomRow);
}

function printSurroundingBlocks(surroundingBlocks) {
  let output = "";
  surroundingBlocks.map((element) => {
    return (output += "[" + element + "],");
  });
  console.log(output);
}

generateFullMaze(10, 10, 3);
console.log("--- Full MAZE ---");
console.log(FullMaze);
console.log("--- Revealed Maze ---");
console.log(RevealedMaze);


// express route
app.get("/", (req, res) => {
  // res.send("Hello World!");
  // print contract owner
  const owner = async() => {
    return await Greeter.owner();
  }
  owner().then((owner) => res.send(owner));
});
