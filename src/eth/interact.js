const ethers = require("ethers");
const API_KEY = process.env.ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = "0xaCE4F7d01fE9B5641cBaF45a77BEc1c3a2A2b4c7"

const contract = require("./CarseNFT.json");
console.log(JSON.stringify(contract.abi));

//Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
	"ropsten",
	API_KEY
);

//Signer
export async function newWallet(){
	const signer = ethers.Wallet.createRandom();
	const carseNFT = new ethers.Contract(
		CONTRACT_ADDRESS,
		contract.abi,
		signer
	)
	console.log([signer, carseNFT]);
	return [signer, carseNFT, signer.address];
}

//Contract

export async function contractMint(signer, contract, message){
	const tx = await contract.mintNft(signer.getAddress(), message);
	const res = await tx.wait();
	console.log(res);
	return res;
}

async function getURI(contract){
	var uri = await contract.tokenURI(1);
	console.log(uri);
	//uri = await carseNFT.tokenURI(2);
	//console.log(uri);
}

async function getTokens(contract){
	const res = await contract.allTokens();
	console.log(res);
}

//contractMint();
//getTokens();
//getURI();
