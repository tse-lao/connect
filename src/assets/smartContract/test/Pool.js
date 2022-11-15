const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("Pool", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
        const tokenAddress = "0x53ED56F9AaDF3AADE8e8C7CB730AF4e6BDa90815";
        const name = "name"
        const link = "link"
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const ContractPool = await ethers.getContractFactory("contractPool");
      const contractPool = await ContractPool.deploy(
        tokenAddress, name, link
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
  
      it("Should receive and store the funds to lock", async function () {
        const { contractPool, link } = await loadFixture(
            deployContract
        );
  
        expect(await contractPool.link()).to.equal(link)
      });
    });


    //Testing the create pool functionalitiies
    describe("CreatePool", function () {

      describe("Creation and Deletion", function () {
            it("Count contracts", async function (){
                const { contractPool } = await loadFixture(
                    deployContract
                );


                expect(await contractPool.countContracts()).to.equal("0");
            });


            it("It should add to the contract pool", async function (){
                const { contractPool, tokenAddress, owner } = await loadFixture(
                    deployContract
                );
                await contractPool.createNewPool("name", "link", tokenAddress);

                expect(await contractPool.countContracts()).to.equal("1");

            });

            it("Check if it outside the length", async function (){
                const { contractPool, tokenAddress, owner } = await loadFixture(
                    deployContract
                );
                await contractPool.createNewPool("name", "link", tokenAddress);

                //revert the message with not the owner
                await expect(contractPool.removeContract("10")).to.be.revertedWith(
                    'not in the pool length'
                );
            });

            it("Check if only owner can delete", async function (){
                const { contractPool, tokenAddress, otherAccount } = await loadFixture(
                    deployContract
                );
                await contractPool.createNewPool("name", "link", tokenAddress);

                //revert the message with not the owner
                await expect(contractPool.connect(otherAccount).removeContract("0")).to.be.revertedWith(
                    'not the owner of address'
                );
            });

            it("Should be working aswell ", async function (){
                const { contractPool, tokenAddress } = await loadFixture(
                    deployContract
                );
                await contractPool.createNewPool("name", "link", tokenAddress);

                //revert the message with not the owner
                await contractPool.removeContract("0");

                expect(await contractPool.countContracts()).to.equal("0");
            });

        //end of describe creation
        });
  
      });
     
  });
  