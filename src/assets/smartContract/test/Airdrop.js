const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { BigNumber } = require("ethers");
  
  describe("Airdrop", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test

  
    describe("Deployment", function () {
        beforeEach(async function () {
            // Get the ContractFactory and Signers here.
            [owner, otherAccount] = await ethers.getSigners();
    
            const tokenAddr = "0x38d189CB3eDD67864039c81e509dc9DcbcF5e835"
            const token = await ethers.getContractAt("TokenUpgrade", tokenAddr);
            mintAmount = await token.mint(owner, 100000)
            mintAmount = await token.mint(otherAccount, 100000)
    
            const amount = 1_000;
      
            const Airdrop = await ethers.getContractFactory("Airdrop");
            contract = await Airdrop.deploy(tokenAddr, amount);
            
          });

      it("Should set the right owner", async function () {
        expect(await contract.owner()).to.equal(owner.address);
      });

      it("Should have the right token address", async function(){

        expect(await contract.distributionToken()).to.equal(token_address)
      })

      it("Should have 0 balance", async function(){

        expect(await contract.getBalance()).to.equal("0");
        expect(await contract.getTokenBalance()).to.equal("0");

      })

      it("Should have 0 registrations", async function(){

        expect(await contract.totalRegistered()).to.equal("0")

      })

    });


    //Testing the create pool functionalitiies
    describe("ERC20 Interactions", function () {
      describe("Owners things", function () {
            it("Deposit token.  ", async function (){


                //this is correct and needs to be reverted
                const deposit = await contract.connect(otherAccount).depositTokens(amount);
                expect(deposit).to.be.reverted;
            });

        });
  
      });
     
  });
  