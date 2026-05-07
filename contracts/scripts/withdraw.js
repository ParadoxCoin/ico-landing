const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x3B1029B045D635447EFF6973e95156d9a1285480";
  const tokenAddress = "0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a";
  
  // We'll use the signer from hardhat (which should be configured in hardhat.config.js or passed via --network)
  // But since the config is empty, we'll manually create a wallet if needed.
  // Actually, let's just use the provider and wallet approach again but inside hardhat task.
  
  const provider = ethers.provider;
  const privateKey = "64118600c40a57f736740097b844d94a9a17aaabf3502bc04d0bb21184471dee";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("Wallet address:", wallet.address);

  const tokenAbi = ["function balanceOf(address) view returns (uint256)", "function symbol() view returns (string)"];
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  const balance = await tokenContract.balanceOf(contractAddress);
  const symbol = await tokenContract.symbol();
  
  console.log(`Contract (${contractAddress}) balance: ${ethers.formatEther(balance)} ${symbol}`);

  if (balance === 0n) {
    console.log("Nothing to withdraw.");
    return;
  }

  const presaleAbi = ["function withdrawUnsoldZex() external"];
  const presaleContract = new ethers.Contract(contractAddress, presaleAbi, wallet);

  console.log("Calling withdrawUnsoldZex()...");
  try {
    const tx = await presaleContract.withdrawUnsoldZex();
    console.log("Transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Withdrawal successful!");
  } catch (error) {
    console.error("Error during withdrawal:", error.message);
  }
}

main().catch(console.error);
