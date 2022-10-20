// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Socials {
    address payable public owner;
    uint public counter;

    struct Social{
        string jsonUrl;
        uint channels;
        address owner;
    }

    Social public social;
    Social[] public socials;
    mapping(address => uint) public socialByOwner;



    constructor(){
         owner = payable(msg.sender);
         counter = 0;

         //initiat first struct in order to get rid of the 0
         Social memory first = Social("", 0, msg.sender);

         socials.push(first);
    }

    function deposit() external payable{}

    function getBalance() external view returns (uint)
    {
        return address(this).balance;
    }

    //this is working now. Now we need something like a length. 
    function examples() external{
        Social memory first = Social("https://ipfs.infura.io/ipfs/QmeUQtUfuXMUmWQzEvyA756EKC1eZgPwJDFrKoziwtrXi3", 5, msg.sender);
        Social memory second = Social({jsonUrl: "https://ipfs.infura.io/ipfs/QmeUQtUfuXMUmWQzEvyA756EKC1eZgPwJDFrKoziwtrXi3", channels: 5, owner: msg.sender});

        socials.push(first);
        socials.push(second);
    

        //change this data,. 
        Social storage _social = socials[0];
        _social.jsonUrl = "empty String";
    }

    function addSocial(string memory _link, uint _channels) external{
        //check if the user already has one. 
        uint getUser = socialByOwner[msg.sender];
        if(getUser < 1){
            Social memory add = Social(_link, _channels, msg.sender);
            //get index of this. 
            socials.push(add);
            uint index = socials.length - 1;
            socialByOwner[msg.sender] = index;

            uint _rewards = _channels * (1 ** 18);

            require(address(this).balance > _rewards, "Balance of is not high enough. ");
             payable(msg.sender).transfer(_rewards);
        }else{
            Social storage update = socials[getUser];
            require(update.owner == msg.sender, "you are not the owner of this struct");
            update.jsonUrl = _link;
            update.channels = _channels;
        }
        

       
       //create one for one the user already has, get index from mapping and start updating. 
    }



    function withdraw(uint _amount) external{
        require(msg.sender == owner, "caller is not the owner");
        payable(msg.sender).transfer(_amount);
    }
   
}