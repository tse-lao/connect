// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



/// @title Airdrop for the token. 
/// @author Tse Lao
/// @notice This will be our first test airdrop, note that this will be converted to a real token later 
/// @dev All function calls are currently implemented without side effects

//we want to create an airdrop where we distribute token in in order to mimic the goal of distributing tokens to our potnential users. 
contract Airdrop is Ownable{
    IERC20 public immutable distributionToken;
    //EVENTS 
    event RegisterAirdrop(address indexed user, address indexed _tokenAddress, uint amount);
    event WithdrawFromContract(address indexed user, address indexed token, uint amount); 
    event DepositToContract(address indexed user, address indexed token, uint amount);
    event ChangeDropAmount(address indexed user, uint amount);

    uint public dropAmount; 
    uint public CONVERSION_RATE; 
    mapping(address => bool) public registered; 
    uint public totalRegistered; 
    mapping(uint => address) public registerList;

    constructor(address _distributionToken, uint _dropAmount) payable{
        //is the value of the contract where it is distributed. 
        distributionToken = IERC20(_distributionToken);
        dropAmount = _dropAmount;
        CONVERSION_RATE = 1000;
    }

    function changeDropAmount(uint _amount) public onlyOwner {
        require(_amount > 0, "Need to be a positive integer"); 
        dropAmount = _amount;
        emit ChangeDropAmount(msg.sender, _amount);
    }

    function claimToken() public payable{
        //check if there is enough balance to perform this action. 
        require(msg.value > (dropAmount/CONVERSION_RATE), "you did not send enough value");
        require(distributionToken.balanceOf(address(this)) > dropAmount, "not enough tokens to distribute");
        //check if address is true 
        //now we need to make that the user is not already register. 
        require(registered[msg.sender] == false, "you have already been registered");

        totalRegistered = totalRegistered +1;

        registerList[totalRegistered] = msg.sender;


        
        distributionToken.transferFrom(address(this), msg.sender, dropAmount);
        registered[msg.sender] = true;
        emit DepositToContract(msg.sender, address(this) , msg.value);
    }  

    function withdrawToken(uint _amount) public onlyOwner{
        distributionToken.transferFrom(address(this), msg.sender, _amount);
        emit WithdrawFromContract(msg.sender, address(distributionToken), _amount);
    }

    function withdraw(uint _amount) public onlyOwner{
        payable(owner()).transfer(_amount);
        emit WithdrawFromContract(msg.sender, address(this), _amount);
    }

    function depositTokens(uint _amount) public{
        distributionToken.transfer(msg.sender, _amount);

        emit DepositToContract(msg.sender, address(this), _amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTokenBalance()public view returns (uint){
        uint balance = distributionToken.balanceOf(address(this));
       return balance;
    }

}