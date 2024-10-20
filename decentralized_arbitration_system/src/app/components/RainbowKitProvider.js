import React from 'react';
import { RainbowKitProvider, ConnectButton, getDefaultWallets } from '@rainbowkit/core';
import { WagmiProvider, chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.rinkeby],
  [jsonRpcProvider({ rpc: (chain) => ({ http: `https://${chain.id}.infura.io/v3/YOUR_INFURA_PROJECT_ID` }) })]
);

const { connectors } = getDefaultWallets({
  appName: 'My App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const RainbowKitProviderComponent = ({ children }) => (
  <WagmiProvider client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ConnectButton />
      {children}
    </RainbowKitProvider>
  </WagmiProvider>
);

export default RainbowKitProviderComponent;
