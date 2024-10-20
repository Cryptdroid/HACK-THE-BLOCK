import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getStakingContract } from '../utils/web3';

export default function StakeTokens() {
    const [amount, setAmount] = useState("");

    const handleStake = async () => {
        try {
            const contract = getStakingContract(process.env.NEXT_PUBLIC_STAKING_ADDRESS);

            // Parse the amount to Wei (smallest unit of Ether)
            const tx = await contract.stakeTokens(ethers.utils.parseEther(amount));

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Tokens staked successfully!');
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
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleStake}>Stake Tokens</button>
        </div>
    );
}
