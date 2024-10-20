import React from 'react';
import { ethers } from 'ethers';
import { getStakingContract } from '../web3';

export default function StakeTokens({ amount, onStake }) {
    const handleStake = async () => {
        try {
            const contract = getStakingContract(process.env.NEXT_PUBLIC_STAKING_ADDRESS);

            // Parse the amount to Wei (smallest unit of Ether)
            const tx = await contract.stakeTokens(ethers.utils.parseEther(amount));

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Tokens staked successfully!');
            onStake(); // Call the callback to reset the amount or perform additional actions
        } catch (error) {
            console.error("Staking error:", error);
        }
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => onStake(e.target.value)} // Update amount in parent
            />
            <button onClick={handleStake}>Stake Tokens</button>
        </div>
    );
}
