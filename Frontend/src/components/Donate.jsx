import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PlatformManagerABI from '../abi/PlatformManager.json';

export function Donate() {
  const [totalDonated, setTotalDonated] = useState(0);
  const [isManager, setIsManager] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [platformManager, setPlatformManager] = useState(null);

  useEffect(() => {
    const setupBlockchain = async () => {
      if (window.ethereum) {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        await newProvider.send('eth_requestAccounts', []);
        const newSigner = newProvider.getSigner();
        const newPlatformManager = new ethers.Contract(
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          PlatformManagerABI.abi,
          newSigner
        );
        const contractCode = await newProvider.getNetwork();
        const managerAddress = await newPlatformManager.manager();
        const userAddress = await newSigner.getAddress();
        setIsManager(managerAddress.toLowerCase() === userAddress.toLowerCase());

        setProvider(newProvider);
        setSigner(newSigner);
        setPlatformManager(newPlatformManager);
      } else {
        alert('Please install MetaMask!');
      }
    };
    setupBlockchain();
  }, []);

  const handleDonate = async () => {
    if (!platformManager) return;

    const donationAmount = ethers.utils.parseEther('0.1');
    try {
      const tx = await platformManager.donate({ value: donationAmount });
      await tx.wait();
      alert('Donation successful!');
      setTotalDonated(totalDonated + parseFloat(ethers.utils.formatEther(donationAmount)));
    } catch (error) {
      console.error('Donation failed', error);
      alert('Donation failed');
    }
  };

  const handleDistributeFunds = async () => {
    if (!platformManager) return;

    try {
      const tx = await platformManager.distributeFunds();
      await tx.wait();
      alert('Funds distributed successfully!');
    } catch (error) {
      console.error('Distribution failed', error);
      alert('Failed to distribute funds');
    }
  };

  return (
    <div className="donate-container">
      <h1>Donate Page</h1>
      <button onClick={handleDonate}>Donate</button>
      <button style={{ marginLeft: '20px', marginTop: '20px' }} onClick={handleDistributeFunds}>
        Distribuie fondurile
      </button>
      <div style={{ marginTop: '20px' }}>
        <p>Total Donated: {totalDonated} ETH</p>
      </div>
    </div>
  );
}
