/**
 * Possible block types that are relevant to the server
 */
const Blocks = {
  WALL: 0,
  PATH: 1,
  EXIT: 2,
  START: 3,
  HIDDEN: 4,
};

/** Maze Object Constructor
 *
 * @param {int} rows number of rows
 * @param {int} cols number of cols
 * @param {Array<Array<int>>}} maze
 * @param {Array<int>} start start position
 * @param {int} exitsCount number of exits
 */
function Maze(rows, cols, maze, start, exitsCount) {
  this.rows = rows;
  this.cols = cols;
  this.maze = maze;
  this.start = start;
  this.exitsCount = exitsCount;
}

/**
 * Generate a random number from [0,num)
 * @param {int} num
 * @returns {int}
 */
function randInt(num) {
  return Math.floor(Math.random() * num);
}
/**
 * Checks if selected exit is blocked
 * @param {int} r current row position
 * @param {int} c current col position
 * @param {Array<Array<int>} maze fullMaze
 * @returns {boolean}
 */
function isBlocked(r, c, maze) {
  let rows = maze.length;
  let cols = maze[0].length;
  // Position is along the edge of the maze
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
    // edge case where exit is surrounded by walls
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

/**
 * Checks if exit is too near to start based on maze size.
 * Minimum distance is 1/8 of the total rows or cols
 * @param {int} r current row position
 * @param {int} c current col position
 * @param {Array<int>} start starting coordinates (r,c)
 * @param {int} rows total rows
 * @param {int} cols total cols
 * @returns {boolean}
 */
function isNearStart(r, c, start, rows, cols) {
  // console.log(Math.abs(start[0] - r), Math.abs(start[1] - c));
  return Math.abs(r - start[0]) < rows / 8 || Math.abs(c - start[1]) < cols / 8;
}

/**
 * Modifies maze by adding start and exits. Only use for full maze.
 * Uses isNearStart and isBlocked to make sure exits are valid before exiting
 * @param {Array<Array<int>>} maze full maze
 * @param {int} exitCount number of exits
 * @returns {Array<int>} returns starting position (r,c)
 */
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
/**
 * Used to initalise a new maze for a new round of the game.
 * Sets the global state FullMaze and RevealedMaze
 * @param {int} rows desired number of rows (recommend to use odd number)
 * @param {int} cols desired number of cols (recommend to use odd number)
 * @param {int} exitCount desired number of exits
 */
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
  let FullMaze = new Maze(rows, cols, maze, start, exitCount);
  let RevealedMaze = generateRevealed(FullMaze);
  return { FullMaze, RevealedMaze };
}
/**
 * Initalise RevealedMaze after FullMaze has been fully created.
 * Only blocks around start position is revealed
 * @param {Maze} mazeObj full maze object with all the current state of the maze
 * @returns {Array<Array<int>>} 2d array with only 3x3 blocks around start position revealed.
 */
function generateRevealed(mazeObj) {
  let revealMaze = new Array(mazeObj.rows);
  for (let i = 0; i < mazeObj.rows; i++) {
    revealMaze[i] = new Array(mazeObj.cols).fill(Blocks.HIDDEN);
  }
  // reveal start
  revealMaze[mazeObj.start[0]][mazeObj.start[1]] = Blocks.START;
  revealBlocks(mazeObj.start[0], mazeObj.start[1], mazeObj.maze, revealMaze);
  return revealMaze;
}
/**
 * Takes in a new position and reveals any new blocks on RevealedMaze (if any)
 * Modifies the global state RevealedMaze
 * @param {int} new_r new row position
 * @param {int} new_c new col position
 * @param {Array<Array<int>>} maze full maze
 * @param {Array<Array<int>>} revealMaze revealed maze
 *
 */
function revealBlocks(new_r, new_c, maze, revealMaze) {
  console.log(maze);
  if (
    new_r < 0 ||
    new_r > maze.length - 1 ||
    new_c < 0 ||
    new_c > maze[0].length - 1
  ) {
    return;
  }

  if (
    maze[new_r][new_c] === Blocks.WALL ||
    maze[new_r][new_c] === Blocks.HIDDEN
  ) {
    return;
  }
  let surroundingBlocks = getSurrondingBlocks(
    new_r,
    new_c,
    maze.length,
    maze[0].length
  );
  for (let i = 0; i < surroundingBlocks.length; i++) {
    let block = surroundingBlocks[i];
    let r = block[0];
    let c = block[1];
    if (revealMaze[r][c] === Blocks.HIDDEN) {
      revealMaze[r][c] = maze[r][c];
    }
  }
}
/**
 * Find all valid surrounding blocks for a given position.
 * Handles cases where position is at the corner/edges
 * @param {int} r current row position
 * @param {int} c current col portiion
 * @param {int} rows total rows
 * @param {int} cols total cols
 * @returns {Array<Array<int>>} returns an array of positions which are also arrays (r,c)
 */
function getSurrondingBlocks(r, c, rows, cols) {
  let topRow = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
  ];
  let middleRow = [
    [r, c - 1],
    [r, c + 1],
  ];
  let bottomRow = [
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

module.exports = {
  generateFullMaze,
  revealBlocks,
};
