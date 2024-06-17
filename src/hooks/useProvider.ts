import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  createAlchemyProvider,
  createAnkrProvider,
  createQuiknodeProvider,
  createOneRpcProvider,
} from '../utils';

type RpcProvider = 'ankr' | 'alchemy' | 'quiknode' | '1rpc';

export const useProvider = (rpcProvider: RpcProvider) => {
  const [provider, setProvider] = useState<ethers.providers.Provider>();

  useEffect(() => {
    switch (rpcProvider) {
      case 'ankr':
        setProvider(createAnkrProvider());
        break;
      case 'alchemy':
        setProvider(createAlchemyProvider());
        break;
      case 'quiknode':
        setProvider(createQuiknodeProvider());
        break;
      case '1rpc':
        setProvider(createOneRpcProvider());
        break;
      default:
        break;
    }
  }, [rpcProvider]);

  return provider;
};
