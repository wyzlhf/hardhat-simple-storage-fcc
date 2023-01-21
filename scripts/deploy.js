// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
//
// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
//
//   const lockedAmount = hre.ethers.utils.parseEther("1");
//
//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
//
//   await lock.deployed();
//
//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }
//
// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const {ethers,run,network}=require('hardhat')

async function main() {
    const SimpleStorageFactory=await ethers.getContractFactory("SimpleStorage")
    console.log('Deploying contract...')
    const simpleStorage=await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to:${simpleStorage.address}`)
    // console.log(network.config)

    const currentValue=await simpleStorage.retrieve()
    console.log(`Current Value is:${currentValue}`)
    const transactionResponse=await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updateValue=await simpleStorage.retrieve()
    console.log(`Updated Value is:${updateValue}`)
}

async function verify(contractAddress,args){
    console.log('Verifying contract...')
    try {
        await run('verify:verify',{
            address:contractAddress,
            constructorArguments:args
        })
    }catch (e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified!")
        }else {
            console.log(e)
        }
    }
}

main().then(() => {
    process.exit(0)
}).catch(error => {
    console.error(error)
    process.exit(1)
})