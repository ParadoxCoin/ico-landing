import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatUnits } from 'viem';

const ConnectButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [isOpen, setIsOpen] = useState(false);

  // Use the injected connector (MetaMask) we configured
  const handleConnect = () => {
    const metaMaskConnector = connectors.find(c => c.type === 'injected' || c.id.toLowerCase().includes('metamask')) || connectors[0];
    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  const formatAddress = (addr?: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (val?: string) => {
    if (!val) return '0.000';
    const num = parseFloat(val);
    return num.toFixed(3);
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isPending}
        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
      >
        <Wallet className="w-4 h-4" />
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
      >
        {/* Balance Badge */}
        <div className="hidden sm:flex items-center px-3 py-1 bg-[#1A1A2E] rounded-lg border border-white/5 shadow-inner">
          <span className="font-mono text-sm font-medium text-white">
             {balance ? formatBalance(formatUnits(balance.value, balance.decimals)) : '0.000'} <span className="text-gray-400 text-xs ml-1">{balance?.symbol || 'POL'}</span>
          </span>
        </div>

        {/* Address Badge with gradient orb */}
        <div className="flex items-center gap-2 pl-1 sm:pl-0">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 shadow-md flex-shrink-0" />
          <span className="font-mono text-sm font-medium text-gray-200">
             {formatAddress(address)}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-full min-w-[160px] bg-[#0A0A1F] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 origin-top-right"
          >
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectButton;
