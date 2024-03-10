# Certificate NFT Project

This project allows users to mint, verify, and manage digital certificates as NFTs (Non-Fungible Tokens) using Ethereum blockchain technology. It integrates with Metamask for Ethereum transactions and uses a React frontend for interacting with smart contracts.

## Features

- **Mint Certificate**: Users can create a new certificate NFT with details such as recipient name, course name, issue date, and validity. 
    **Note**: The mint function is restricted and can only be called by addresses that have been granted the minter role.
- **Verify Certificate**: Allows verification of a certificate's authenticity and validity by checking its token ID on the blockchain.
- **Certificate Details**: Users can retrieve details of a certificate using its token ID.
- **My Certificates**: Display a list of certificates minted or owned by the connected Ethereum account.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/IshitaSrivast/certificateNFT
cd certificateNFT
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

The application should now be running on [http://localhost:1337](http://localhost:1337).

## Connecting to Metamask

This project requires Metamask to interact with the Ethereum blockchain. Ensure you have Metamask installed and set up in your browser.

## Smart Contract

The functionality of this project is powered by a smart contract deployed to the Ethereum blockchain.

- **Contract Address**: `0x95719240BE598c1Fd298F6763B1776E4E3A9F95C` (Replace with your actual contract address)

For more details about the smart contract, including its functions and how to interact with it, see the [Smart Contract README](smartcontract/README.md) in the `smartcontract` directory.

## Usage

- **Connecting Your Wallet**: Click on "Connect to Metamask" to link your Ethereum wallet.
- **Minting a Certificate**: Navigate to the "Mint Certificate" tab, fill out the form, and submit to mint a new certificate NFT. Remember, minting is restricted to addresses with the minter role.
- **Verifying a Certificate**: Go to the "Verify Certificate" tab, enter the token ID of the certificate, and submit to verify its authenticity.
- **Viewing Certificate Details**: To see more details about a specific certificate, use the "Certificate Details" tab and enter the token ID.
- **My Certificates**: This tab displays all certificates associated with the connected wallet.

## Smart Contract Interaction

The smart contract functions are encapsulated in the `src/services/contractCalls.js` file, which includes methods for minting, verifying, and fetching certificate details.

## Technologies Used

- React.js
- Ethereum blockchain
- Metamask
- ethers.js
- HTML2Canvas
- jsPDF
