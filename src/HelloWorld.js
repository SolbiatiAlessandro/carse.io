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
		//let [contract, wallet, walletAddress] = await newWallet();
		let [contract, wallet, walletAddress] = [null, null, "123"];
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
    <div id="container" >
		<div>
				<img id="logo" src={logo}></img>
				<button id="walletButton">
					{walletAddress && walletAddress.length > 0 ? (
						"Testnet burner wallet: " + String(walletAddress)
					) : (
						<span>Couldn't generate a wallet</span>
					)}
				</button>
		</div>
			<div class="pt-5 text-center">
        <input
          type="text"
          placeholder="What's the last videogame you played?"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
					style={{width: "50%"}}
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
