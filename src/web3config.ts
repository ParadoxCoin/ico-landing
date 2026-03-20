import { createConfig, http } from 'wagmi';
import { polygon, mainnet, bsc } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygon, mainnet, bsc],
  connectors: [
    injected({ target: 'metaMask' })
  ],
  transports: {
    [polygon.id]: http(),
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
