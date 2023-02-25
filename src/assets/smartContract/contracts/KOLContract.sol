// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./ShareContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KOLContract is Ownable {
    //@dev = EVENTS HERE
    event ContractInteraction(address owner, address contractAddress, string action);
    event UpdateContract(string action);
    event UnlockTimeChange(uint unlock);
    event PostAdd(string link);
    
    uint public unlockTime;
    string public requirements;
    address public kol;
    uint public balance;
    
    mapping(uint => Post[]) public posts;
    uint public totalPosts;
    mapping(address=> bool) public users;
    uint public totalParticipants;
    mapping(uint => address) public listUsers;
    
    struct Post{
        string ipfs;
        bool active;
        address propser;
        string tracker;
        uint balance;
    }
        
    constructor(uint _unlockTime, string memory _requirements, address _kol){
       require(_unlockTime > block.timestamp, "needs to be in the future");
        unlockTime = _unlockTime;
        kol = payable(_kol);
        emit ContractInteraction(msg.sender, address(this), "create");
    }
    // @dev - returns info about the contract. 

    //only a user should be able to add this.

    
    //users which only the owner can add.  
    function addUser(address user) public onlyOwner {
        users[user] = true;
    }

    function checkIfExists(address user) public view returns (bool) {
        return users[user];
    }
    
    function changeUnlock(uint _unlockTime) public {
        require(unlockTime < _unlockTime, "new unlock needs to be in later");
        unlockTime = _unlockTime;
       // emit UpdateContract(_unlockTime);
    }
}

