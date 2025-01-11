import React, { useState, useRef, useEffect } from 'react';

export function Donate() {
  const [donations, setDonations] = useState([
    { address: '0x123...', amount: 0.5 },
    { address: '0x456...', amount: 1.0 },
    { address: '0x789...', amount: 0.3 },
  ]);
  const [totalDonated, setTotalDonated] = useState(1.8); // Exemplu de total donat
  const [isSectionVisible, setIsSectionVisible] = useState(true); // Starea vizibilității secțiunii
  const donationsRef = useRef(null); // Referință pentru secțiunea de donații

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Setăm vizibilitatea secțiunii
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Secțiunea trebuie să fie vizibilă pe jumătate pentru a activa logica
      }
    );

    if (donationsRef.current) {
      observer.observe(donationsRef.current);
    }

    return () => {
      if (donationsRef.current) {
        observer.unobserve(donationsRef.current);
      }
    };
  }, []);

  function handleDonate() {
    // Simulare donație (înlocuiește cu logica reală când se integrează cu blockchain-ul)
    const newDonation = { address: '0xNewAddress...', amount: 0.2 };
    setDonations([...donations, newDonation]);
    setTotalDonated(totalDonated + newDonation.amount);
  }

  return (
    <div className="donate-container">
      <h1>Donate Page</h1>
      <button onClick={handleDonate}>Donate</button>
      <div style={{ marginTop: '20px' }}>
        <p>Total Donated: {totalDonated} ETH</p>
      </div>

      <h2>Previous Donations</h2>
      <div
        ref={donationsRef}
        style={{
          transition: 'all 0.3s ease',
          height: isSectionVisible ? 'auto' : '500px', // Mărește înălțimea când secțiunea iese din vizibilitate
          overflow: 'hidden',
        }}
      >
        <ul>
          {donations.map((donation, index) => (
            <li key={index}>
              {donation.address} donated {donation.amount} ETH
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
