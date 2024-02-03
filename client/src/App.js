// App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ContractInteraction from './ContractInteraction.js';

const App = () => {
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentSigner = provider.getSigner(accounts[0]);
        setSigner(currentSigner);
      } else {
        alert('Please install MetaMask to use this dApp.');
      }
    };

    init();
  }, []);

  const contractAddress = '0x0a5d7071b42fd91388440aC6D07C7Ac7e14F724b'; // Replace with your contract address

  return (
    <div>
      <h1>Governance Token DApp</h1>
      {signer && <ContractInteraction contractAddress={contractAddress} signer={signer} />}
    </div>
  );
};

export default App;
