// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingSystem {
    struct Dispute {
        uint256 id;
        string description;
        uint256 inFavor;
        uint256 against;
        bool resolved;
        uint256 totalVotes;
        mapping(address => bool) votes;
        mapping(address => uint256) voteWeights; // Track vote weight based on stake
    }

    IERC20 public grullToken;
    uint256 public minStakeAmount = 50 * 10 ** 18; // Minimum stake to be eligible to vote
    uint256 public minVotesRequired = 10; // Minimum number of votes for resolution
    Dispute[] public disputes;
    mapping(address => uint256) public stakes;

    event DisputeCreated(uint256 indexed disputeId, string description);
    event VoteCast(address indexed voter, uint256 indexed disputeId, bool vote, uint256 weight);
    event DisputeResolved(uint256 indexed disputeId, bool outcome);

    constructor(address _grullTokenAddress) {
        grullToken = IERC20(_grullTokenAddress);
    }

    /**
     * @dev Stake tokens to be eligible to vote.
     * @param _amount The amount of tokens to stake.
     */
    function stakeTokens(uint256 _amount) public {
        require(_amount >= minStakeAmount, "Amount must be at least the minimum stake amount");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
    }

    /**
     * @dev Create a new dispute.
     * @param _description The description of the dispute.
     */
    function createDispute(string memory _description) public {
        Dispute storage newDispute = disputes.push();
        newDispute.id = disputes.length - 1;
        newDispute.description = _description;
        newDispute.inFavor = 0;
        newDispute.against = 0;
        newDispute.totalVotes = 0;
        newDispute.resolved = false;

        emit DisputeCreated(newDispute.id, _description);
    }

    /**
     * @dev Vote on a dispute.
     * @param _disputeId The ID of the dispute.
     * @param _vote True for "in favor", false for "against".
     */
    function vote(uint256 _disputeId, bool _vote) public {
        require(stakes[msg.sender] >= minStakeAmount, "Must have staked tokens to vote");
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");
        require(!dispute.votes[msg.sender], "Already voted");

        uint256 voteWeight = stakes[msg.sender];
        dispute.votes[msg.sender] = true;
        dispute.voteWeights[msg.sender] = voteWeight;
        dispute.totalVotes += 1;

        if (_vote) {
            dispute.inFavor += voteWeight;
        } else {
            dispute.against += voteWeight;
        }

        emit VoteCast(msg.sender, _disputeId, _vote, voteWeight);
    }

    /**
     * @dev Resolve a dispute if minimum votes have been cast.
     * @param _disputeId The ID of the dispute.
     */
    function resolveDispute(uint256 _disputeId) public {
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");
        require(dispute.totalVotes >= minVotesRequired, "Not enough votes to resolve");

        dispute.resolved = true;
        bool outcome = dispute.inFavor > dispute.against;

        emit DisputeResolved(_disputeId, outcome);
    }
}
