const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FHEGuessGame", function () {
  let game, owner, player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();
    const FHEGuessGame = await ethers.getContractFactory("FHEGuessGame");
    game = await FHEGuessGame.deploy();
    await game.waitForDeployment();
  });

  it("Should start a new round", async function () {
    const tx = await game.connect(owner).startNewRound();
    await tx.wait();
    expect(await game.roundId()).to.equal(2);
  });

  it("Should submit a guess", async function () {
    await game.connect(player).submitGuess(42);
    expect(await game.guesses(player.address)).to.equal(42);
  });
});