import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { createEthersContract } from '../../../utils/createEthersContract';
import { usePoller } from 'eth-hooks';

type Props = {
    userProvider: any;
    address: string;
};

const UpdateName = (props: Props) => {
    const [name, setName] = useState('');
    const [nameOnChain, setNameOnChain] = useState('');

    usePoller(async () => {
        if (props.address && props.userProvider) {
            try {
                createEthersContract(props.userProvider).then((contract) => {
                    contract.readName(props.address).then(
                        (nameData: string) => {
                            setNameOnChain(nameData);
                        },
                        (e: any) => {
                            console.log('Unable to send the transaction', e);
                        },
                    );
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, 1999);

    const handleClick = () => {
        createEthersContract(props.userProvider).then((contract) => {
            const contractWithSigner = contract.connect(props.userProvider.getSigner());
            contractWithSigner.setName(name).then(
                (tx: any) => {
                    console.log(tx);
                },
                (e: any) => {
                    console.log('Unable to send the transaction', e);
                },
            );
        });
    };

    const handleChange = (event: any) => {
        setName(event.target.value);
    };

    return (
        <React.Fragment>
            <span>Current name in contract : {nameOnChain}</span>
            <InputGroup style={{ width: '500px' }}>
                <Form.Control type="text" value={name} onChange={handleChange} />
                <Button onClick={handleClick} variant="primary">
                    UPDATE NAME
                </Button>
            </InputGroup>
        </React.Fragment>
    );
};

export default UpdateName;
