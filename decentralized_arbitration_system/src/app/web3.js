import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

// Load contract artifacts (ABI)
import GrullToken from './artifacts/contracts/GrullToken.json';
import MockGRULL from './artifacts/contracts/MockGRULL.json';
import StakingContract from './artifacts/contracts/StakingContract.json';
import RewardDistribution from './artifacts/contracts/RewardDistribution.json';
import VotingSystem from './artifacts/contracts/VotingSystem.json';
import JurorSelection from './artifacts/contracts/JurorSelection.json';


let provider, signer;

export const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
};

export const getContract = (contractAddress, abi) => {
    if (!signer) {
        throw new Error("Wallet not connected");
    }
    return new ethers.Contract(contractAddress, abi, signer);
};

// Export contract instances
export const getGrullTokenContract = (address) => getContract(address, GrullToken.abi);
export const getMockGRULLContract = (address) => getContract(address, MockGRULL.abi);
export const getStakingContract = (address) => getContract(address, StakingContract.abi);
export const getRewardDistributionContract = (address) => getContract(address, RewardDistribution.abi);
export const getVotingSystemContract = (address) => getContract(address, VotingSystem.abi);
export const getJurorSelectionContract = (address) => getContract(address, JurorSelection.abi);
