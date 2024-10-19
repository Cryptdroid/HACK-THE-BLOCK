// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract JurorSelection is VRFConsumerBase {
    IERC20 public grullToken;
    mapping(address => uint256) public stakes;
    address[] public jurors;
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public numJurorsToSelect;
    uint256 public minStake = 100 * 10 ** 18; // Minimum stake required
    uint256 public maxStake = 10000 * 10 ** 18; // Maximum stake allowed to prevent over-concentration
    uint256 public unstakePenaltyPercent = 10; // 10% penalty on unstaking before resolution

    event JurorsSelected(address[] selectedJurors);

    constructor(
        address _grullTokenAddress,
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        grullToken = IERC20(_grullTokenAddress);
        keyHash = _keyHash;
        fee = _fee;
    }

    /**
     * @dev Stake tokens to become eligible for juror selection.
     * @param _amount The amount of GRULL tokens to stake.
     */
    function stakeTokens(uint256 _amount) public {
        require(_amount >= minStake, "Amount is less than the minimum stake required");
        require(_amount <= maxStake, "Amount exceeds the maximum stake allowed");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
        jurors.push(msg.sender);
    }

    /**
     * @dev Unstake tokens, with a penalty if called before dispute resolution.
     * @param _amount The amount of tokens to unstake.
     */
    function unstakeTokens(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount, "Insufficient staked balance");
        
        // Apply penalty for early unstaking
        uint256 penalty = (_amount * unstakePenaltyPercent) / 100;
        uint256 finalAmount = _amount - penalty;
        
        stakes[msg.sender] -= _amount;
        grullToken.transfer(msg.sender, finalAmount);
        
        if (stakes[msg.sender] == 0) {
            // Remove from jurors list if no stake left
            for (uint256 i = 0; i < jurors.length; i++) {
                if (jurors[i] == msg.sender) {
                    jurors[i] = jurors[jurors.length - 1];
                    jurors.pop();
                    break;
                }
            }
        }
    }

    /**
     * @dev Select jurors randomly using Chainlink VRF.
     * @param _numJurors The number of jurors to select.
     */
    function selectJurors(uint256 _numJurors) public returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(_numJurors <= jurors.length, "Number of jurors exceeds the number of available participants");
        numJurorsToSelect = _numJurors;
        return requestRandomness(keyHash, fee);
    }

    /**
     * @dev Fulfill the random selection of jurors.
     * Uses randomness to select jurors fairly.
     */
    function fulfillRandomness(bytes32, uint256 randomness) internal override {
        address[] memory selectedJurors = new address[](numJurorsToSelect);
        for (uint256 i = 0; i < numJurorsToSelect; i++) {
            uint256 index = randomness % jurors.length;
            selectedJurors[i] = jurors[index];
            randomness = uint256(keccak256(abi.encode(randomness, i))); // Regenerate randomness for next selection
        }
        emit JurorsSelected(selectedJurors);
    }
}
