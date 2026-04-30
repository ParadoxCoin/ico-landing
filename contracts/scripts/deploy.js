import hre from "hardhat";

async function main() {
  console.log("Starting deployment...");
  // Variables for ZexPresale
  const ZEX_TOKEN_ADDRESS = "0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a";
  const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const ORACLE_ADDRESS = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";

  const START_TIMESTAMP = Math.floor(Date.now() / 1000); // Now

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // ZexPresale
  console.log("Deploying ZexPresale...");
  const ZexPresale = await hre.ethers.getContractFactory("ZexPresale");
  const presale = await ZexPresale.deploy(ZEX_TOKEN_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, ORACLE_ADDRESS);
  await presale.waitForDeployment();
  console.log("ZexPresale Deployed to:", await presale.getAddress());

  // ZexTeamVesting
  console.log("Deploying ZexTeamVesting...");
  const ZexVesting = await hre.ethers.getContractFactory("ZexTeamVesting");
  const vesting = await ZexVesting.deploy(ZEX_TOKEN_ADDRESS, START_TIMESTAMP);
  await vesting.waitForDeployment();
  console.log("ZexTeamVesting Deployed to:", await vesting.getAddress());

  // ZexStaking
  console.log("Deploying ZexStaking...");
  const ZexStaking = await hre.ethers.getContractFactory("ZexStaking");
  const staking = await ZexStaking.deploy(ZEX_TOKEN_ADDRESS);
  await staking.waitForDeployment();
  console.log("ZexStaking Deployed to:", await staking.getAddress());

  console.log("ALL DEPLOYMENTS SUCCESSFUL!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
