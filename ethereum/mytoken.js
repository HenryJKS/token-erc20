import web3 from "./web3";
import MyToken from "./build/myToken.json";


const myToken = (address) => {
    return new web3.eth.Contract(MyToken.abi, '0x5cF4a02b2403db755f5Fd06f034253e51A16Bd74');
}

export default myToken;