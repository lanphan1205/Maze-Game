//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MazeGame {
  uint[2] public mapSize;
  byte32 public mapHash;
  uint public moveFee; // in wei
  mapping(address=>uint[2]) public playerPositions;
  uint[2][] public map;

  constructor(string memory _map, uint _fee, uint[2] memory _size) {
    mapHash = keccak256(_map);
    moveFee = _fee;
    mapSize = _size;
  }

  function updatePlayerPosition(uint direction) public payable returns (uint[2] memory) {
    require(msg.sender.value == moveFee, "CHECK MOVE FEE AGAIN!");
    require(direction == 0 || direction == 1 || direction == 2 || direction == 3, "DIRECTION IS INVALID!"); 
    uint[2] tempPos = playerPositions[msg.sender];
    if (checkBlock(tempPos)) return temPos;
    if (!msg.sender.transfer(msg.sender.value)) throw;
    
    // UP
    if (direction == 0) playerPositions[msg.sender][1] += 1; 
    // RIGHT
    else if (direction == 1) playerPositions[msg.sender][0] += 1;
    // DOWN
    else if (direction == 2) playerPositions[msg.sender][1] -= 1;
    // LEFT
    else playerPositions[msg.sender][0] -= 1;

    return playerPositions[msg.sender];
  }

  function checkBlock(uint[2] memory _pos) private view returns (bool) {
    for (uint i=0; i<map.length; i++) {
      if (map[i][0] == _pos[i][0] && map[i][1] == _pos[i][1]) return true;
    }
  }

  function updateMap(uint[2] memory _pos) private view returns (uint[2][] memory) {
    uint[][] map = new uint[2][9];
    // populate 3x3 map
    for (uint i=0; i<9; i++) {
       
    }
    // merge 3x3 map with the current map, return new map
  }
}