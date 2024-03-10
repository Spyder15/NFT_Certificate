import React, { useState } from "react";
import { getCertificateDetails } from "../services/contractCalls";

function GetCertificateDetails() {
  const [tokenId, setTokenId] = useState("");
  const [certificateDetails, setCertificateDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getCertificateDetails(tokenId);
      console.log(response);

      let result = {
        name: response[0],
        course: response[1],
        date: response[2],
        issuer: response[3],
      };
      setCertificateDetails(result);
      console.log(certificateDetails);
    } catch (error) {
      setCertificateDetails(null);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Certificate Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Token ID</label>
          <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        </div>
        <button type="submit">Fetch Details</button>
      </form>
      {certificateDetails && (
        <div className="certificate-details">
          <h3>Certificate Details</h3>
          <p>Name: {certificateDetails.name}</p>
          <p>Course: {certificateDetails.course}</p>
          <p>Date: {certificateDetails.date}</p>{" "}
          {/* Display the raw date value */}
          <p>Issuer: {certificateDetails.issuer}</p>
        </div>
      )}
    </div>
  );
}

export default GetCertificateDetails;
