//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HighestBidder {
    struct Purpose{
        address owner;
        string purpose;
        uint256 investment;
        }
        
    // @notice track user investments
    mapping(address => uint256) private balances;
    
    // @notice track the current world purpose. 
    Purpose private purpose;
    
    // @notice Event to track new Purpose. 
    event PurposeChange(address indexed owner, string purpose, uint256 investment);
    
    /**
    @notice Getter for the current purpose. 
    @return currentPurpose the curernt active Word Purpose.
     */
     
     function getCurrentPurpose() public view returns (Purpose memory currentPurpose) {
        return purpose;
    }
    
    /**
    @notice get the total amount of investments you have made. it reutnr sboth the locked and unloacked investmetns. 
    @return balance you still have in the contract
     */
     
     function getBalance() public view returns (uint256 balance) {
        return balances[msg.sender];
     }
     
        /**
        @notice Modifier to chekc thas tthe prev owner of the purpose is not the same ad the 
        */
        modifier onlyNewUser(){
            // check that enw owner is not the previous one. 
            require(purpose.owner != msg.sender,"You can not change the purpose of the world if you are the owner");
            _;
        }
    
    /**
        @notice Set the new world purpose.
        @param _purpose The new purpose conent
        @return newPurpose the new active World Purpose.
    */
    
    function setPurpose(string memory _purpose) public payable onlyNewUser returns (Purpose memory newPurpose) {
     
     //check that the new owner has sent us enough funds to override the previous purpose 
     require(msg.value > purpose.investment, "You must send at least the amount of the previous purpose");
     
     //check if the new purpose is emptuy
     bytes memory purposeBytes = bytes(_purpose);
     require(purposeBytes.length > 0, "The purpose can not be empty");
     
     purpose = Purpose(msg.sender, _purpose, msg.value);
     
     //update the sender value
     balances[msg.sender] += msg.value;
     
     //emit the purposechange event
     emit PurposeChange(msg.sender, _purpose, msg.value);
     
     
     return purpose;
     
    }
    
    /**
    @notice Withfraw the funds from the old purpose. If you have an actiove purpose those functions. 
     */
    function withdraw() public {
        // Get user's balance 
        uint256 withdrawable = balances[msg.sender];
        address currentOwner = purpose.owner;
        
        if(currentOwner == msg.sender){
            withdrawable -= purpose.investment;
        }
        
        require(withdrawable > 0, "You can not withdraw funds from the contract if you have no funds");
        
        balances[msg.sender] -= withdrawable;
        
        //transfer the balance. 
        (bool sent, ) = msg.sender.call{value: withdrawable}("");
        require(sent, "Failed to send funds to the user");
    }
        
    
}
