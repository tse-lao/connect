const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
  
  describe("Airdrop", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const amount = 1_000;
      const token_address = process.env.TOKEN_ADDRESS;


      const Airdrop = await ethers.getContractFactory("Airdrop");
      const contract = await Airdrop.deploy(token_address, amount);

      const Token = await ethers.getContractFactory("TokenUpgrade")
  
      return {contract, owner, otherAccount, amount, token_address, Token};
    }
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { contract, owner } = await loadFixture(deployContract);
        expect(await contract.owner()).to.equal(owner.address);
      });

      it("Should have the right token address", async function(){
        const {contract, owner, token_address} = await loadFixture(deployContract);

        expect(await contract.distributionToken()).to.equal(token_address)
      })

      it("Should have 0 balance", async function(){
        const {contract, owner, token_address} = await loadFixture(deployContract);

        expect(await contract.getBalance()).to.equal("0");

        //why this is not working ?
        expect(await contract.getTokenBalance()).to.equal("0");

      })

      it("Should have 0 registrations", async function(){
        const {contract, owner} = await loadFixture(deployContract);

        expect(await contract.totalRegistered()).to.equal("0")

      })

    });


    //Testing the create pool functionalitiies
    describe("ERC20 Interactions", function () {
      describe("Owners things", function () {
            it("Deposit token.  ", async function (){

                const { contract, otherAccount, amount } = await loadFixture(
                    deployContract
                );

                //this is correct and needs to be reverted
                const deposit = await contract.connect(otherAccount).depositTokens(amount);
                expect(deposit).to.be.reverted;
            });

        });
  
      });
     
  });
  