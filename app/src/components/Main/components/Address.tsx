import React from 'react';
import { Navbar } from 'react-bootstrap';

type Props = {
    address: string;
};

const Address = (props: Props) => {
    const blockExplorer = 'https://etherscan.io/address/';

    return props.address ? (
        <Navbar.Text>
            <Navbar.Text style={{ paddingRight: 2 }}>
                <a style={{ color: '#222222' }} href={blockExplorer + props.address}>
                    {props.address}
                </a>
            </Navbar.Text>
        </Navbar.Text>
    ) : (
        <Navbar.Text>Connecting...</Navbar.Text>
    );
};

export default Address;
