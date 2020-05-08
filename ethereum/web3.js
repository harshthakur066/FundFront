import Web3 from "web3";

let provider;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/53187f1aefc74058b52ecd2ccba8f20b"
  );
}

const web3 = new Web3(provider);
export default web3;
