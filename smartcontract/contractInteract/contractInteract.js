const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json")
const config = require("../../../config");

const contractAddress = config.contractAddress; // Replace with the deployed contract address
const privateKey = config.privateKey; // Replace with the private key of your Ethereum wallet
const infuraProjectId = config.infuraProjectId; // Replace with your Infura project ID
const infuraAPISecret = config.infuraAPISecret;
const provider = new InfuraProvider("sepolia", infuraProjectId, infuraAPISecret);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

async function mintCertificate(name, course, date, issuer, validUntilDate) {
    console.log("Starting mintCertificate...");

    try {
        const validUntilTimestamp = Math.floor(new Date(validUntilDate).getTime() / 1000);
        console.log("Sending transaction...");
        let tx = await contract.mintCertificate(name, course, date, issuer, validUntilTimestamp);
        console.log("Transaction sent. Waiting for confirmation...");
        let receipt = await tx.wait();
        console.log("Transaction confirmed.");

        if (receipt && receipt.logs) {
            const event = contract.interface.parseLog(receipt.logs[0]);
            const tokenId = event.args[2].toString();
            console.log(`Minted certificate with tokenId: ${tokenId}`);
            return tokenId;
        }
        
    } catch (error) {
        console.error(`Error occurred while minting: ${error.message}`);
    }
}



async function verifyCertificate(tokenId) {
    try {
        const isValid = await contract.verifyCertificate(tokenId);
        console.log(`Certificate with tokenId ${tokenId} exists: ${isValid}`);
    } catch (error) {
        console.error(`Error occurred during verification: ${error.message}`);
    }
}

async function getCertificateDetails(tokenId) {
    try {
        const details = await contract.getCertificateDetails(tokenId);
        console.log(`Certificate Details for tokenId ${tokenId}:`);
        console.log(`- Name: ${details[0]}`);
        console.log(`- Course: ${details[1]}`);
        console.log(`- Date: ${details[2]}`);
        console.log(`- Issuer: ${details[3]}`);
    } catch (error) {
        console.error(`Error occurred while fetching details: ${error.message}`);
    }
}

// Example usage:
//mintCertificate("John Doe", "Blockchain 101", '1693284876', "University of Ethereum", 1693286876);
//verifyCertificate("5693670871597439198790585942051269116720439005392600222032250079944660282778");
//getCertificateDetails('90617858131095298399935299407879445049364111249716807007549551996205246537840');
