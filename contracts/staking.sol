// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    IERC20 public grullToken;
    mapping(address => uint256) public stakes;

    constructor(address _grullTokenAddress) {
        grullToken = IERC20(_grullTokenAddress);
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
    }

    function unstakeTokens(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount, "Not enough staked tokens");
        grullToken.transfer(msg.sender, _amount);
        stakes[msg.sender] -= _amount;
    }

    function getStakedAmount(address _user) public view returns (uint256) {
        return stakes[_user];
    }
}
