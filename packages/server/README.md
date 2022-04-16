# Server Operation Instructions

This project demonstrate how to set up communication between an Express server, local hardhat chain and react client

Enter server folder from root folder:
```
$ cd .\packages\server
```
### 1. Smart contracts
To run a local hardhat network (if `network_name` is localhost):
```
$ npm run chain
```
To deploy `MazeGame.sol` contract, specify `network_name` as the name of the blockchain network (localhost, kovan, rinkeby, mainnet, etc.):
```
$ npm run deploy -- --tags mg --network <network_name>
```
### 2. Local Server

To start Express server with `network_name`:
```
$ npm run start <network_name>
```



