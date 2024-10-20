import React from 'react';
import { getJurorSelectionContract } from '../utils/web3';

export default function RegisterAsJuror() {
    const handleRegister = async () => {
        try {
            const contract = getJurorSelectionContract(process.env.NEXT_PUBLIC_JUROR_SELECTION_ADDRESS);

            // Call the method to register as a juror
            const tx = await contract.registerAsJuror();

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Successfully registered as a juror!');
        } catch (error) {
            console.error("Error registering as juror:", error);
        }
    };

    return (
        <button onClick={handleRegister}>Register as Juror</button>
    );
}
