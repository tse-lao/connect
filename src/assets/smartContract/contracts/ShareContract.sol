// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


struct Contract{
    address owner;
    address createdBy;
    address token;
    string title;
    string dataUrl;
    bool open; 
    uint fee;
    uint reservedBalance; 
    uint users;
    uint closeTime;
}

contract ShareContract is Ownable{
    //public variables.
    
    Contract public contractDetails;
    //EVENTS
    event Deposit(address sender, uint amount, uint balance);
    event Withdraw(uint amount, uint balance);
    event Transfer(address receiver, uint amount, uint balance);
    event ContractInteraction(address user, string action, string value);
    event UserInteraction(address user, string action);
    
    
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
    mapping(address => bool) public registered;
    
    address[] private profileAccounts;
    
    mapping(bool => uint256) rewardByIndex;

    constructor(string memory _title, string memory _url, uint _fee,  uint _closeTime,  address _owner, address _contractAbove, bool _open, address _token) payable {
        require(block.timestamp > _closeTime, "Close time must be in the future");
        contractDetails.closeTime = _closeTime;        
        contractDetails.title = _title;
        contractDetails.owner = _owner;
        contractDetails.createdBy = _contractAbove;
        contractDetails.dataUrl = _url;
        contractDetails.open = _open;
        contractDetails.fee = _fee;
        contractDetails.reservedBalance = 0; 
        contractDetails.users = 0;
        contractDetails.token = _token;
        emit ContractInteraction(msg.sender, "creation", _title);
    }
    
    // @dev user submit their data. 
    function userSubmission(string memory _link, bool _thirdparty) public {
        //we want the user to check and submit there work.  
        require(registered[msg.sender], "You already have profile!");
        
        //create new struct. 
        Profile memory newProfile;
        newProfile.user = payable(msg.sender);
        newProfile.downloads = 0;
        newProfile.balance = 0;
        newProfile.link = _link;
        newProfile.thirdparty = _thirdparty;
        profiles.push(newProfile);
        
        addressIndex[msg.sender] = contractDetails.users;
        contractDetails.users = contractDetails.users + 1;

        registered[msg.sender]= true;
        
        emit UserInteraction(msg.sender, "submit");
        
    }
    
    
    // @dev - update the profiles link
    function updateProfile(string memory _link, bool _thirdparty) public {
        uint index = addressIndex[msg.sender];
        
        profiles[index].link = _link;
        profiles[index].thirdparty = _thirdparty;
        
        emit UserInteraction(msg.sender, "update");
    }
    
    // @dev: owner should be able to stop the contract aswell. 
    function withdrawAll() public onlyOwner{
        uint totalAmount = IERC20(contractDetails.token).balanceOf(address(this)) - contractDetails.reservedBalance;
        require(totalAmount > 0, "Oops your balance is too low");
        IERC20(contractDetails.token).transfer(address(this), totalAmount);

        
        emit Withdraw(totalAmount, totalAmount);
    }
    
    
    // @ dev: returns the balance of the contract. 
    function getBalance() public view  returns (uint256) {
        return payable(address(this)).balance;
    }
    
    // @dev - open or close the contract based on the current status. 
    function closeOrOpen() public onlyOwner{
        contractDetails.open = !contractDetails.open;
        
        emit ContractInteraction(msg.sender, "update", "status");
    }
    
    
    // @dev - disable you from getting in the contract. 
    function disOrEnable() public {
        require(addressIndex[msg.sender] > 0, "You must have profile");
        uint index = addressIndex[msg.sender];
        profiles[index].disabled = !profiles[index].disabled;
        
        emit UserInteraction(msg.sender, "disable");
    }
    
    // @dev : Change the fee of the contract. 
    function changeFee(uint _newFee) public onlyOwner{
        require(_newFee > 0, "Fee must be above 0");
        contractDetails.fee = _newFee;
        
        emit ContractInteraction(msg.sender, "update", "fee");
    }
    
    function updateLink(string memory _url) public onlyOwner{
        contractDetails.dataUrl = _url;
        
        emit ContractInteraction(msg.sender, "updateUrl", _url);
    }
    
    // @dev : bot workung yes..  
    function withdraw(uint _amount) public onlyOwner{
        require(_amount > 0, "Amount should be higher");
        require(_amount < availableBalance(), "Not enough available");
        
        IERC20(contractDetails.token).transfer(address(this), _amount);
        emit Withdraw(_amount, contractDetails.reservedBalance);
    }

    function availableBalance() private view returns (uint ){
        uint balance = IERC20(contractDetails.token).balanceOf(address(this)); 

        return balance - contractDetails.reservedBalance;
    }
    
    
    function withdrawFromBalance(uint _amount) public {
        //check balance. 
        require(registered[msg.sender], "you are not even registererd!");
        uint pointer = addressIndex[msg.sender];
        uint userbalance = profiles[pointer].balance ;

        require(_amount <= userbalance, "Your balance should be equal to or less than the balance");


        IERC20(contractDetails.token).transfer(msg.sender, _amount);
        emit Withdraw(_amount, userbalance - _amount);
    }
    
    
    // @dev Download all the data from the users. 
    function getProfiles() public view onlyOwner returns (Profile[] memory) {
      Profile[] memory id = new Profile[](contractDetails.users);
      for (uint i = 0; i < contractDetails.users; i++) {
          Profile storage profile = profiles[i];
          id[i] = profile;
      }
      return id;
      
      //make sure that this is something... 
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
