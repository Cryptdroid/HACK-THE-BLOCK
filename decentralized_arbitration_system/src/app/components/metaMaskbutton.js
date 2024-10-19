import React, { useState } from 'react';
import { connectWallet } from '../utils/web3';

export default function MetaMaskButton() {
    const [connected, setConnected] = useState(false);

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
            setConnected(true);
        } catch (error) {
            console.error("Failed to connect wallet", error);
        }
    };

    return (
        <button onClick={handleConnectWallet}>
            {connected ? "Connected" : "Connect Wallet"}
        </button>
    );
}