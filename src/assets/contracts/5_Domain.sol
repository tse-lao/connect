// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './2_Pool.sol';

contract Domain{
    address public owner;
    IERC20 public token;
    
    mapping(address => string) public name;
    mapping(string => address) public uniqueName;
    mapping(address => uint256) public updated;
    
    constructor(address _tokenaddress) payable{
        owner = msg.sender;
        token = IERC20(_tokenaddress);
       
    }
    
    function createName(string memory _name) public {
        //we need to update the contract to see why it is not working. 
        require(uniqueName[_name] == address(0), "Name already exists");
        uniqueName[_name] = msg.sender;
        name[msg.sender] = _name;  
        
        //TODO: check if it needs to be updated.  
        updated[msg.sender] = block.timestamp;
    }
    
    function getName(address _user) public view returns (string memory){
        return name[_user];
    }
    
    function resetUsername() public {
        require(bytes(name[msg.sender]).length > 0, "Only possible if you have a name");
        delete(name[msg.sender]);
        delete(uniqueName[name[msg.sender]]);
        updated[msg.sender] = block.timestamp;
    }
    
    function updateUsername(string memory _name) public {
        require(bytes(name[msg.sender]).length > 0, "You need to create a name first");
        require(uniqueName[_name] != address(0), "Name already exists");
        require(token.allowance(msg.sender, address(this)) >= 500, "It costs 500 tokens to update your username");
        updated[msg.sender] = block.timestamp;
        uniqueName[name[msg.sender]] = address(0);
        uniqueName[_name] = msg.sender;
        name[msg.sender] = _name;
        token.transferFrom(msg.sender, address(this), 500);
    }
} 