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

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        grullToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
        jurors.push(msg.sender);
    }

    function selectJurors(uint256 _numJurors) public returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        numJurorsToSelect = _numJurors;
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32, uint256 randomness) internal override {
        address[] memory selectedJurors = new address[](numJurorsToSelect);
        for (uint256 i = 0; i < numJurorsToSelect; i++) {
            uint256 index = randomness % jurors.length;
            selectedJurors[i] = jurors[index];
            randomness = uint256(keccak256(abi.encode(randomness, i)));
        }
        emit JurorsSelected(selectedJurors);
    }
}
