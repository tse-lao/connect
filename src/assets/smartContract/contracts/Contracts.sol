// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./ShareContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Contracts is Ownable {
    //@dev = EVENTS HERE 
    event ContractInteraction(address owner, address contractAddress, string action);
    event UpdateContract(string title, string link);
    
    address[] public pool;
    address tokenAddress;
    string public name;
    string private link; 

    mapping(uint => Contract) public contracts;
    
    
    constructor(address _tokenAddress, string memory _name, string memory _link){
        tokenAddress = _tokenAddress;
        name = _name;
        link = _link;

        emit ContractInteraction(msg.sender, address(this), "create");
    }
    // @dev - returns info about the contract. 
    function updateInfo(string memory _name, string memory _link) public  onlyOwner{
        name = _name;
        link = _link;
        emit ContractInteraction(msg.sender, address(this), "update");
    }

    function createNewContract(string memory _title, string memory _url, uint _fee,  uint _closeTime,  bool _open) public returns (address){
         ShareContract a = new ShareContract(_title, _url, _fee, _closeTime,  msg.sender, payable(address(this)), _open, tokenAddress);
         pool.push(address(a));
        emit ContractInteraction(msg.sender, address(a), 'create');       
         return address(a);
    }
    
    function countContracts() public view returns(uint){
        return pool.length;
    }
    
    //needs to be tested if it works. 
    function removeContract(uint _address) public onlyOwner{
        //change this. 
        address contractAddress = pool[_address];
        pool[_address] = pool[pool.length -1];
        pool.pop();        
        emit ContractInteraction(msg.sender, contractAddress, 'delete' );
    }
}

