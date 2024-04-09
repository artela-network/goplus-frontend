import '../styles/globals.css';
import '../layout/activity/activity.css'
import '../layout/components/introduce/introduce.css'
import '../layout/components/introduce/mobile.css'
import '../layout/styles.css'
import '../layout/components/SecondTask/style.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider,darkTheme  } from '@rainbow-me/rainbowkit';



import { defineChain } from 'viem'

const artela = {
  id: 11822,
  name: 'Artela Testnet',
  network: 'artela-testnet',
  iconUrl: 'https://framerusercontent.com/images/xLv7JZ8nzPaZ9zk7j63YbRZHqY.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Artela',
    symbol: 'ART',
  },
  rpcUrls: {
    public: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
    default: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
    etherscan: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
  },
  testnet: false,
};
const artelanet = defineChain(artela)

const config = getDefaultConfig({
  appName: 'GoPlus',
  projectId: '080999b35ff4ade22e595b9aeb16db24',
  chains: [
    artelanet
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider modalSize="compact" locale="en-US" theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
