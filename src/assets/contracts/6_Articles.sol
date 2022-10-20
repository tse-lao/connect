// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

contract Articles{
    address public owner;
    address[] public authors;
    
    mapping(address => bool) private author_approved;
    mapping(address => string[]) public authorArticles;
    mapping(address => uint) public countArticles;
    
    constructor(){
        owner = msg.sender;
    }
    
    function getOwner() public view returns(address){
        return owner;
    }
    function addAuthor(address _author) public{
        require(msg.sender == owner);
        if(!author_approved[_author]){
            authors.push(_author);
            author_approved[_author] = true;
        }
    }
    function addArticle(string memory _url) public{
        //find if msg.sender is an atuhor.
        authorArticles[msg.sender].push(_url);
        countArticles[msg.sender] +=1 ; 
    }
    function updateArticle(uint _position, string memory _url) public {
        
        authorArticles[msg.sender][_position] = _url;
    }
    
    function deleteArticles(uint _position) public {
        
        authorArticles[msg.sender][_position] = "";
    }
}