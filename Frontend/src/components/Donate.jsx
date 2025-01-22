import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PlatformManagerABI from './contracts/PlatformManager.json';

export function Donate() {
  const [totalDonated, setTotalDonated] = useState(0); // Exemplu de total donat
  const [isSectionVisible, setIsSectionVisible] = useState(true); // Starea vizibilității secțiunii
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
          'Adresa_Contract_PlatformManager',
          PlatformManagerABI.abi,
          newSigner
        );
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

    const donationAmount = ethers.utils.parseEther('0.1'); // Suma de donat (exemplu)
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

  return (
    <div className="donate-container">
      <h1>Donate Page</h1>
      <button onClick={handleDonate}>Donate</button>
      <div style={{ marginTop: '20px' }}>
        <p>Total Donated: {totalDonated} ETH</p>
      </div>
    </div>
  );
}
