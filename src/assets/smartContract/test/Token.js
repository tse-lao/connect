const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { BigNumber } = require("ethers");
  
  describe("Token", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const amount = 1_000_000;
  
      const TokenUpgrade = await ethers.getContractFactory("TokenUpgrade");
      const tokenContract = await TokenUpgrade.deploy();
  
      return {tokenContract, owner, otherAccount, amount};
    }
  
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { tokenContract, owner } = await loadFixture(deployContract);
  
        expect(await tokenContract.owner()).to.equal(owner.address);
      });

    });


    //Testing the create pool functionalitiies
    describe("Mint Tokens", function () {

      describe("Mint tokens", function () {
            it("Check supply of new created tokens. ", async function (){

                const { tokenContract, owner, amount } = await loadFixture(
                    deployContract
                );
                
                await tokenContract.mint(owner.address, amount);

                const supply = await tokenContract.totalSupply();

                expect(supply).to.equals(BigNumber.from(amount));
            });


            it("Make sure that minting from another account is reverted. ", async function (){
                const { tokenContract, owner, amount, otherAcccount } = await loadFixture(
                    deployContract
                );
                await expect(tokenContract.connect(otherAcccount).mint(owner, amount)).to.be.reverted;

            });
        });
  
      });
     
  });
  