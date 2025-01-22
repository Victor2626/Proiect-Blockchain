import { ethers } from 'ethers';

export async function connectWallet() {
    if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
}

export async function getContractInstance(contractAddress, contractABI, signer) {
    return new ethers.Contract(contractAddress, contractABI, signer);
}
