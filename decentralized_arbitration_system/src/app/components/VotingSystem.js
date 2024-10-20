import React, { useState } from 'react';
import { getVotingSystemContract } from '../utils/web3';

export default function VoteOnDispute({ disputeId }) {
    const [vote, setVote] = useState(true);

    const handleVote = async () => {
        try {
            const contract = getVotingSystemContract(process.env.NEXT_PUBLIC_VOTING_SYSTEM_ADDRESS);

            // Call the vote method
            const tx = await contract.vote(disputeId, vote);

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Vote cast successfully!');
        } catch (error) {
            console.error("Voting error:", error);
        }
    };

    return (
        <div>
            <button onClick={() => setVote(true)}>Vote In Favor</button>
            <button onClick={() => setVote(false)}>Vote Against</button>
            <button onClick={handleVote}>Submit Vote</button>
        </div>
    );
}
