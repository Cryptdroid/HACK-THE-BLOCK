import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getMockGRULLContract } from '../utils/web3';

export default function MintTokens() {
    const [amount, setAmount] = useState("");

    const handleMint = async () => {
        try {
            const contract = getMockGRULLContract(process.env.NEXT_PUBLIC_MOCK_GRULL_ADDRESS);

            // Call the mint function
            const tx = await contract.mint(ethers.utils.parseEther(amount));

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Tokens minted successfully!');
        } catch (error) {
            console.error("Error minting tokens:", error);
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
            <button onClick={handleMint}>Mint Tokens</button>
        </div>
    );
}
