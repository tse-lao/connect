// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingMechanism{
    address public chairman;
    IERC20 public token;
    
    
    
    constructor(address _tokenaddress) payable{
        chairman = msg.sender;
        token = IERC20(_tokenaddress);
        
    }
    
    
    function replaceChairman(address _userAddress) public {
        require(msg.sender == chairman, "Only the chairman can replace the chairman");
        chairman = _userAddress;
    }
    
   function createPoll() public{
       
   }
} 