// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract Airdrop {
    // this token and function need ot be payable. 
    event TransferReceived(address indexed from, address to,  uint value);
    event TransferSend(address indexed from, address to, uint value);
    
    //import the token interface. 
    ERC20 public token1;
    ERC20 public token2;
    address private owner;
    uint256 public exchangeRate;
    
    
    //we want to put some drops in here when it starts from the token address account. Mint the drop to a limit amount. 
    constructor(address _tokenAddress, address _token2,  uint _exchangeRate) payable {
        owner = msg.sender;
        token1 = ERC20(_tokenAddress);
        token2 = ERC20(_token2);
        exchangeRate = SafeMath.div(1, _exchangeRate);
        
        
     }
     
     //deposit token
        function desposit(uint _amount) public payable {
            require(msg.sender == owner, "your not the owner of the drop.");
            require(token1.allowance(msg.sender, address(this)) >= _amount, "you dont have enough token allowance. to deposit.");
            
            token1.transferFrom(msg.sender, address(this), _amount);
        }
        
        function buy(uint _amount) payable public{
            
            require(token1.allowance(msg.sender, address(this)) >= _amount, "you dont have enough allowance.");
            uint _exchangeAmount = SafeMath.mul(_amount, exchangeRate);
            require(token2.balanceOf(address(this)) >= _exchangeAmount, "There is not enough balance to exchange.");
            
            token1.transferFrom(msg.sender, address(this), _amount);
            token2.transfer(msg.sender, _exchangeAmount);
            
            //EMIT events.
            emit TransferSend(msg.sender, address(this), _amount);
            emit TransferSend(address(this), msg.sender, _exchangeAmount);
        }
        
        function withdraw(address _to, uint _amount) public {
            require(msg.sender == owner, "you must be the owner");
            require(token1.balanceOf(address(this)) >= _amount, "you dont have enough tokens in the deposit box.");
            token1.transfer(_to, _amount);
        }
    
        
        function killAirdrop() public{
            require(msg.sender == owner, "only owner");
            token1.transfer(msg.sender, token1.balanceOf(address(this)));
            token2.transfer(msg.sender, token2.balanceOf(address(this)));
            
            emit TransferSend(address(this), msg.sender, token1.balanceOf(address(this)));
            emit TransferSend(address(this), msg.sender, token2.balanceOf(address(this)));
        }
        
        
    
  
    
}


