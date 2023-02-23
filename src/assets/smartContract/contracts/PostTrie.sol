// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

contract PostTrie {
    event AddPost(bytes32 ipfs, address proposer);

    struct Post {
        bytes32 ipfs;
        bool active;
        address proposer;
        address tracker;
        uint256 balance;
    }
    
    mapping(bytes32 => Post) public posts;


    function addPost(bytes32 ipfs, bool active, address proposer, address tracker, uint256 balance) public {
        posts[ipfs] = Post({
            ipfs: ipfs,
            active: active,
            proposer: proposer,
            tracker: tracker,
            balance: balance
        });
        
        
        emit AddPost(ipfs, proposer)
    }

}