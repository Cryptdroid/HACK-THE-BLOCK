// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardDistribution {
    IERC20 public grullToken;
    mapping(address => uint256) public rewards;

    function distributeRewards(address[] memory _jurors, uint256[] memory _votes) public {
        require(_jurors.length == _votes.length, "Mismatched arrays");

        uint256 totalReward = grullToken.balanceOf(address(this));
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < _votes.length; i++) {
            totalVotes += _votes[i];
        }

        for (uint256 i = 0; i < _jurors.length; i++) {
            uint256 reward = (totalReward * _votes[i]) / totalVotes;
            rewards[_jurors[i]] += reward;
        }
    }

    function claimReward() public {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");

        rewards[msg.sender] = 0;
        grullToken.transfer(msg.sender, reward);
    }
}
