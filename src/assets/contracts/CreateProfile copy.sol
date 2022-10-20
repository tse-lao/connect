// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreateProfile{
    address public owner;
    
    event Creation(address _user, string indexed _link);
    
    uint public totalProfiles;
    mapping(address => string) public selectProfileByUser;
    mapping(string => address) public selectUserByProfile;
    
    
    
    constructor(){
       owner = msg.sender;
    }
    
    
    function createProfile(string memory _link) public{
        selectProfileByUser[msg.sender] = _link;
        selectUserByProfile[_link] = msg.sender;
        
        totalProfiles +=1;
    }
    
    function deleteProfile() public{
        selectProfileByUser[msg.sender] = 'null';
        
        totalProfiles -= 1;
    }
    
}