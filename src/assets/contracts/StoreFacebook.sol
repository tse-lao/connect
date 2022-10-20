// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StoreFacebook{
    address public owner;
    
    mapping(address => string) public socialStorage;
    mapping(uint => address) public usersIndex;
    
    constructor(){
       owner = msg.sender;
    }
    
    function checkUploaded() public view returns (bool){
        if(bytes(socialStorage[msg.sender]).length > 0){
            return true;
        }
        return false;
        
    }
    
    function addUpload(string memory link) public{
        socialStorage[msg.sender] = link;
    }
    
    function deleteUpload() public{
        delete socialStorage[msg.sender];
    }
    
    function getLink(address user) public view returns (string memory){
        return socialStorage[user];
    }
    

    
}