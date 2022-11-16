// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './Pool.sol';

contract PoolFactory{
    address[] public pool;
    address tokenAddress;
    string public name;
    string public link; 
    address public owner;
    
    
    constructor(address _tokenAddress, string memory _name, string memory _link){
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        name = _name;
        link = _link;
        //we would like it to have a IPFS link. 
    }
    
    function updateInfo(string memory _name, string memory _link) public {
        require(msg.sender == owner, "Only owner can update info");
        name = _name;
        link = _link;
    }

    function createNewPool(address _tokenAddress, string memory _name, string memory _link) public returns(address){
        require(msg.sender == owner, "Only owner can create new pool");
         contractPool a = new contractPool(_tokenAddress,_link, _name);
         pool.push(address(a));
         return address(a);
    }


    function countContracts() public view returns(uint){
        return pool.length;
    }
    
}