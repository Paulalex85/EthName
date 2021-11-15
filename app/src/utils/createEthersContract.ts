import EthName from '../contracts/EthName.json';
import { ethers } from 'ethers';

export const createEthersContract = async (userProvider: any) => {
    const network = await userProvider.getNetwork();
    const contractNetworks: { [k: number]: any } = EthName.networks;
    const contractAddress = contractNetworks[network.chainId].address;

    return new ethers.Contract(contractAddress, EthName.abi, userProvider);
};
