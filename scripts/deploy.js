const hre = require("hardhat");

async function main() {
  const FHEGuessGame = await hre.ethers.getContractFactory("FHEGuessGame");
  const game = await FHEGuessGame.deploy();
  await game.waitForDeployment();
  console.log("FHEGuessGame deployed to:", await game.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});