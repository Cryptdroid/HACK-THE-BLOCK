// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract GrullToken is ERC20, ERC20Burnable, Ownable {
    bool public transfersRestricted; // To enable/disable transfers
    mapping(address => bool) public exemptedAddresses; // To exempt certain addresses from restrictions

    event TransfersRestricted(bool restricted);

    constructor(address initialOwner) ERC20("GRULL Token", "GRULL") Ownable(initialOwner) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        transfersRestricted = false; // Transfers are allowed by default
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Transfer tokens with restriction checks
     * @param to The recipient address
     * @param amount The amount of tokens being transferred
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(!transfersRestricted || exemptedAddresses[msg.sender], "Transfers are restricted during disputes");
        return super.transfer(to, amount);
    }

    /**
     * @dev Transfer tokens from another address with restriction checks
     * @param from The address transferring tokens
     * @param to The recipient address
     * @param amount The amount of tokens being transferred
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(!transfersRestricted || exemptedAddresses[from], "Transfers are restricted during disputes");
        return super.transferFrom(from, to, amount);
    }

    /**
     * @dev Enable or disable transfer restrictions
     * @param restricted Boolean value to restrict/unrestrict transfers
     */
    function setTransfersRestricted(bool restricted) external onlyOwner {
        transfersRestricted = restricted;
        emit TransfersRestricted(restricted);
    }

    /**
     * @dev Exempt an address from transfer restrictions
     * @param account The address to exempt
     * @param exempted Boolean value indicating exemption status
     */
    function setExemptedAddress(address account, bool exempted) external onlyOwner {
        exemptedAddresses[account] = exempted;
    }
}
