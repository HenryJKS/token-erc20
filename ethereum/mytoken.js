import web3 from "./web3";
import MyToken from "./build/myToken.json";

const myToken = (address) => {
  return new web3.eth.Contract(MyToken.abi, process.env.NEXT_PUBLIC_ADDRESS);
};

export default myToken;
