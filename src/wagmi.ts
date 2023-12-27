import { useMemo } from 'react';
import { configureChains, createConfig, useWalletClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ethers, providers } from 'ethers'
import type { WalletClient } from 'wagmi'

import { calendarABI } from '@/abi/calendar';
import { CALENDAR_ADDRESS } from './configs/enviroment';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);
 
export const walletClientToSigner = (walletClient: WalletClient) => {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);

  return signer;
};
 
export const useEthersSigner = ({ chainId }: { chainId?: number } = {}) => {
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );
};

export const useContractCalendar = () => {
  const signer = useEthersSigner();
  const calendarContract = new ethers.Contract(
    CALENDAR_ADDRESS,
    calendarABI,
    signer
  );

  return calendarContract;
};

export const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});