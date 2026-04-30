import { ethers } from "ethers";
import fs from "fs";

async function main() {
  console.log("Reading artifacts...");
  
  const presaleArtifact = JSON.parse(fs.readFileSync("./artifacts/contracts/ZexPresale.sol/ZexPresale.json", "utf8"));
  const vestingArtifact = JSON.parse(fs.readFileSync("./artifacts/contracts/ZexTeamVesting.sol/ZexTeamVesting.json", "utf8"));
  const stakingArtifact = JSON.parse(fs.readFileSync("./artifacts/contracts/ZexStaking.sol/ZexStaking.json", "utf8"));

  console.log("Connecting to Polygon Mainnet...");
  // Using an alternate public RPC for stability
  const provider = new ethers.JsonRpcProvider("https://polygon.llamarpc.com");
  
  // WARNING: User provided this in plaintext. Hardcoding just for the deployment script execution.
  const wallet = new ethers.Wallet("64118600c40a57f736740097b844d94a9a17aaabf3502bc04d0bb21184471dee", provider);
  console.log("Deployer address:", wallet.address);

  // Constants
  const ZEX_TOKEN_ADDRESS = "0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a";
  const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const ORACLE_ADDRESS = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
  const START_TIMESTAMP = Math.floor(Date.now() / 1000); 

  console.log("-----------------------------------------");
  console.log("1) Deploying ZexPresale...");
  const PresaleFactory = new ethers.ContractFactory(presaleArtifact.abi, presaleArtifact.bytecode, wallet);
  const presale = await PresaleFactory.deploy(ZEX_TOKEN_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, ORACLE_ADDRESS);
  await presale.waitForDeployment();
  console.log("ZexPresale Address:", await presale.getAddress());

  console.log("-----------------------------------------");
  console.log("2) Deploying ZexTeamVesting...");
  const VestingFactory = new ethers.ContractFactory(vestingArtifact.abi, vestingArtifact.bytecode, wallet);
  const vesting = await VestingFactory.deploy(ZEX_TOKEN_ADDRESS, START_TIMESTAMP);
  await vesting.waitForDeployment();
  console.log("ZexTeamVesting Address:", await vesting.getAddress());

  console.log("-----------------------------------------");
  console.log("3) Deploying ZexStaking...");
  const StakingFactory = new ethers.ContractFactory(stakingArtifact.abi, stakingArtifact.bytecode, wallet);
  const staking = await StakingFactory.deploy(ZEX_TOKEN_ADDRESS);
  await staking.waitForDeployment();
  console.log("ZexStaking Address:", await staking.getAddress());

  console.log("-----------------------------------------");
  console.log("Deployment Complete!");
}

main().catch(console.error);
