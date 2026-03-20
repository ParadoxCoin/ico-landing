import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygon, mainnet, bsc, sepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = '7618ae03fb9e1bd4fcdaeb7f1ca5c165';

const metadata = {
    name: 'ZexAI ICO Platform',
    description: 'ZexAI Token Presale and Ecosystem',
    url: 'https://zexai.io',
    icons: ['https://zexai.io/logo192.png']
}

const networks = [polygon, mainnet, bsc, sepolia]

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
})

// Create Modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    defaultNetwork: polygon,
    projectId,
    metadata,
    features: {
        analytics: false,
        email: true,
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        emailShowWallets: true,
    },
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#7C3AED',
        '--w3m-color-mix': '#060612',
        '--w3m-color-mix-strength': 20,
        '--w3m-border-radius-master': '16px',
        '--w3m-font-family': 'Inter, sans-serif'
    }
})

export const config = wagmiAdapter.wagmiConfig
