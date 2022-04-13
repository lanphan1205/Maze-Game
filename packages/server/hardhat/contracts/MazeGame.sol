//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MazeGame {
  uint[2] public mapSize; // [r, c]
  byte32 public mapHash;
  uint public moveFee; // in wei
  mapping(address=>uint[2]) public playerPositions;
  uint[][] public map; // revealed map coordinates
  uint[][] public ObsMap; // revealed obs map

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
    for (uint j=0; j<mapSize[0]; j++) {
      for (uint i=0; i<mapSize[1]; i++) {
        if (_pos[0] == j && _pos[1] == i && ObsMap[i][j] == 1) return true;
      }
    }
    return false;
  }
  /**
  Given player's new position, update the Map
  Let r = map[i][j]. If map is revealed, r = 0. Otherwise, r = 1
  input: uint[2] _pos (player's new position)
  output: uint[][] map (new map)
   */

  function updateMap(uint[2] memory _pos) public view returns (uint[][] memory) {
    
  }

  function updateObsMap(uint[][] _map) {
    ObsMap = _map;
  }
}