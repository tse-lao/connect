import { defineStore } from "pinia";
import token from "@/store/api/token"

export const useAccountStore = defineStore('account', {
    
    state: () => ({
        loggedIn: false, 
        address: "", 
        network: "", 
        balance: 0, 
        tokenBalance: 0
      }),
      
      //GETTERS
      getters:{
        
      },

    //ACTIONS
 actions: {
     async getAccount(){
        if (window.ethereum) {
            //write a function and update  for now we do it raw
            
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            
            if(accounts.length === 0){
                console.log("please connect to MetaMAsk.")
            }else{
                this.address = accounts[0]
                this.loggedIn = true;
                
                const network = await window.ethereum.request({method: 'eth_chainId'})
                this.network = network;

                const balance = await window.ethereum.request({method: 'eth_getBalance', params: [accounts[0]]});

                this.balance = Math.round(parseInt(balance) / (10**18) *10000) / 10000;

                const tokens = await token.getBalance(accounts[0]);
                this.tokenBalance = Math.round(parseInt(tokens) / (10**18) *10000) / 10000;
            }
           
            
            //now get geth the nethwork
        }else{
            alert("make sure that web3 is installed in the browser");
        }

    },
    
 }
    
})