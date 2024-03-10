import React, { useEffect, useState } from "react";
import { getOwnedCertificates } from "../services/contractCalls";

function GetCertificateDetails(account) {
  const [lists, setLists] = useState([]);

  const callTokenIds = async () => {
    if (account.account === "") {
      alert("Please connect Metamask");
      return;
    } else {
      console.log(account);
      const response = await getOwnedCertificates(account.account);
      console.log(response);
      setLists(response);
    }
  };

  useEffect(() => {
    callTokenIds();
  }, [account]);

  return (
    <div className="listCert">
      {lists.map((item, index) => (
        <div className="list-item" key={index}>
          <div className="certificate-details">
            <h3>Certificate Details</h3>
            <p>Name: {item.name}</p>
            <p>Course: {item.date}</p> {/* Display the raw date value */}
            <p>Issuer: {item.issuer}</p>
            <p>ID: {item.tokenId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetCertificateDetails;
