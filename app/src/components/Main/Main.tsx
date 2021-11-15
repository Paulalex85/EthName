import React, { useState } from 'react';
import { Account } from './components';
import { providers } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useAddress, useUserProvider } from '../../hooks';
import { NETWORKS } from '../../constants';
import UpdateName from './components/UpdateName';

const Main = () => {
    const cachedNetwork = window.localStorage.getItem('network');
    const targetNetwork = NETWORKS[cachedNetwork !== null ? cachedNetwork : 'ropsten'];
    const localProvider: StaticJsonRpcProvider = new providers.JsonRpcProvider(
        targetNetwork !== undefined ? targetNetwork.rpcUrl : 'http://localhost:8545',
    );
    const [injectedProvider, setInjectedProvider] = useState<providers.Web3Provider>();

    const userProvider: providers.Web3Provider = useUserProvider(injectedProvider, localProvider);
    const address = useAddress(userProvider);
    return (
        <React.Fragment>
            <Account setInjectedProvider={setInjectedProvider} userProvider={userProvider} address={address} />
            <UpdateName userProvider={userProvider} address={address} />
        </React.Fragment>
    );
};

export default Main;
