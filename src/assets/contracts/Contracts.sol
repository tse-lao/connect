// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./ShareContract.sol";

contract Contracts{
    //@dev = EVENTS HERE 
    event ContractInteraction(address owner, address contractAddress, string action);
    event UpdateContract(string title, string link);
    
    address[] public pool;
    address tokenAddress;
    string public name;
    string private link; 
    address public owner;
    
    
    //  @dev = the contructor
    constructor(address _tokenAddress, string memory _name, string memory _link){
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        name = _name;
        link = _link;
        
        emit ContractInteraction(msg.sender, address(this), "create");
    }
    
    //@dev- modifier
    modifier isOwner(){
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    
    // @dev - returns info about the contract. 
    function updateInfo(string memory _name, string memory _link) public {
        require(msg.sender == owner, "Only owner can update info");
        name = _name;
        link = _link;
        
        emit ContractInteraction(msg.sender, address(this), "update");
    }

    function createNewContract(string memory _url, string memory _title, string memory _metadata, uint _minFee, bool _open) public returns (address){
         ShareContract a = new ShareContract(_url,_title, _metadata, _minFee, msg.sender, payable(address(this)), _open);
         pool.push(address(a));
        emit ContractInteraction(msg.sender, address(a), 'create');       
         return address(a);    
    }
    
    function countContracts() public view returns(uint){
        return pool.length;
    }
    
    //TODO: needs to be tested.
    function removeContract(uint _address) public isOwner{
        //change this. 
        address contractAddress = pool[_address];
        pool[_address] = pool[pool.length -1];
        pool.pop();        
        emit ContractInteraction(msg.sender, contractAddress, 'delete' );
    }
}

