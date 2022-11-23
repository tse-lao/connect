const { task } = require("hardhat/config");
const { getAccount, getContract, getTokenContract } = require("./helpers");

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

task("deploy-airdrop", "Deploying airdrop").setAction(async function (taskArguments, hre) {
    const tokenAddress = process.env.TOKEN_ADDRESS;
    const dropAmount = 100;
    const airdropContract = await hre.ethers.getContractFactory("Airdrop", getAccount());
    const pool = await airdropContract.deploy(process.env.TOKEN_ADDRESS, dropAmount);
    console.log(`Contract deployed to address: ${pool.address}`);
});

task("deploy-token", "Deploying own token").setAction(async function (taskArguments, hre) {
    const airdropContract = await hre.ethers.getContractFactory("TokenUpgrade", getAccount());
    const pool = await airdropContract.deploy();
    console.log(`Contract deployed to address: ${pool.address}`);
});

task("mint-token", "Mint tokens").addParam("amount", "Amount of token you want to mint").setAction(async function (taskArgs, hre) {
    const tokenContract = await getTokenContract("TokenUpgrade", hre);
    const minted = await tokenContract.mint("0x0d8e346d372d0d1B87f14c0207dC8D4A271Dc7F1", taskArgs.amount);

    console.log(minted.address);
});

task("deploy-profile", "Deploying own token").setAction(async function (taskArguments, hre) {
    const profileContract = await hre.ethers.getContractFactory("ProfileRegistration", getAccount());
    const profile = await profileContract.deploy(process.env.TOKEN_ADDRESS, 100, 0);
    console.log(`Contract deployed to address: ${profile.address}`);
});