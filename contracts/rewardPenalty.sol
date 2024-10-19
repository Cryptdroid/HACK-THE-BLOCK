// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardDistribution {
    IERC20 public grullToken;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastClaimed; // Track last reward claim time for each juror
    uint256 public claimCooldown = 1 days; // Minimum time before a juror can claim rewards again
    uint256 public maxVoteWeight = 100; // Maximum weight per vote
    uint256 public minVotesThreshold = 5; // Minimum votes required to be eligible for reward

    event RewardsDistributed(address[] jurors, uint256[] rewards);
    event RewardClaimed(address indexed juror, uint256 amount);

    /**
     * @dev Distribute rewards to jurors based on their votes.
     * @param _jurors List of juror addresses.
     * @param _votes List of votes each juror received.
     */
    function distributeRewards(address[] memory _jurors, uint256[] memory _votes) public {
        require(_jurors.length == _votes.length, "Mismatched arrays");

        uint256 totalReward = grullToken.balanceOf(address(this));
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < _votes.length; i++) {
            require(_votes[i] <= maxVoteWeight, "Vote weight exceeds maximum allowed");
            totalVotes += _votes[i];
        }

        for (uint256 i = 0; i < _jurors.length; i++) {
            if (_votes[i] >= minVotesThreshold) {
                uint256 reward = (totalReward * _votes[i]) / totalVotes;
                rewards[_jurors[i]] += reward;
            }
        }

        emit RewardsDistributed(_jurors, _votes);
    }

    /**
     * @dev Allow jurors to claim their accumulated rewards.
     */
    function claimReward() public {
        require(rewards[msg.sender] > 0, "No rewards to claim");
        require(block.timestamp >= lastClaimed[msg.sender] + claimCooldown, "Claim cooldown not yet reached");

        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        lastClaimed[msg.sender] = block.timestamp;
        grullToken.transfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }
}
