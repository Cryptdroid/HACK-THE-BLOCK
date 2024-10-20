import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getGrullTokenContract } from '../utils/web3';

export default function GrullTokenBalance() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Get the contract instance
                const contract = getGrullTokenContract(process.env.NEXT_PUBLIC_GRULL_TOKEN_ADDRESS);

                // Get the address of the connected user
                const address = await contract.signer.getAddress();

                // Fetch the balance
                const balance = await contract.balanceOf(address);

                // Convert balance from wei to ether format and set state
                setBalance(ethers.utils.formatEther(balance));
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return <div>Your GRULL Token Balance: {balance}</div>;
}
