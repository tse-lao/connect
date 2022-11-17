const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("PoolContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
        const tokenAddress = "0x53ED56F9AaDF3AADE8e8C7CB730AF4e6BDa90815";
        const name = "name"
        const link = "link"
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const PoolContract = await ethers.getContractFactory("PoolContract");
      const contractPool = await PoolContract.deploy(
       name, link, tokenAddress, owner.address
      );


  
      return { contractPool, tokenAddress, name, link, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the tokenaddress for the contract", async function () {
        const { contractPool, tokenAddress } = await loadFixture(deployContract);
  
        expect(await contractPool.tokenAddress()).to.equal(tokenAddress);
      });
  
      it("Should set the right owner", async function () {
        const { contractPool, owner } = await loadFixture(deployContract);
  
        expect(await contractPool.owner()).to.equal(owner.address);
      });
  
      it("Get the link from address", async function () {
        const { contractPool, link } = await loadFixture(
            deployContract
        );
  
        expect(await contractPool.proposal()).to.equal(link)
      });
    });


    //Testing the create pool functionalitiies
    describe("Proposals", function () {
      describe("Interactions", function () {
            it("Count contracts", async function (){
                const { contractPool } = await loadFixture(
                    deployContract
                );


                expect(await contractPool.devCount()).to.equal("0");
            });


            it("It should add to the contract pool", async function (){
                const { contractPool, tokenAddress, owner, name, link } = await loadFixture(
                    deployContract
                );
                await contractPool.submitProposal(name, link);

                expect(await contractPool.devCount()).to.equal("1");

            });

            it("Check if it outside the length", async function (){
                const { contractPool, link, owner, otherAccount, name } = await loadFixture(
                    deployContract
                );
                await contractPool.connect(owner).submitProposal(name, link);
                await contractPool.connect(otherAccount).submitProposal(name, link);

                //revert the message with not the owner
                expect(await contractPool.devCount()).to.equal("2")
            });


        //end of describe creation
        });
  
      });
     
  });
  