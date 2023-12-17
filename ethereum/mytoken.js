import web3 from "./web3";
import MyToken from "./build/myToken.json";


const myToken = (address) => {
    return new web3.eth.Contract(MyToken.abi, '0xc8BD6E147728E5e3D5BD1fF93B1a2801e31C0aa3');
}

export default myToken;