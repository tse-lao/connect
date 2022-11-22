// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 < 0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



/// @title Name Registration for ETH address on the polygon network
/// @author Lao Tse 
/// @notice You can use this contract for register a username. 
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract NameRegistration is Ownable{
    event TokenChange(address _oldToken, address _newToken);
    event NameRegistration(address _owner, string _name);
    event NameRemoval(address _owner, string _name);
    event MinBalanceChange(uint _old, uint _new);

    address public token;
    uint public minBalance;
    uint public cost;
    mapping(string => bool) public registeredName;
    mapping(address => string) public username;

    /// @notice Starting contract for registering usernames. 
    /// @dev This can be used for any token. 
    /// @param _tokenAddr This should be the token address. 
    constructor(address _tokenAddr, uint _minBalance, uint _cost) payable {
        token = _tokenAddr;
        minBalance = _minBalance;
        cost = _cost;
    }

    function changeToken(address _tokenAddr) public onlyOwner{
        address oldToken = token;
        token = _tokenAddr;

        emit TokenChange(oldToken, _tokenAddr);
    }

    function changeBalance(uint _balance) public onlyOwner{
        uint old = minBalance;
        minBalance = _balance;

        emit MinBalanceChange(old, _balance);
    }

    function register(string memory _name) public payable {
        require(!registeredName[_name], "Is already registered");
        require( IERC20(token).balanceOf(msg.sender) > minBalance, "Not enough balance");

        username[msg.sender] = _name; 
        registeredName[_name] = true;

        emit NameRegistration(msg.sender, _name);(msg.sender, _name);
    }

     /// @notice Remove your username for the list 
    /// @dev Makes it possible for the user to remove names. 
    function remove() public {
        string memory _name = username[msg.sender];
        registeredName[_name] = false;

        emit NameRemoval(msg.sender, _name);
    }
}
