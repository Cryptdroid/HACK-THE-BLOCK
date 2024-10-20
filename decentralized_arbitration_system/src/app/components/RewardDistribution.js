import React from 'react';
import { getRewardDistributionContract } from '../utils/web3';

export default function ClaimRewards() {
    const handleClaim = async () => {
        try {
            const contract = getRewardDistributionContract(process.env.NEXT_PUBLIC_REWARD_DISTRIBUTION_ADDRESS);

            // Call the claimRewards method
            const tx = await contract.claimRewards();

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Rewards claimed successfully!');
        } catch (error) {
            console.error("Error claiming rewards:", error);
        }
    };

    return (
        <button onClick={handleClaim}>Claim Rewards</button>
    );
}
