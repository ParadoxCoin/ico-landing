// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ZexStaking is Ownable, ReentrancyGuard {
    IERC20 public zexToken;

    uint256 public constant REWARD_RATE_PER_YEAR = 25; // 25% APY
    uint256 public constant SECONDS_IN_YEAR = 31536000;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;
    uint256 public totalStaked;

    constructor(address _zexToken) Ownable(msg.sender) {
        zexToken = IERC20(_zexToken);
    }

    function calculateReward(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;

        uint256 stakedDuration = block.timestamp - userStake.startTime;
        
        // reward = amount * (25 / 100) * (duration / SECONDS_IN_YEAR)
        uint256 reward = (userStake.amount * REWARD_RATE_PER_YEAR * stakedDuration) / (100 * SECONDS_IN_YEAR);
        return reward;
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");

        // If user already staked, compounding or claiming previous rewards is usually needed.
        // For simplicity, we auto-claim previous rewards before adding new stake.
        uint256 pendingReward = calculateReward(msg.sender);
        if (pendingReward > 0) {
            require(zexToken.balanceOf(address(this)) - totalStaked >= pendingReward, "Not enough reward pool");
            zexToken.transfer(msg.sender, pendingReward);
        }

        uint256 oldAmount = stakes[msg.sender].amount;
        stakes[msg.sender] = Stake({
            amount: oldAmount + amount,
            startTime: block.timestamp
        });

        totalStaked += amount;
        
        bool success = zexToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Stake transfer failed");
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot unstake 0");
        require(stakes[msg.sender].amount >= amount, "Insufficient staked amount");

        uint256 pendingReward = calculateReward(msg.sender);
        
        stakes[msg.sender].amount -= amount;
        stakes[msg.sender].startTime = block.timestamp; // Reset timer for remaining amount

        totalStaked -= amount;

        // Send unstaked amount + rewards
        uint256 totalToSend = amount + pendingReward;
        
        // Optional Early Unstake Penalty logic can be added here (e.g. 10% penalty if < 30 days)

        bool success = zexToken.transfer(msg.sender, totalToSend);
        require(success, "Unstake transfer failed");
    }

    // Admin can deposit rewards into the contract
    function depositRewards(uint256 amount) external onlyOwner {
        require(amount > 0, "Deposit must be > 0");
        bool success = zexToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Reward deposit failed");
    }
}
