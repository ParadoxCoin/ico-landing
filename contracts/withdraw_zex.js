import { ethers } from "ethers";
import dns from "dns";
import { promisify } from "util";

const lookup = promisify(dns.lookup);

async function checkDns(host) {
  try {
    const { address } = await lookup(host);
    console.log(`DNS check: ${host} -> ${address}`);
    return address;
  } catch (e) { return null; }
}

async function main() {
  const rpcs = ["https://1rpc.io/matic", "https://polygon-rpc.com"];
  let provider;
  for (const url of rpcs) {
    try {
      provider = new ethers.JsonRpcProvider(url, undefined, { staticNetwork: true });
      await Promise.race([provider.getNetwork(), new Promise((_, r) => setTimeout(r, 2000))]);
      break;
    } catch (e) { provider = null; }
  }

  if (!provider) throw new Error("Connection failed");

  const contractAddress = "0x37CAd7cf190059c6716967CB429cD4CD13c390fC";
  const tokenAddress = "0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a";
  const privateKey = "64118600c40a57f736740097b844d94a9a17aaabf3502bc04d0bb21184471dee";

  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("Bizim Cüzdanımız:", wallet.address);

  const presaleAbi = [
    "function owner() view returns (address)",
    "function retrieveUnsoldTokens() external",
    "function withdrawUnsoldZex() external",
    "function withdrawToken(address) external",
    "function emergencyWithdraw() external"
  ];
  
  const presaleContract = new ethers.Contract(contractAddress, presaleAbi, wallet);

  try {
    const ownerAddress = await presaleContract.owner();
    console.log("Sözleşme Sahibi (Owner):", ownerAddress);
    
    if (ownerAddress.toLowerCase() !== wallet.address.toLowerCase()) {
      console.error("KRİTİK HATA: Sözleşmenin sahibi biz değiliz! Sahibi:", ownerAddress);
    }
  } catch (e) {
    console.log("Sözleşme sahibi sorgulanamadı.");
  }

  const tokenAbi = ["function balanceOf(address) view returns (uint256)"];
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
  const balance = await tokenContract.balanceOf(contractAddress);
  console.log(`Sözleşme Bakiyesi: ${ethers.formatUnits(balance, 18)} ZEX`);

  if (balance === 0n) return console.log("Bakiye 0.");

  const methods = ["retrieveUnsoldTokens", "withdrawUnsoldZex", "emergencyWithdraw"];
  
  for (const method of methods) {
    console.log(`Deniniyor: ${method}()...`);
    try {
      const tx = await presaleContract[method]();
      console.log(`İşlem gönderildi (${method}):`, tx.hash);
      await tx.wait();
      console.log(`BAŞARILI! (${method})`);
      return;
    } catch (error) {
      console.log(`${method} başarısız: ${error.reason || error.message.split("(")[0]}`);
    }
  }

  // Last resort: withdrawToken(zexAddress)
  console.log("Deniniyor: withdrawToken(ZEX)...");
  try {
    const tx = await presaleContract.withdrawToken(tokenAddress);
    console.log("İşlem gönderildi (withdrawToken):", tx.hash);
    await tx.wait();
    console.log("BAŞARILI! (withdrawToken)");
  } catch (error) {
    console.error("Tüm metodlar başarısız oldu.");
  }
}

main().catch(console.error);
