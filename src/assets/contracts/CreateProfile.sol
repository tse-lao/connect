// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;


contract Contracts{
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
    }
    
    
    // @dev - returns info about the contract. 
    function updateInfo(string memory _name, string memory _link) public {
        require(msg.sender == owner, "Only owner can update info");
        name = _name;
        link = _link;
    }

    function CreateNewContract(string memory _url, string memory _metadata, uint _minFee, bool _open) public returns (address){
         ShareContract a = new ShareContract(_url, _metadata, _minFee, msg.sender, payable(address(this)), _open);
         pool.push(address(a));
         return address(a);
    }
    
    function contractSettings(string memory _link) private{
        link = _link;
        
    }
    
    function getSettings() public view returns (string memory) {
        require(msg.sender == owner, "You need to be owner to view this");
        return link;
    } 
    
    function countContracts() public view returns(uint){
        return pool.length;
    }
}


contract ShareContract{
    //public variables.
    address public owner;
    address public createdBy;
    string public url;
    string public metadata;
    uint public fee;
    bool public open;
    
    //send money aswel. 
    uint public availableBalance;
    
    uint256 public totalUsers;
    
    
    
    //EVENTS
    event Deposit(address sender, uint amount, uint balance);
    event Withdraw(uint amount, uint balance);
    event Transfer(address receiver, uint amount, uint balance);
    
    
    struct Profile {
        address payable user;
        uint256 downloads;
        uint256 balance;
        string link;
        bool thirdparty;
        bool disabled;
    }
    Profile[] private profiles;
    mapping(address => uint256) addressIndex;
    
    address[] private profileAccounts;
    
    mapping(bool => uint256) rewardByIndex;

    constructor(string memory _url, string memory _metadata,  uint _minFee, address _owner, address _contractAbove, bool _open) payable {
        owner = _owner;
        createdBy = _contractAbove;
        url = _url;
        fee = _minFee;
        metadata = _metadata;   
        open = _open;
    }

    
     modifier isOwner() {
        require(msg.sender == owner, "Permission denied! Only owner");
        _;
    }
    
    function getContractDetails() public view returns(address, address, string memory, string memory, uint, bool){
        return (owner, createdBy, url, metadata, fee, open);
    }
    
    // @dev user submit their data. 
    function userSubmission(string memory _link, bool _thirdparty) public {
        //we want the user to check and submit there work.  
        require(addressIndex[msg.sender] < 1, "You already have profile!");
        
        //create new struct. 
        Profile memory newProfile;
        newProfile.user = payable(msg.sender);
        newProfile.downloads = 0;
        newProfile.balance = 0;
        newProfile.link = _link;
        newProfile.thirdparty = _thirdparty;
        profiles.push(newProfile);
        
        addressIndex[msg.sender] = totalUsers;
        totalUsers = totalUsers + 1;
        
    }
    
    
    // @dev - update the profiles link
    function updateProfile(string memory _link, bool _thirdparty) public {
        uint index = addressIndex[msg.sender];
        
        profiles[index].link = _link;
        profiles[index].thirdparty = _thirdparty;
        
        
    }
    
    // @dev: owner should be able to stop the contract aswell. 
    function withdrawAll() public isOwner{
        payable(owner).transfer(payable(address(this)).balance);
        emit Withdraw(payable(address(this)).balance, 0);
    }
    
    
    // @ dev: returns the balance of the contract. 
    function getBalance() public view  returns (uint256) {
        return payable(address(this)).balance;
    }
    
    // @dev - open or close the contract based on the current status. 
    function closeOrOpen() public isOwner{
        open = !open;
    }
    
    
    // @dev - disable you from getting in the contract. 
    function disOrEnable() public {
        require(addressIndex[msg.sender] > 0, "You must have profile");
        uint index = addressIndex[msg.sender];
        profiles[index].disabled = !profiles[index].disabled;
    }
    
    // @dev : Change the fee of the contract. 
    function changeFee(uint _newFee) public isOwner{
        require(_newFee > 0, "Fee must be above 0");
        fee = _newFee;
    }
    
    // @dev : withdrawing the money from the account to owner. 
    function withdraw(uint _amount) public isOwner{
        require(_amount > 0, "Amount should be higher");
        require(_amount < payable(address(this)).balance, "amount exceed balance");
        
        require(_amount < availableBalance, "Not available");
        
        payable(owner).transfer(_amount);
        emit Withdraw(_amount, availableBalance);
    }
    
    
    function withdrawFromBalance(uint _amount) public {
        //check balance. 
        uint pointer = addressIndex[msg.sender];
        
        uint userbalance = profiles[pointer].balance ;
        
        require(_amount <= userbalance, "Your balance should be equal to or less than the balance");
    
        payable(msg.sender).transfer(_amount); 
        emit Withdraw(_amount, payable(address(this)).balance);
        
    }
    
    
    // @dev Download all the data from the users. 
    function getProfiles() public view returns (Profile[] memory){
      Profile[]    memory id = new Profile[](totalUsers);
      for (uint i = 0; i < totalUsers; i++) {
          Profile storage profile = profiles[i];
          id[i] = profile;
      }
      return id;
  }
    
    
    //returns amount, donwloads, link, access, 
    function getUserInfo(address _user) public view returns(uint, uint, string memory, bool){
        uint pointer = addressIndex[_user];
        
        return (profiles[pointer].balance, profiles[pointer].downloads, profiles[pointer].link, profiles[pointer].thirdparty);
        
    }
    
    function deposit() public payable{
        emit Deposit(msg.sender, msg.value, payable(address(this)).balance);
        
    }
    
}
