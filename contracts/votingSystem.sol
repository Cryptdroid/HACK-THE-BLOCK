// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract VotingSystem {
    struct Dispute {
        uint256 id;
        string description;
        uint256 inFavor;
        uint256 against;
        bool resolved;
        mapping(address => bool) votes;
    }

    Dispute[] public disputes;

    function createDispute(string memory _description) public {
        Dispute storage newDispute = disputes.push();
        newDispute.id = disputes.length - 1;
        newDispute.description = _description;
        newDispute.inFavor = 0;
        newDispute.against = 0;
        newDispute.resolved = false;
    }

    function vote(uint256 _disputeId, bool _vote) public {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");
        require(!dispute.votes[msg.sender], "Already voted");

        dispute.votes[msg.sender] = true;
        if (_vote) {
            dispute.inFavor++;
        } else {
            dispute.against++;
        }
    }

    function resolveDispute(uint256 _disputeId) public {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");
        dispute.resolved = true;
    }
}
