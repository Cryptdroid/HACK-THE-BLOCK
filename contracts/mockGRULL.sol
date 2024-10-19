// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockGRULL is ERC20 {
    constructor() ERC20("Mock GRULL Token", "GRULL") {
        // Mint an initial supply to the deployer
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
