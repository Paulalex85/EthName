import { useCallback, useEffect, useState } from 'react';

export const useAddress = (provider: any) => {
    const [address, setAddress] = useState('');

    const getAddress = useCallback(async (prov: any) => {
        console.log('Retrieve address ...');
        if (prov) {
            const accounts = await prov.listAccounts();
            if (accounts && accounts[0] && accounts[0] !== address) {
                setAddress(accounts[0]);
                console.log('Current address : ' + accounts[0]);
            }
        }
    }, []);

    useEffect(() => {
        getAddress(provider).then(() => {
            return address;
        });
    }, [provider]);
    return address;
};
