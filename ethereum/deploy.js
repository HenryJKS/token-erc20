require("dotenv").config({ path: "../.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledMyToken = require("./build/myToken.json");

console.log(process.env.MNEMONIC);
console.log(process.env.API_INFURA);

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.API_INFURA
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledMyToken.abi)
    .deploy({ data: compiledMyToken.evm.bytecode.object })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
