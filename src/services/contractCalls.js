import { ethers } from "ethers";
import { contractDetails } from "./abi";

const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();
export const contract = new ethers.Contract(
  contractDetails.address,
  contractDetails.abi,
  signer
);

export async function mintCertificate(
  recipient,
  name,
  course,
  date,
  issuer,
  validUntilDate
) {
  try {
    const validUntilTimestamp = Math.floor(
      new Date(validUntilDate).getTime() / 1000
    );

    let tx = await contract.mintCertificate(
      recipient,
      name,
      course,
      date,
      issuer,
      validUntilTimestamp
    );
    let receipt = await tx.wait();

    if (receipt && receipt.logs) {
      const event = contract.interface.parseLog(receipt.logs[0]);
      const tokenId = event.args[2].toString();
      return tokenId;
    } else {
      throw new Error("Minting receipt didn't contain expected logs");
    }
  } catch (error) {
    console.error(`Error occurred while minting: ${error.message}`);
    throw error;
  }
}

export async function batchMintCertificates(
  recipients,
  names,
  courses,
  dates,
  issuers,
  validUntilDates
) {
  try {
    const validUntilTimestamps = validUntilDates.map((date) =>
      Math.floor(new Date(date).getTime() / 1000)
    );
    let tx = await contract.batchMintCertificate(
      recipients,
      names,
      courses,
      dates,
      issuers,
      validUntilTimestamps
    );
    let receipt = await tx.wait();

    if (receipt && receipt.events) {
      // Filter out Transfer events from the receipt
      const transferEvents = receipt.events.filter(
        (e) => e.event === "Transfer"
      );
      if (transferEvents.length === 0)
        throw new Error("No Transfer events found");
      const tokenIds = transferEvents.map((event) =>
        event.args.tokenId.toString()
      );
      return tokenIds;
    } else {
      throw new Error("Batch minting receipt didn't contain expected events");
    }
  } catch (error) {
    console.error(`Error occurred during batch minting: ${error.message}`);
    throw error;
  }
}

export async function verifyCertificate(tokenId) {
  try {
    return await contract.verifyCertificate(tokenId);
  } catch (error) {
    console.error(`Error occurred during verification: ${error.message}`);
    throw error;
  }
}

export async function getCertificateDetails(tokenId) {
  try {
    return await contract.getCertificateDetails(tokenId);
  } catch (error) {
    console.error(`Error occurred while fetching details: ${error.message}`);
    throw error;
  }
}

export async function addMinter(minterAddress) {
  try {
    let tx = await contract.addMinter(minterAddress);
    await tx.wait();
    console.log("Minter added successfully");
  } catch (error) {
    console.error(`Error occurred while adding minter: ${error.message}`);
    throw error;
  }
}

export async function removeMinter(minterAddress) {
  try {
    let tx = await contract.removeMinter(minterAddress);
    await tx.wait();
    console.log("Minter removed successfully");
  } catch (error) {
    console.error(`Error occurred while removing minter: ${error.message}`);
    throw error;
  }
}

async function getCertificateDetailsByTokenId(contract, tokenId) {
  const details = await contract.getCertificateDetails(tokenId);
  return {
    name: details[0],
    course: details[1],
    date: details[2],
    issuer: details[3],
    // Assuming getCertificateDetails returns these fields in this order
  };
}

// Function to get all owned NFTs and their certificate details by an address
export async function getOwnedCertificates(ownerAddress) {
  try {
    const balance = await contract.balanceOf(ownerAddress);
    const certificates = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
      const details = await getCertificateDetailsByTokenId(
        contract,
        tokenId.toString()
      );
      certificates.push({ tokenId: tokenId.toString(), ...details });
    }

    return certificates;
  } catch (error) {
    console.error("Error fetching owned certificates:", error);
    throw error;
  }
}
