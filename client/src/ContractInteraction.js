// ContractInteraction.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractInteraction = ({ contractAddress, signer }) => {
    const [proposalDescription, setProposalDescription] = useState('');
    const [proposalId, setProposalId] = useState(0);
    const [proposer, setProposer] = useState('');
    const [votesFor, setVotesFor] = useState(0);
    const [votesAgainst, setVotesAgainst] = useState(0);
    const [executed, setExecuted] = useState(false);
    const [votingChoice, setVotingChoice] = useState(true); // true for "for", false for "against"

    const createProposal = async () => {
        const contract = new ethers.Contract(contractAddress, ['function createProposal(string)'], signer);
        const transaction = await contract.createProposal(proposalDescription);
        await transaction.wait();
        alert('Proposal created successfully!');
    };

    const fetchProposalDetails = async () => {
        try {
            const contract = new ethers.Contract(
                contractAddress,
                ['function getProposalDetails(uint256) view returns (address, string, uint256, uint256, bool)'],
                signer
            );

            const proposalDetails = await contract.getProposalDetails(proposalId);
            setProposer(proposalDetails[0]);
            setProposalDescription(proposalDetails[1]);
            setVotesFor(proposalDetails[2]);
            setVotesAgainst(proposalDetails[3]);
            setExecuted(proposalDetails[4]);
        } catch (error) {
            console.error('Error fetching proposal details:', error.message);
        }
    };

    const voteProposal = async () => {
        try {
            const contract = new ethers.Contract(
                contractAddress,
                ['function vote(uint256, bool)'],
                signer
            );

            const transaction = await contract.vote(proposalId, votingChoice);
            await transaction.wait();
            alert('Vote submitted successfully!');
            fetchProposalDetails(); // Refresh proposal details after voting
        } catch (error) {
            console.error('Error voting on proposal:', error.message);
        }
    };

    useEffect(() => {
        fetchProposalDetails();
    }, [proposalId]); // Refresh proposal details when proposalId changes

    return (
        <div>
            <h2>Create Proposal</h2>
            <input
                type="text"
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
            />
            <button onClick={createProposal}>Create Proposal</button>

            <h2>Vote on Proposal</h2>
            <label>
                Proposal ID:
                <input
                    type="number"
                    value={proposalId}
                    onChange={(e) => setProposalId(parseInt(e.target.value, 10))}
                />
            </label>
            <p>Proposer: {proposer}</p>
            <p>Description: {proposalDescription}</p>
            <p>Votes For: {votesFor}</p>
            <p>Votes Against: {votesAgainst}</p>
            <p>Executed: {executed.toString()}</p>
            <label>
                Your Vote:
                <select onChange={(e) => setVotingChoice(e.target.value === 'true')}>
                    <option value="true">For</option>
                    <option value="false">Against</option>
                </select>
            </label>
            <button onClick={voteProposal}>Vote</button>
        </div>
    );
};

export default ContractInteraction
