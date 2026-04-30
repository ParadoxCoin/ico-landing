// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZexTeamVesting is Ownable {
    IERC20 public zexToken;
    
    uint256 public constant CLIFF_DURATION = 365 days; // 1 year cliff
    uint256 public constant VESTING_DURATION = 730 days; // 24 months linear

    uint256 public startTimestamp;
    uint256 public totalAllocation;
    uint256 public released;

    event TokensReleased(uint256 amount);

    constructor() Ownable(msg.sender) {
        zexToken = IERC20(0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a);
        startTimestamp = block.timestamp; 
        // e.g. startTimestamp can be the day of exchange listing
    }

    function setTotalAllocation(uint256 _amount) external onlyOwner {
        require(totalAllocation == 0, "Allocation already set");
        totalAllocation = _amount;
    }

    function vestedAmount(uint256 timestamp) public view returns (uint256) {
        if (timestamp < startTimestamp + CLIFF_DURATION) {
            return 0; // In cliff period
        } else if (timestamp >= startTimestamp + CLIFF_DURATION + VESTING_DURATION) {
            return totalAllocation; // Vesting finished
        } else {
            // Linear vesting calculation
            uint256 timePassed = timestamp - (startTimestamp + CLIFF_DURATION);
            return (totalAllocation * timePassed) / VESTING_DURATION;
        }
    }

    function release() public onlyOwner {
        uint256 unreleased = vestedAmount(block.timestamp) - released;
        require(unreleased > 0, "No tokens are due for release yet");

        released += unreleased;
        bool success = zexToken.transfer(owner(), unreleased);
        require(success, "Token transfer failed");

        emit TokensReleased(unreleased);
    }
}
