const path = require("path");
const solc = require("solc");
// fs = file system
const fs = require("fs-extra");

// delete the build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// read the campaign.sol file
const myTokenPath = path.resolve(__dirname, "contracts", "myToken.sol");

// read the contents of the file
let source = fs.readFileSync(myTokenPath, "utf8");

let input = {
  language: "Solidity",
  sources: {
    "myToken.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// compile the contract
let output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "myToken.sol"
    ];

// create the build folder
fs.ensureDirSync(buildPath);

// write the output to the build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
