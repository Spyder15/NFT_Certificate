# Certificate NFT Smart Contract

This directory contains the smart contract and associated scripts for the Certificate NFT project. The smart contract is built on Ethereum and is responsible for minting, managing, and verifying digital certificates as NFTs (Non-Fungible Tokens).

## Overview

The smart contract, `CertificateNFT.sol`, is an ERC721 token with additional functionalities:

- Minting certificates with details such as name, course, date, and issuer.
- Batch minting functionality for issuing multiple certificates at once.
- Verifying the validity of certificates.
- Role-based access control for minting permissions, specifically utilizing the `MINTER_ROLE` for designated addresses.

## Contract Address

Deployed Contract Address (Sepolia): [0x95719240BE598c1Fd298F6763B1776E4E3A9F95C](https://sepolia.etherscan.io/address/0x95719240BE598c1Fd298F6763B1776E4E3A9F95C)

Please note that interactions with the contract should be done in accordance with the network it's deployed on (e.g., Ethereum Mainnet, Ropsten, Rinkeby, etc.).

## Contract Features

- **ERC721Enumerable**: For enumerating NFTs owned by an account and total supply.
- **AccessControl**: For managing roles and permissions. The `MINTER_ROLE` allows specific addresses the ability to mint new certificates.
- **Ownable**: For administrative actions such as transferring contract ownership.

## Smart Contract Functions

- `mintCertificate`: Mint a single certificate NFT. Restricted to addresses with the `MINTER_ROLE`.
- `batchMintCertificate`: Mint multiple certificates in a single transaction. Also restricted to addresses with the `MINTER_ROLE`.
- `isCertificateValid`: Check if a certificate (token) is still valid based on its expiry.
- `getCertificateDetails`: Retrieve details of a certificate by token ID.
- `addMinter`: Add an address with the minter role. This function is restricted to the contract owner.
- `removeMinter`: Remove an address from the minter role. This function is also restricted to the contract owner.

## Getting Started

To compile and deploy the smart contract, follow these steps:

### Prerequisites

- Node.js and npm installed.
- Truffle or Hardhat for compilation and deployment (optional).

### Compile the Contract

1. Navigate to the `smartcontract` directory.
2. Run the compile script to compile the smart contract:

```bash
node scripts/compile.js
```

This will generate a `compiledContract.json` file in the `builds` directory, containing the ABI and bytecode of the compiled contract.

### Deploy the Contract

Deployment can be done using Truffle, Hardhat, or directly through Remix by importing the `CertificateNFT.sol` file. Ensure you have a `.env` file with your Ethereum node provider URL and private key for deployment.

## Contract Interaction

After deployment, the contract can be interacted with through web3.js or ethers.js in a frontend application or script. Use the ABI from the `compiledContract.json` file for interacting with the deployed contract.