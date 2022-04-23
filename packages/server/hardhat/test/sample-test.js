const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Maze Game contract", function () {
  it("Deployment setup", async function () {
    let MG;
    let MazeGame;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
      MG = await ethers.getContractFactory("MazeGame");
      MazeGame = await MG.deploy(20);
    });

    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        expect(await MazeGame.owner()).to.equal(owner.address);
      });
    });

    describe("Variables", function () {
      it("Move Fee should be correct", async function () {
        await MazeGame.setMoveFee(20);
        expect(await MazeGame.moveFee()).to.equal(20);
      });

      it("Map Size should be correct", async function () {
        await MazeGame.setMapSize([2, 3])
        expect(await MazeGame.mapSize([0])).to.equal(2);
        expect(await MazeGame.mapSize([1])).to.equal(3);
      });
    });

    describe("Set and check map", function() {
      it("Setting sample map and checking all the spaces", async function() {
        await MazeGame.updateMap([[0, 1], [0, 0]]);
        expect(await MazeGame.checkMove(0, 0)).to.equal(false);
        expect(await MazeGame.checkMove(1, 0)).to.equal(true);
        expect(await MazeGame.checkMove(0, 1)).to.equal(false);
        expect(await MazeGame.checkMove(1, 1)).to.equal(false);
      });
    });

    describe("Updating player position should be correct", function () {
      it("If player tries to move into empty space, it should work", async function () {
        await MazeGame.updateMap([[1, 0], [1, 1]]);
        await MazeGame.setPlayerPosition(1, 1);
        x = await MazeGame.playerPositions(owner.address, 0)
        y = await MazeGame.playerPositions(owner.address, 1)
        console.log("Player Position is: (" + x.toNumber() + ", " + y.toNumber() + ")");
        newPosition = [1, 0];
        await MazeGame.updatePlayerPosition(newPosition, {value: 0.001 * 10 ** 18, gasLimit: 300000});
        x = await MazeGame.playerPositions(owner.address, 0)
        y = await MazeGame.playerPositions(owner.address, 1)
        console.log("Player Position is: (" + x.toNumber() + ", " + y.toNumber() + ")");
        expect(x.toNumber()).to.equal(1);
        expect(y.toNumber()).to.equal(0);
      });

      it("If player tries to move into wall, it should not work", async function () {
        await MazeGame.updateMap([[1, 0], [1, 1]]);
        await MazeGame.setPlayerPosition(1, 1);
        x = await MazeGame.playerPositions(owner.address, 0)
        y = await MazeGame.playerPositions(owner.address, 1)
        console.log("Player Position is: (" + x.toNumber() + ", " + y.toNumber() + ")");
        newPosition = [0, 1];
        await expect(MazeGame.updatePlayerPosition(newPosition, {value: 0.001 * 10 ** 18, gasLimit: 300000})).to.be.reverted;
        x = await MazeGame.playerPositions(owner.address, 0)
        y = await MazeGame.playerPositions(owner.address, 1)
        console.log("Player Position is: (" + x.toNumber() + ", " + y.toNumber() + ")");
      });
    });
  });
});
