import React from "react";
import { useEffect, useState } from "react";
import {
  contractMint,
	newWallet,
} from "./eth/interact.js";

import logo from "./logo.png";

const HelloWorld = () => {
  //state variables
  const [wallet, setWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState("");
  const [status, setStatus] = useState("");
  const [newMessage, setNewMessage] = useState("");

  //called only once
  useEffect(async () => {
    addSmartContractListener();
		let [contract, wallet, walletAddress] = await newWallet();
		setWallet(wallet);
		setWalletAddress(walletAddress);
		setContract(contract);
    setStatus(status);
  }, []);

  function addSmartContractListener() {
		// TODO: was nft minted?
  }

  const onUpdatePressed = async () => {
    const { status } = await contractMint(wallet, contract, newMessage);
    setStatus(status);
  };

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={logo}></img>
      <button id="walletButton">
        {walletAddress && walletAddress.length > 0 ? (
          "Connected: " + String(walletAddress)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <div>
        <input
          type="text"
          placeholder="What's the last videogame you played?"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id="status">{status}</p>

        <button id="publish" onClick={onUpdatePressed}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;
