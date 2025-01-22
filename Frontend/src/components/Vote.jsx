import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PlatformManagerABI from './contracts/PlatformManager.json';

export default function Vote() {
  const [organizations, setOrganizations] = useState([]);
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

        // Fetch organizations from the contract
        const orgCount = await newPlatformManager.getCharityEventCount();
        let fetchedOrganizations = [];
        for (let i = 0; i < orgCount; i++) {
          const org = await newPlatformManager.charityEvents(i);
          fetchedOrganizations.push({
            id: i,
            title: org.name,
            description: org.description,
            votes: org.voteCount.toNumber(),
          });
        }
        setOrganizations(fetchedOrganizations);
      } else {
        alert('Please install MetaMask!');
      }
    };
    setupBlockchain();
  }, []);

  const handleVote = async (id) => {
    if (!platformManager) return;
    try {
      const tx = await platformManager.vote(id);
      await tx.wait();
      alert('Vote successful!');
      // Actualizează numărul de voturi local
      setOrganizations((prevState) =>
        prevState.map((org) =>
          org.id === id ? { ...org, votes: org.votes + 1 } : org
        )
      );
    } catch (error) {
      console.error('Vote failed', error);
      alert('Vote failed');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Organizations to Support</h1>
      <div className="organizations-container">
        {organizations.map((organization) => (
          <div key={organization.id} className="organization-card" style={styles.card}>
            <h2>{organization.title}</h2>
            <p>{organization.description}</p>
            <div>
              <button onClick={() => handleVote(organization.id)} style={styles.button}>
                Vote
              </button>
            </div>
            <p>Votes: {organization.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem',
    margin: '1rem',
    borderRadius: '8px',
    width: '250px',
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};
