import React, { useState } from 'react';
import { BigNumber, providers } from 'ethers';
import { Navbar } from 'react-bootstrap';
import { PriceDisplay } from '../../Utils';
import { usePoller } from 'eth-hooks';

type Props = {
    provider: providers.Web3Provider;
    address: string;
};

const Balance = (props: Props) => {
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));

    usePoller(async () => {
        if (props.address && props.provider) {
            try {
                const newBalance = await props.provider.getBalance(props.address);
                setBalance(BigNumber.from(newBalance));
            } catch (e) {
                console.log(e);
            }
        }
    }, 1999);

    return (
        <Navbar.Text style={{ paddingRight: 5 }}>
            <PriceDisplay weiAmount={balance} dollarMultiplier={1} />
        </Navbar.Text>
    );
};

export default Balance;
