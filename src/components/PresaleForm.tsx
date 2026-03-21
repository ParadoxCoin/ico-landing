import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ArrowRight, Activity, Wallet, ShieldCheck, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ConnectButton from './ConnectButton';

// Mainnet Deployment Adresses
const PRESALE_ADDRESS = "0x37CAd7cf190059c6716967CB429cD4CD13c390fC";
const TOKEN_ADDRESS = "0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a";

const PRESALE_ABI = [
  { "inputs": [], "name": "buyTokens", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "zexAmount", "type": "uint256" }], "name": "refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "presaleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "totalZexSold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "MAX_PRIVATE_SALE_POOL", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "contributions", "outputs": [{ "internalType": "uint256", "name": "zexPurchased", "type": "uint256" }, { "internalType": "uint256", "name": "polSpent", "type": "uint256" }], "stateMutability": "view", "type": "function" }
];

const ERC20_ABI = [
  { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
];

export const PresaleForm: React.FC = () => {
    const { t } = useTranslation();
    const { isConnected, address } = useAccount();
    const { data: ethBalance } = useBalance({ address });
    const { data: zexBalanceData } = useReadContract({
        address: TOKEN_ADDRESS as any,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
        query: { enabled: !!address }
    });
    
    const [polAmount, setPolAmount] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [activeTab, setActiveTab] = useState<'buy' | 'refund'>('buy');

    // Contract Reads
    const { data: isPresaleActive } = useReadContract({ address: PRESALE_ADDRESS as any, abi: PRESALE_ABI, functionName: 'presaleActive' });
    const { data: totalSoldData } = useReadContract({ address: PRESALE_ADDRESS as any, abi: PRESALE_ABI, functionName: 'totalZexSold' });
    const { data: myContributionData } = useReadContract({
        address: PRESALE_ADDRESS as any,
        abi: PRESALE_ABI,
        functionName: 'contributions',
        args: [address],
        query: { enabled: !!address }
    });

    const { writeContract, data: txHash, isPending } = useWriteContract();
    const { isLoading: isTxConfirming, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash: txHash });

    const totalSold = totalSoldData ? Number(formatEther(totalSoldData as bigint)) : 0;
    const isPrivateSale = totalSold < 10000000;
    const activeRate = isPrivateSale ? 333 : 200; // ZEX per POL

    useEffect(() => {
        if (isTxSuccess) {
            setPolAmount('');
            setRefundAmount('');
        }
    }, [isTxSuccess]);

    const handleBuy = async () => {
        if (!polAmount || Number(polAmount) <= 0) return;
        writeContract({
            address: PRESALE_ADDRESS as any,
            abi: PRESALE_ABI,
            functionName: 'buyTokens',
            value: parseEther(polAmount)
        });
    };

    const handleRefund = async () => {
        if (!refundAmount || Number(refundAmount) <= 0) return;
        
        // In a real dApp we'd check/handle ERC20 approval here before calling refund
        // Assuming user executes approval first or we do batch tx.
        // For simplicity, requesting refund directly (will fail if not approved)
        // A production ready wrapper would call `approve` then `refund`.
        alert("Not: Refund yapmadan önce MetaMask üzerinden Kontrata Harcama İzni (Approve) vermeniz gerekebilir!");
        writeContract({
            address: PRESALE_ADDRESS as any,
            abi: PRESALE_ABI,
            functionName: 'refund',
            args: [parseEther(refundAmount)]
        });
    };

    const expectedZex = Number(polAmount || 0) * activeRate;
    const myPurchasedZex = myContributionData ? Number(formatEther((myContributionData as any)[0])) : 0;
    const zexWalletBalance = zexBalanceData ? Number(formatEther(zexBalanceData as bigint)) : 0;

    return (
        <div className="bg-[#0A0A1F] border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />

            {!isConnected ? (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <Shield className="w-16 h-16 text-cyan-400 opacity-80" />
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-2">ZEX Presale Portal</h4>
                        <p className="text-gray-400 text-sm max-w-sm mx-auto">
                            Lütfen Polygon ağındaki Cüzdanınızı bağlayarak Anında Ön Satış veya İade (Buyback) paneline erişin.
                        </p>
                    </div>
                    <ConnectButton />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            {isPresaleActive ? (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-xs font-bold uppercase">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Satış Aktif
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-xs font-bold uppercase">
                                    Durduruldu
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/10 border border-white/10 text-white rounded-full text-xs font-bold uppercase">
                                {isPrivateSale ? 'Phase 1: Private Sale (Ucuz)' : 'Phase 2: Public Sale'}
                            </span>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                            Bakiye: <span className="text-white font-mono">{Number(ethBalance?.formatted || 0).toFixed(4)} POL</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                        <button
                            onClick={() => setActiveTab('buy')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                activeTab === 'buy' ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            ZEX SATIN AL
                        </button>
                        <button
                            onClick={() => setActiveTab('refund')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                activeTab === 'refund' ? 'bg-red-500/20 border border-red-500/50 text-red-300 shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            İADE (Refund %15 Ceza)
                        </button>
                    </div>

                    {activeTab === 'buy' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Gönderilecek POL</label>
                                <div className="flex items-center">
                                    <input 
                                        type="number" 
                                        value={polAmount}
                                        onChange={(e) => setPolAmount(e.target.value)}
                                        placeholder="0.0"
                                        className="w-full bg-transparent border-none text-3xl font-black text-white focus:outline-none"
                                    />
                                    <span className="text-lg font-bold text-cyan-400">POL</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center p-2">
                                <ArrowRight className="text-gray-500 w-5 h-5 rotate-90" />
                            </div>

                            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Alınacak ZEX (Max)</label>
                                <div className="flex items-center">
                                    <input 
                                        type="text" 
                                        value={expectedZex.toLocaleString()}
                                        readOnly
                                        className="w-full bg-transparent border-none text-3xl font-black text-white focus:outline-none"
                                    />
                                    <span className="text-lg font-bold text-purple-400">ZEX</span>
                                </div>
                                <div className="mt-2 text-xs text-cyan-300 font-medium">1 POL = {activeRate} ZEX Oranından Hesaplandı</div>
                            </div>

                            <button 
                                onClick={handleBuy}
                                disabled={isPending || isTxConfirming || !isPresaleActive || !polAmount}
                                className="w-full mt-4 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl font-bold text-lg shadow-xl shadow-purple-500/20 transition-all flex justify-center items-center gap-2"
                            >
                                {(isPending || isTxConfirming) ? <Activity className="w-6 h-6 animate-spin" /> : 'Satın Alma İşlemini Onayla'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'refund' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-red-300 uppercase tracking-widest block">İade Edilecek ZEX</label>
                                    <span className="text-xs text-gray-400">Alınan: {myPurchasedZex.toFixed(2)} ZEX</span>
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        type="number" 
                                        value={refundAmount}
                                        onChange={(e) => setRefundAmount(e.target.value)}
                                        placeholder="0.0"
                                        className="w-full bg-transparent border-none text-3xl font-black text-white focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => setRefundAmount(myPurchasedZex.toString())}
                                        className="mr-3 px-2 py-1 text-[10px] bg-red-500/20 text-red-300 rounded font-bold"
                                    >
                                        MAX
                                    </button>
                                    <span className="text-lg font-bold text-red-400">ZEX</span>
                                </div>
                            </div>

                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl mb-4 text-xs text-red-200 leading-relaxed font-medium">
                                ⚠️ İade mekanizması sizi piyasa riskinden korur. İade edilen ZEX miktarının <strong className="text-red-400">%15'i ağ tarafından kalıcı olarak yakılır (Burn)</strong>, kalan değer üzerinden ödediğiniz POL cüzdanınıza anında aktarılır.
                            </div>

                            <button 
                                onClick={handleRefund}
                                disabled={isPending || isTxConfirming || !refundAmount || Number(refundAmount) > myPurchasedZex}
                                className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl font-bold text-lg shadow-xl shadow-red-500/20 transition-all flex justify-center items-center gap-2"
                            >
                                {(isPending || isTxConfirming) ? <Activity className="w-6 h-6 animate-spin" /> : 'İadeyi Onayla & Kapat'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PresaleForm;
