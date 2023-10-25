import web3 from "./web3";
import MyToken from "./build/myToken.json";


const myToken = (address) => {
    return new web3.eth.Contract(MyToken.abi, '0x3baA5092A7E634541b6ee8c0db736815e3B85821');
}

export default myToken;