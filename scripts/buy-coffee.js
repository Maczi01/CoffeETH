// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address){
    const balance = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

async function printBalances(addresses){
  addresses.map(async (address) => {
    console.log(address, await getBalance(address));
  })
}

async function printMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp();
    const tipper = memo.name();
    const tipperAddress = memo.from();
    const message = memo.message();
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) left a message: ${message}`);
  }
}


async function main() {

  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  const address = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("=====start=====");
  await printBalances(address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
