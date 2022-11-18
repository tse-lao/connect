// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import Airdrop from "@/assets/smartContract/artifacts/contracts/Airdrop.sol/Airdrop.json";
import {useAccountStore} from "@/stores/account"
import Web3 from 'web3';
import { useToast } from "vue-toastification";
import { ethers } from "ethers";

const toast = useToast();
const AirdropABI: any = Airdrop.abi;
const web3 = new Web3(window.ethereum);
const airdropAddress = import.meta.env.VITE_AIRDROP_ADDRESS
const account =  useAccountStore();
const AirDropContract = new web3.eth.Contract(AirdropABI, airdropAddress);


export default {
    //first of all we want to get the account we are using from store. 
    async readBalances(){
        let balance = await AirDropContract.methods.getBalance().call().then();
        let  tokenBalance = await AirDropContract.methods.getTokenBalance().call().then();
        balance = ethers.utils.formatEther(balance);
        tokenBalance = ethers.utils.formatEther(tokenBalance)
        return {matic: balance, token: tokenBalance}
    },

    async owner(){
        const owner = await AirDropContract.methods.getBalance().call().then();
        console.log(owner)
        return owner;
    }, 
    async changeDropAmount(_amount:string){
       if(account.address != this.owner()){
            toast.error("You are not the owner")
       }
      

       try{
         await AirDropContract.methods.changeDropAmount(_amount).send({from: account.address })
         .on('confirmation', function(confirmationNumber:any, receipt:any){
            console.log(receipt);
            
            if(confirmationNumber === 24){
                console.log("succesfully uploaded the contract. ")
            }
        })
        .on('receipt', function(receipt:any){
            console.log("succesfully created the follwoing contract:")
            toast.success("Succesfully change to the amount")
            console.log(receipt)
        })
       }catch(error:any){
         toast.error("Encountered an error while performing the changeDropAmount");
       }


    }, 
    async claimToken(){
        let value:any = await this.getConverstion();

        const cost:string = value.cost.toString();
        console.log(cost)
        
        let payAmount = ethers.utils.parseEther(cost);
 
 
        try{
            await AirDropContract.methods.claimToken().send({from: account.address, value: payAmount})
            .on('confirmation', function(confirmationNumber:any, receipt:any){
               console.log(receipt);
               
               if(confirmationNumber === 24){
                   console.log("succesfully uploaded the contract. ")
               }
           })
           .on('receipt', function(receipt:any){
               console.log("succesfully created the follwoing contract:")
               toast.success("Succesfully claimed the token")
               console.log(receipt)
           })
          }catch(error:any){
            toast.error(error.message);
          }
    }, 
  
    
    async getConverstion(){
        const dropAmount = await AirDropContract.methods.dropAmount().call().then();
        const conversionRate = await AirDropContract.methods.CONVERSION_RATE().call().then();

        const cost = dropAmount / conversionRate;
        return {dropAmount: dropAmount, conversionRate:conversionRate, cost: cost}
    }, 
    
   async withdraw(amount:string){
        console.log(AirDropContract.methods.withdraw(amount))
        console.log()
        console.log(account.address)
        try{
            await AirDropContract.methods.withdraw(amount).send({from: account.address})
            .on('confirmation', function(confirmationNumber:any, receipt:any){
               console.log(receipt);
               
               if(confirmationNumber === 24){
                   console.log("succesfully uploaded the contract. ")
               }
           })
           .on('receipt', function(receipt:any){
               console.log("Succesfully withdraw the money:")
               toast.success("Succesfully withdraw the money ")
               console.log(receipt)
           })
          }catch(error:any){
            console.log(error)
            toast.error(error.message);
          }

    },
    async withdrawTokens(_amount:string){
        try{
            await AirDropContract.methods.withdrawToken(_amount).send({from: account.address})
            .on('confirmation', function(confirmationNumber:any, receipt:any){
               console.log(receipt);
               
               if(confirmationNumber === 24){
                   console.log("succesfully uploaded the contract. ")

               }
           })
           .on('receipt', function(receipt:any){
               toast.success("Succesfully withdraw the money ")
               console.log(receipt)
           })
          }catch(error:any){
            console.log(error)
            toast.error(error.message);
          }

    },

    async checkRegisted(){
        const registered = await AirDropContract.methods.registered(account.address).call().then() ;

        return registered;
    },

    depositTokens(_amount:string){},

    readAccount(){
        return account.address;
    }
}  