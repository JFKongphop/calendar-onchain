import { useMemo } from 'react';
import { configureChains, createConfig, useWalletClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { goerli, holesky } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ethers, providers } from 'ethers'
import type { WalletClient } from 'wagmi'

import { calendarABI } from '@/abi/calendar';
import { CALENDAR_ADDRESS, CALENDAR_HOLESKY } from './configs/enviroment';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [holesky],
  [publicProvider()]
);
 
export const walletClientToSigner = (walletClient: WalletClient) => {
  const { account, chain, transport } = walletClient;
  // console.log(chain)
  const network = {
    chainId: holesky.id,
    name: holesky.name,
    ensAddress: holesky.contracts.multicall3.address// chain.contracts?.ensRegistry?.address,
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
    CALENDAR_HOLESKY,
    calendarABI,
    signer
  );

  return calendarContract;
};

console.log(CALENDAR_HOLESKY)

export const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});