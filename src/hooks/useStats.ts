import { useState, useEffect } from 'react';

interface ZexStats {
  price: number;
  burned: number;
  robotSales: number;
  totalRobots: number;
  holders: number;
  marketCap: number;
  apr6m: number;
  apr12m: number;
  apr24m: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<ZexStats>({
    price: 0.005,
    burned: 1245000,
    robotSales: 42,
    totalRobots: 80,
    holders: 1250,
    marketCap: 5000000,
    apr6m: 12,
    apr12m: 25,
    apr24m: 55,
  });

  useEffect(() => {
    // In a real production app, this would be a fetch call to an API or a multicall to a smart contract.
    // For now, we simulate subtle "live" movements to give a professional feel.
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        price: prev.price + (Math.random() * 0.0001 - 0.00005), // Subtle price noise
        burned: prev.burned + Math.floor(Math.random() * 10), // Burn count going up slowly
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
