const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
  
  describe("NameRegistration", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const minBalance = 100;
      const cost = 10;
      const token_address = process.env.TOKEN_ADDRESS;
      const other_token = "0xcc42724c6683b7e57334c4e856f4c9965ed682bd"


      const Contract = await ethers.getContractFactory("NameRegistration");
      const contract = await Contract.deploy(token_address, minBalance, cost);
  
      return {contract, owner, otherAccount, minBalance, cost, token_address, other_token};
    }
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { contract, owner } = await loadFixture(deployContract);
        expect(await contract.owner()).to.equal(owner.address);
      });

      it("Should have the right token address", async function(){
        const {contract, minBalance} = await loadFixture(deployContract);

        expect(await contract.minBalance()).to.equal(minBalance)
      })

      it("Should have the right balance balance", async function(){
        const {contract, cost} = await loadFixture(deployContract);

        expect(await contract.cost()).to.equal(cost);

      })

    });


    //Testing the create pool functionalitiies
    describe("Interactions", function () {
      describe("Register", function () {
            it("Name Registration.  ", async function (){

                const { contract, otherAccount } = await loadFixture(
                    deployContract
                );

                //this is correct and needs to be reverted
                const registerOther =  contract.connect(otherAccount).register("somename");
               await  expect(registerOther).to.be.reverted;
            });

        });
  
      });
      describe("Change values", function () {
        it("Change the tokenaddress, from not the owner. ", async function (){
            const { contract, otherAccount, other_token } = await loadFixture(
                deployContract
            );

            //this is correct and needs to be reverted
            const changeTokenFromOther = contract.connect(otherAccount).changeToken(other_token);
            await expect(changeTokenFromOther).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it("Change the tokenaddress, from owner. ", async function (){
            const { contract, other_token } = await loadFixture(
                deployContract
            );
                //random address. 
            //this is correct and needs to be reverted
            await contract.changeToken(other_token);

            const token = await contract.token(); 
            assert.notStrictEqual(token, other_token, 'contracts do not match');
        });
        it("Change minbalance from other than owner", async function (){
            const { contract, otherAccount } = await loadFixture(
                deployContract
            );
            const changeBalanceFromOther = contract.connect(otherAccount).changeBalance(10);
            await expect(changeBalanceFromOther).to.be.reverted;
        });

        it("Change minbalance from owner ", async function (){
            const { contract } = await loadFixture(
                deployContract
            );
            await contract.changeBalance(10);
            expect(await contract.minBalance()).to.be.equal(10);
        });

    });

  });
     
