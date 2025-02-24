import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  polygonAmoy,
  bscTestnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Navbar from './components/Navbar/Navbar';
import { berasigWallet, binanceWallet, coinbaseWallet, rainbowWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import Swap from './components/swapcomponent/swap';
import SwapUSDTtoCustom from './components/SwapUSDTtoCustom/SwapUSDTtoCustom';

function App() {

  
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended',
          wallets: [rainbowWallet, walletConnectWallet , trustWallet , binanceWallet , berasigWallet , coinbaseWallet ],
        },
      ],
      {
        appName: 'My RainbowKit App',
        projectId: 'YOUR_PROJECT_ID',
      }
    );
  const config = getDefaultConfig({
    connectors,
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base, polygonAmoy , bscTestnet ],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >
          <SwapUSDTtoCustom/>
          <Swap/>
          <Navbar />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
