// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./NFTDetector.sol";

contract NFTFraudDetection is NFTDetector {

    function addToWhitelist(address creator) public override onlyOwner {
        isWhitelisted[creator] = true;
        isBlacklisted[creator] = false;
    }

    function addToBlacklist(address creator) public override onlyOwner {
        isBlacklisted[creator] = true;
        isWhitelisted[creator] = false;
    }

    function isCreatorFlagged(address creator) public view returns (bool) {
        return isBlacklisted[creator];
    }

    function getVotes(bytes32 metadataHash) public view returns (uint upvotes, uint downvotes) {
        Vote storage vote = votes[metadataHash];
        return (vote.upvotes, vote.downvotes);
    }
}
