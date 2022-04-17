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
  uint exit;

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
    require(isPlaying[msg.sender]==1, "PLAYER NOT PLAYING");
    uint[2] memory currPos = playerPositions[msg.sender];
    require((_pos[0] == currPos[0] && (_pos[1] == currPos[1] - 1 || _pos[1] == currPos[1] + 1)) // UP/DOWN
    || (_pos[1] == currPos[1] && (_pos[0] == currPos[0] - 1 || _pos[0] == currPos[0] + 1)) // LEFT/RIGHT
    , "MOVE IS MORE THAN 1 SPACE"); 
    require(checkMove(_pos[0], _pos[1]), // check block
    "MOVE IS WALL OR HIDDEN");
    playerAccounts[msg.sender] = msg.value;
    playerPositions[msg.sender] = _pos;
  }

  function checkMove(uint x, uint y) private view returns (bool) {
    return (map[x][y] == 1 || map[x][y] == 2 || map[x][y] == 3); // PATH, EXIT, START
  }

  /**
  Only owner 
   */
  function updateMap(uint[][] memory _map, uint _exitCount) public {
    require(msg.sender == owner, "NOT OWNER!");
    map = _map;
    if (_exitCount != 0){
      exit = _exitCount;
    }
  }

   /**
  Only owner 
   */
  function reward(address payable account) public payable {
    require(msg.sender == owner, "NOT OWNER!");
    require(exit != 0, "NO MORE EXITS LEFT");
    exit -=1;
    if(exit > 1){
      payable(account).transfer(address(this).balance/2);
    }else if(exit == 0) {
      payable(account).transfer(address(this).balance);
    }
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