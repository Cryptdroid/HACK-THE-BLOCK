// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    IERC20 public grullToken;
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public stakingTimestamp;
    uint256 public lockupPeriod = 7 days; // Lockup period before users can unstake without penalties
    uint256 public minStakeAmount = 100 * 10 ** 18; // Minimum stake amount (e.g., 100 GRULL tokens)
    uint256 public earlyUnstakePenalty = 10; // 10% penalty for early unstaking

    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 penalty);

    constructor(address _grullTokenAddress) {
        grullToken = IERC20(_grullTokenAddress);
    }

    /**
     * @dev Stake a specified amount of tokens.
     * @param _amount The amount of tokens to stake.
     */
    function stakeTokens(uint256 _amount) public {
        require(_amount >= minStakeAmount, "Amount must be at least the minimum stake amount");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
        stakingTimestamp[msg.sender] = block.timestamp;

        emit TokensStaked(msg.sender, _amount);
    }

    /**
     * @dev Unstake a specified amount of tokens.
     * @param _amount The amount of tokens to unstake.
     */
    function unstakeTokens(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount, "Not enough staked tokens");
        uint256 stakedDuration = block.timestamp - stakingTimestamp[msg.sender];

        uint256 penalty = 0;
        if (stakedDuration < lockupPeriod) {
            penalty = (_amount * earlyUnstakePenalty) / 100;
            _amount -= penalty; // Deduct penalty from the unstake amount
            grullToken.transfer(address(this), penalty); // Penalty remains in the contract
        }

        stakes[msg.sender] -= (_amount + penalty); // Update stake after accounting for penalty
        grullToken.transfer(msg.sender, _amount);

        emit TokensUnstaked(msg.sender, _amount, penalty);
    }

    /**
     * @dev Get the staked amount for a specific user.
     * @param _user The address of the user.
     */
    function getStakedAmount(address _user) public view returns (uint256) {
        return stakes[_user];
    }
}
