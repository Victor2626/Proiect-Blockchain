import React, { useState } from 'react';

export default function Vote() {
  // State pentru organizațiile și voturile lor
  const [organizations, setOrganizations] = useState([
    { id: 1, title: 'Organization One', description: 'A humanitarian organization helping people in need.', votes: 15 },
    { id: 2, title: 'Organization Two', description: 'This organization provides food and shelter to refugees.', votes: 10 },
    { id: 3, title: 'Organization Three', description: 'An NGO focused on environmental protection.', votes: 8 },
    
  ]);

  // Functia pentru a gestiona voturile
  const handleVote = (id) => {
    setOrganizations((prevState) =>
      prevState.map((org) =>
        org.id === id ? { ...org, votes: org.votes + 1 } : org
      )
    );
  };

  // Functia pentru a gestiona donatiile
  const handleDonate = (id) => {
    // Aici poți adăuga logica de integrare cu Ethereum pentru donații
    console.log(`Donating to organization with ID: ${id}`);
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
              <button onClick={() => handleDonate(organization.id)} style={styles.button}>
                Donate
              </button>
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
