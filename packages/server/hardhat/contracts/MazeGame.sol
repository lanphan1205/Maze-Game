//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MazeGame {
  address public owner;
  uint[2] public mapSize; // [r, c]
  bytes32 public mapHash;
  uint public moveFee = 0.001 * 10 ** 18; // in wei
  mapping(address=>uint[2]) public playerPositions; // x := pos[0], y := pos[1]
  mapping(address=>uint) public playerAccounts;
  mapping(address=>uint) public isPlaying;
  uint[][] public map; // revealed map coordinates. Non-revealed := 0, revealed > 0

  constructor(uint _fee) {
    owner = msg.sender;
    moveFee = _fee;
  }

 /**
  Only owner 
   */
  function setMapSize(uint[2] memory _size) public {
    require(msg.sender == owner, "NOT OWNER!");
    mapSize = _size;
  }

  /**
  Only owner 
   */
  function setMapHash(bytes32 _mapHash) public {
    require(msg.sender == owner, "NOT OWNER!");
    mapHash = _mapHash;
  }

  /**
  Anyone
  */
  function updatePlayerPosition(uint[2] memory _pos) public payable {
    require(msg.value >= moveFee, "INSUFFICIENT FEE!");   
    uint[2] memory currPos = playerPositions[msg.sender];
    require((_pos[0] == currPos[0] && (_pos[1] == currPos[1] - 1 || _pos[1] == currPos[1] + 1)) // UP/DOWN
    || (_pos[1] == currPos[1] && (_pos[0] == currPos[0] - 1 || _pos[0] == currPos[0] + 1)) // LEFT/RIGHT
    && (checkMove(_pos[0], _pos[1])), // check block
    "INVALID MOVE!");
    playerPositions[msg.sender] = _pos;
  }

  function checkMove(uint x, uint y) private view returns (bool) {
    return map[y][x] == 1; // ? := 0, WALL := 1, REWARD := 2, etc.
  }

  /**
  Only owner 
   */
  function updateMap(uint[][] memory _map) public {
    require(msg.sender == owner, "NOT OWNER!");
    map = _map;
  }

   /**
  Only owner 
   */
  function reward(address payable account) public payable {
    require(msg.sender == owner, "NOT OWNER!");
    payable(account).transfer(msg.value);
  }

  /**
  Only owner 
   */
  function register(address account, uint[2] memory _pos) public {
    require(msg.sender == owner, "NOT OWNER!");
    isPlaying[account] = 1;
    playerPositions[account] = _pos;
  }

}