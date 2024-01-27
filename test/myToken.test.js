const assert = require('chai').assert;
const ganache = require('ganache');
const Web3  = require('web3');
const web3 = new Web3(ganache.provider());
const compiledMyToken = require("../ethereum/build/myToken.json");

let accounts
let myToken;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    myToken = await new web3.eth.Contract(compiledMyToken.abi)
        .deploy({ data: compiledMyToken.evm.bytecode.object})
        .send({ from: accounts[0], gas:'2000000'});
});

describe('myToken Contract', () => {
    it('Deploy a contract', () => {
        assert.ok(myToken.options.address);
    });


    it("Total supply from myToken", async () => {
        totalSupply = await myToken.methods._totalSupply().call({
            from: accounts[0]
        });
        assert.equal(1000, totalSupply);
    })

    it("Mint 20 ether", async() => {
        
        await myToken.methods.mint('20').send({
            from: accounts[0],
            gas: '2000000'
        })

        totalSupply = await myToken.methods._totalSupply().call({
            from: accounts[0]
        })

        assert.equal(1020, totalSupply);
    
    });

    it("Burn 20 ether", async() => {

        await myToken.methods.mint('100').send({
            from: accounts[0],
            gas: '2000000'
        })

        await myToken.methods.burn("20").send({
            from: accounts[0],
            gas:'2000000'
        })

        totalSupply = await myToken.methods._totalSupply().call({
            from: accounts[0]
        })

        assert.notEqual(100000, totalSupply)
    })
    
    

});