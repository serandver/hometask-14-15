// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const stringComparer = await ethers.getContractFactory("StringComparer");
  const stringComparerDeployed = await stringComparer.deploy();

  const dog = await hre.ethers.getContractFactory("Dog");
  const dogDeployed = await dog.deploy("Dog");

  const farmer = await hre.ethers.deployContract("Farmer");
  const farmerDeployed = await farmer.waitForDeployment();

  const horse = await hre.ethers.deployContract("Horse");
  const horseDeployed = await horse.waitForDeployment("Horse");

  const wolf = await hre.ethers.deployContract("Wolf");
  const wolfDeployed = await wolf.waitForDeployment("Wolf");

  const cow = await hre.ethers.deployContract("Cow");
  const cowDeployed = await cow.waitForDeployment("Cow");
  // console.info(cowDeployed);

  const cowAnswer = await cowDeployed.speak();
  const cowSleeping = await cowDeployed.sleep();
  console.log(cowAnswer);
  console.log(cowSleeping);

  const cowAddress = await cowDeployed.target;
  const horseAddress = await horseDeployed.target;
  const wolfAddress = await wolfDeployed.target;

  const farmerCallCow = await farmerDeployed.call(cowAddress);
  const farmerCallHorse = await farmerDeployed.call(horseAddress);
  console.log(farmerCallCow);
  console.log(farmerCallHorse);

  const farmerFeedWolfMeat =  await farmerDeployed.feed(wolfAddress, "meat");
  console.log(farmerFeedWolfMeat);

  try {
    const farmerFeedWolfPlant =  await farmerDeployed.feed(wolfAddress, "plant");
    console.log(farmerFeedWolfPlant);
  }
  catch (err){
    console.log(err.message) ;
  }
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
