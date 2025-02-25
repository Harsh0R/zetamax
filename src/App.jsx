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
  bsc,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Navbar from './components/Navbar/Navbar';
import { berasigWallet, binanceWallet, coinbaseWallet, metaMaskWallet, rainbowWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import Swap from './components/swapcomponent/swap';
import ContextProvider from './context/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin/Admin';

function App() {


  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [rainbowWallet, walletConnectWallet, trustWallet, binanceWallet, berasigWallet, coinbaseWallet, metaMaskWallet],
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
    chains: [mainnet, polygon, optimism, arbitrum, base, polygonAmoy, bscTestnet , bsc ],
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >
          <ContextProvider>
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/" element={<Swap />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </BrowserRouter>
          </ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
