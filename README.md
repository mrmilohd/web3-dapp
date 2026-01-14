# Simple Ledger dApp

A simple decentralized application deployed on the **Sepolia testnet** that allows users to deposit and withdraw ETH while maintaining an on-chain ledger balance.

## Live Demo
- **Frontend:** [https://ephemeral-bunny-43e4ec.netlify.app/](https://ephemeral-bunny-43e4ec.netlify.app/)
- **Contract Address:** `0xcC5E38e81F6cC2973CE01E945d45c846CF839aaF`
- **Etherscan Verification:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xcC5E38e81F6cC2973CE01E945d45c846CF839aaF)

---

## Tech Stack

- **Solidity** (Smart Contracts)
- **Foundry** (Deployment and Testing)
- **Ethers.js** (Blockchain Interaction)
- **HTML, CSS, JavaScript** (Frontend)

## Prerequisites

- Node.js installed
- MetaMask browser extension
- Sepolia ETH (testnet funds)

---

## Setup & Deployment

### 1. Deploy the Smart Contract

Navigate to the project directory and deploy using Foundry:

```bash
forge create src/SimpleLedger.sol:SimpleLedger \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY
