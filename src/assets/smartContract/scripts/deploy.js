const { task } = require("hardhat/config");
const { getAccount, getContract } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Account balance for ${account.address}:  ${await account.getBalance()}`);
});

task("deploy-pool-factory", "Deploys the contractPool contract").setAction(async function (taskArguments, hre) {
    const poolContractFactory = await hre.ethers.getContractFactory("PoolFactory", getAccount());
    const pool = await poolContractFactory.deploy(process.env.TOKEN_ADDRESS, "name", "link");
    console.log(`Contract deployed to address: ${pool.address}`);
});

task("factory-new-pool", "Create New Pool for the factory").addParam("name", "Address of pool").setAction(async function (taskArgs, hre) {
    const poolContractFactory = await getContract("PoolFactory", hre);
    const pool = await poolContractFactory.createNewPool(process.env.TOKEN_ADDRESS, taskArgs.name, "link");


    console.log(pool);
});