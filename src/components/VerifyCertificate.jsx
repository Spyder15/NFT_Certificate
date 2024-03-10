import React, { useState } from "react";
import { verifyCertificate } from "../services/contractCalls";

function VerifyCertificate() {
  const [tokenId, setTokenId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyCertificate(tokenId);
      alert(
        response === true
          ? "The Certificate is Valid"
          : "The Certificate in Invalid"
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Certificate</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Token ID</label>
          <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyCertificate;
