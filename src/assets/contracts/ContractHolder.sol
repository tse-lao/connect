// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract ContractHolder {
    // this token and function need ot be payable. 
    event AddContract(address indexed from, address to,  uint value);
    event UpdateContract(address indexed from, address to, uint value);
    event DeleteContract(address indexed from, address to, uint value);
    
    address public owner;
    uint public contractCount;
    
    struct Contract {
        address addr;
        string name;
        string description;
    }
    
    Contract public contractInfo;
    Contract[] public contracts;
    
    mapping (address => uint) public contractIndex;
    
    
    
    
    
    
    
    //we want to put some drops in here when it starts from the token address account. Mint the drop to a limit amount. 
    constructor() {
        owner = msg.sender;
        contractCount = 0;
     }
     
     //add new contract
     function addContract(address _contractAddress, string memory _name, string memory _contract) public {
         require(msg.sender == owner, "Please be the owner");
         
         contracts.push(Contract({addr: _contractAddress, name: _name, description: _contract}));
         contractCount = contractCount + 1;
         
         emit AddContract(msg.sender, _contractAddress, contractCount);
     }
     
     function viewContract(address _contractAddress) public view returns (Contract memory){
         uint index = contractIndex[_contractAddress];
         return contracts[index];
     }
     
     
     
    
}


