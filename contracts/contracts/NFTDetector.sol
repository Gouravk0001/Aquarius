// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

abstract contract NFTDetector {
    address public owner;
    mapping(bytes32 => bool) public isFlagged;
    mapping(address => bool) public isWhitelisted;
    mapping(address => bool) public isBlacklisted;

    struct Vote {
        uint upvotes;
        uint downvotes;
        mapping(address => bool) hasVoted;
    }

    mapping(bytes32 => Vote) public votes;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function flagNFT(bytes32 metadataHash) public onlyOwner {
        isFlagged[metadataHash] = true;
    }

    function checkFlag(bytes32 metadataHash) public view returns (bool) {
        return isFlagged[metadataHash];
    }

    function voteFraud(bytes32 metadataHash, bool isFraud) public {
        require(!votes[metadataHash].hasVoted[msg.sender], "Already voted");
        if (isFraud) votes[metadataHash].upvotes++;
        else votes[metadataHash].downvotes++;
        votes[metadataHash].hasVoted[msg.sender] = true;
    }

    // Abstract methods
    function addToWhitelist(address creator) public virtual;
    function addToBlacklist(address creator) public virtual;
}
