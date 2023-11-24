import web3 from "./web3";
import MyToken from "./build/myToken.json";


const myToken = (address) => {
    return new web3.eth.Contract(MyToken.abi, '0x46158a78f855Dc95F21999c9A1c1917C35721309');
}

export default myToken;