import React, { useState } from "react";
import "./App.css";
import MintForm from "./components/MintForm";
import VerifyCertificate from "./components/VerifyCertificate";
import GetCertificateDetails from "./components/GetCertificateDetails";
import GetCertificate from "./components/GetCertificate";

function App() {
  const [activeTab, setActiveTab] = useState("mint");
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="head"> Certificate NFT </div>
        <button className="connect" onClick={connectWallet}>
          {account !== ""
            ? `${account.substring(0, 10)}...`
            : "Connect to Metamask"}
        </button>
      </header>
      <nav>
        <div className="tab-list">
          <div
            className={activeTab === "mint" ? "active" : "tab"}
            onClick={() => setActiveTab("mint")}
          >
            Mint Certificate
          </div>
          <div
            className={activeTab === "verify" ? "active" : "tab"}
            onClick={() => setActiveTab("verify")}
          >
            Verify Certificate
          </div>
          <div
            className={activeTab === "details" ? "active" : "tab"}
            onClick={() => setActiveTab("details")}
          >
            Certificate Details
          </div>
          <div
            className={activeTab === "myCertificates" ? "active" : "tab"}
            onClick={() => setActiveTab("myCertificates")}
          >
            My Certificates
          </div>
        </div>
      </nav>
      <div className="tab-content">
        {activeTab === "mint" && <MintForm account={account} />}
        {activeTab === "verify" && <VerifyCertificate />}
        {activeTab === "details" && <GetCertificateDetails />}
        {activeTab === "myCertificates" && <GetCertificate account={account} />}
      </div>
    </div>
  );
}

export default App;
