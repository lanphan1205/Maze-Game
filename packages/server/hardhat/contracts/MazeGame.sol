//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MazeGame {
  address public owner;
  uint[2] public mapSize; // [r, c]
  bytes32 public mapHash;
  uint public moveFee; // in wei
  mapping(address=>uint[2]) public playerPositions; // x := pos[0], y := pos[1]
  uint[][] public map; // revealed map coordinates. Non-revealed := 0, revealed > 0
  uint[][] public ObsMap; // revealed obs map

  constructor(bytes32 _mapHash, uint _fee, uint[2] memory _size) {
    owner = msg.sender;
    mapHash = _mapHash;
    moveFee = _fee;
    mapSize = _size;
    initMap();
  }

  /**
  Initialize 3x3 square at the center
   */
  function initMap() private {

  }

  /**
  Anyone
  Set player at the start position
  */

  function start() public {

  }
  

  function updatePlayerPosition(uint _dir) public payable {
    require(msg.value == moveFee, "CHECK MOVE FEE AGAIN!");
    require(_dir == 0 || _dir == 1 || _dir == 2 || _dir == 3, "DIRECTION IS INVALID!"); 
   
    uint[2] memory currPos = playerPositions[msg.sender];
    // UP
    if (_dir == 0) {
      require(checkMove(currPos[0], currPos[1] - 1), "CANNOT MOVE UP!");
      currPos[1] -= 1;
    }
    // RIGHT
    else if (_dir == 1 && checkMove(currPos[0] + 1, currPos[1])) {
      require(checkMove(currPos[0] + 1, currPos[1]), "CANNOT MOVE RIGHT!");
      currPos[0] += 1;
    }
    // DOWN
    else if (_dir == 2 && checkMove(currPos[0], currPos[1] + 1)) {
      require(checkMove(currPos[0], currPos[1] + 1), "CANNOT MOVE DOWN!");
      currPos[1] += 1;
    }
    // LEFT
    else if (_dir == 2 && checkMove(currPos[0] - 1, currPos[1])) {
      require(checkMove(currPos[0] - 1, currPos[1]), "CANNOT MOVE LEFT");
      currPos[0] -= 1;
    }
    require(!payable(msg.sender).send(msg.value), "NOT ENOUGH FEE TO MAKE MOVE TXN!");
  }

  function checkMove(uint x, uint y) private view returns (bool) {
    return map[y][x] > 1; // ? := 0, WALL := 1, REWARD := 2, etc.
  }

  /**
  Only owner 
   */
  function updateMap(uint[][] memory _map) public  {
    require(msg.sender == owner, "NOT OWNER!");
    map = _map;
  }

}