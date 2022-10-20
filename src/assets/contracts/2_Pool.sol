// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract contractPool{
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

    //this needs to be changed for now. 
    function createNewPool(string memory _link, address  _tokenAddress) public returns(address){
         PoolContract a = new PoolContract(_link, _tokenAddress, msg.sender);
         pool.push(address(a));
         return address(a);
    }
    
    
    
    function countContracts() public view returns(uint){
        return pool.length;
    }
    
}
contract PoolContract {
    //public variables.
    address public tokenAddress;
    address payable public owner;
    address payable public contracted;
    string public proposal;
    bool public locked;
    uint256 public contractBalance;
    uint256 public userCount;
    uint256 public devCount;

    //Events.
    event Deposit(address sender, uint256 amount);
    event Withdraw(address sender, uint256 amount);

    //Structs
    struct User {
        address addr;
        uint256 balance;
        bool proofWork;
        address votedFor;
        bool voted;
    }

    //Mapping.
    User public user;
    User[] public users;
    //check if this is working.
    mapping(address => uint256) public indexUser;
    mapping(address => uint256) public indexDev;

    //developers.
    mapping(uint256 => address) public developer;
    mapping(address => uint256) public devIndex;
    mapping(address => uint256) public votes;
    mapping(address => string) public devWorks;

    //constructor
    constructor(string memory _proposal, address _tokenAddress, address sender) payable {
        owner = payable(sender);
        contracted = payable(msg.sender);
        tokenAddress = _tokenAddress;
        proposal = _proposal;
        userCount = 1;
        devCount = 0;
        //to fix this problem, we set the users id for the owner to 0.
        users.push(
            User({
                addr: payable(msg.sender),
                balance: 0,
                voted: false,
                votedFor: address(0),
                proofWork: false
            })
        );
    }

    modifier checkUser() {
        uint256 index = indexUser[msg.sender];
        require(users[index].addr == msg.sender, "You are not a user");
        _;
    }
    
    modifier alreadyVoted() {
        uint256 index = indexUser[msg.sender];
        require(users[index].voted == true, "You have already voted");
        _;
    }

    //NEED TO BE TESTED.
    function submitProposal(string memory _proposal) public {
        require(locked == false, "Already finished.");
        votes[msg.sender] = 0;
        
        if(devIndex[msg.sender] > 0){ 
            devCount++;
            developer[devCount] = msg.sender;
        }
        
        devWorks[msg.sender] = _proposal;
       
    }

    function voteProposal(address _developer) public {
        //apparently we have two different ones. 
        require(devIndex[_developer] > 0, "Developer does not exist.");
        //get balance of the msg.sender.
        uint256 index = indexUser[msg.sender];
        uint256 balance = users[index].balance;
        require(balance > 0, "You don't have enough voting power.");
        require(users[index].voted == true, "You have already voted.");
        users[index].votedFor = _developer;
        votes[_developer] += balance;
    }

    //functions underneath here are working correctly.
    function deposit(uint256 amount) public payable {
        require(amount > 0, "Amount need to be at least 0");

        uint256 allowance = IERC20(tokenAddress).allowance(
            msg.sender,
            address(this)
        );
        require(allowance >= amount, "You dont have enough balance");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);

        //create new user if not exists. å
        if (indexUser[msg.sender] == 0 && msg.sender != owner) {
            userCount++;
            users.push(
                User({
                    addr: payable(msg.sender),
                    balance: amount,
                    voted: false,
                    votedFor: address(0),
                    proofWork: false
                })
            );
            indexUser[msg.sender] = userCount;
        } else {
            uint256 index = indexUser[payable(msg.sender)];
            users[index].balance += amount;
        }

        //balance is done automatically, you can use the function balanceOf.
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) public payable {
        require(
            IERC20(tokenAddress).balanceOf(address(this)) >= amount,
            "Not enough balance"
        );
        uint256 index = indexUser[payable(msg.sender)];
        users[index].balance -= amount;
        //check if the users balance is high enough.

        IERC20(tokenAddress).transfer(msg.sender, amount);
        //check if the user is voted for, if this is the case withdraw the vote.
        if (users[index].voted == true) {
            address _dev = users[index].votedFor;
            users[index].voted = false;
            users[index].votedFor = address(0);
            votes[_dev] -= amount;
        }

        emit Deposit(address(this), amount);
    }

    function myBalance() public view returns (uint256) {
        uint256 index = indexUser[msg.sender];
        return users[index].balance; 
    }

    function lockContract() public {
        require(msg.sender == owner, "Only Owner can perform");
        require(locked == false, "This Contract is already locked");
        locked = true;
    }

    function unlockContract() public {
        require(msg.sender == owner, "Only Owner can perform");
        require(locked == true, "This Contract is not yet locked");
        locked = false;
    }
}
