// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import Web3 from "web3";
import token from "../../assets/contracts/artifacts/MyToken.json";

const TokenABI:any = token.abi;
const web3:any = new Web3(window.ethereum);

//TODO: UPDATE TOKEN CONTRACt
const tokenContract = import.meta.env.VITE_TOKEN_ADDRESS;
const TokenContract = new web3.eth.Contract(TokenABI, tokenContract);

import { ethers } from "ethers";
import { useToast } from 'vue-toastification';

const toast = useToast()

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
        await TokenContract.getPastEvents('allEvents', {// Using an array means OR: e.g. 20 or 23
            fromBlock: 29229598,
            toBlock: 'latest',
            to: address
        }, function(error, events){ console.log(events); })
        .then(function(events){
            result = events
        });
        
        return result
    
    }, 


    async transfer(sender:string, receiver: string, amount: string){
        //change to way

        const etherAmount =  ethers.utils.parseEther(amount);
       
        try{
            await TokenContract.methods.transfer(receiver, etherAmount).send({from:sender})
            .on('confirmation', function(confirmationNumber:any, receipt:any){
                console.log(receipt);
                
                if(confirmationNumber === 24){
                    toast.success("Succesfully finished the transaction ")
                }
            })
            .on('receipt', function(receipt:any){
                console.log("succesfully created the follwoing contract:")
                toast.success("uploaded the contract to:", receipt)
                console.log(receipt)
            })
        }catch(error:any){
            console.log(error);
            toast.error("error occured");
        }
    }, 

    async getBalance(account:string){
        const balance =  await TokenContract.methods.balanceOf(account).call().then();

        return balance;
    }

}