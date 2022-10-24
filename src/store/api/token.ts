// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import Web3 from "web3";
import token from "../../assets/contracts/artifacts/MyToken.json";

const TokenABI:any = token.abi;
const web3:any = new Web3(window.ethereum);

//TODO: UPDATE TOKEN CONTRACt
const tokenContract = "0x53ED56F9AaDF3AADE8e8C7CB730AF4e6BDa90815";
const TokenContract = new web3.eth.Contract(TokenABI, tokenContract);

export default {

    showAll(){
        console.log(TokenABI)
    },
    
    async approve(amount:string, address:string, account:string){
        //now here we want to build the functionality of the contract. 
        let convertedAmount = web3.utils.toWei(amount);
        const approval = await TokenContract.methods.approve(address, convertedAmount).send({from: account})
        return approval;
    },
    
    async allowance(owner:string, spender:string){
        console.log(owner, spender)
        const allowance = await TokenContract.methods.allowance(spender, owner).call();
        
        console.log("allowance is " , allowance)
        return allowance
    },
    
    async getAllEvents(address:string){
        
        console.log("busssyyy...")
        let result = ''
        await TokenContract.getPastEvents('Approval', {// Using an array means OR: e.g. 20 or 23
            fromBlock: 28717382,
            toBlock: 'latest',
            to: address
        }, function(error, events){ console.log(events); })
        .then(function(events){
            result = events
        });
        
        return result
    
    }, 
    
   exportTokenContract(){
    
   }
}