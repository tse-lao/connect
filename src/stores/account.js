import { defineStore } from "pinia";
import token from "@/store/api/token"
import profile from "@/store/api/profile"

export const useAccountStore = defineStore('account', {

    state: () => ({
        loggedIn: false,
        address: "",
        username: "", 
        accounts: [], 
        network: "",
        balance: 0,
        tokenBalance: 0
    }),

    //GETTERS
    getters: {

    },

    //ACTIONS
    actions: {
        async getAccount() {
            if (window.ethereum) {
                //write a function and update  for now we do it raw

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

                if (accounts.length === 0) {
                    console.log("please connect to MetaMAsk.")
                } else {
                   

                    const network = await window.ethereum.request({ method: 'eth_chainId' })
                    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] });
                    const tokens = await token.getBalance(accounts[0]);
                    
                    this.network = network;
                    this.accounts = accounts;
                    this.balance = Math.round(parseInt(balance) / (10 ** 18) * 10000) / 10000;
                    this.address = accounts[0]
                    this.loggedIn = true;
                    this.tokenBalance = Math.round(parseInt(tokens) / (10 ** 18) * 10000) / 10000;

                    this.getUsername();
                }


                //now get geth the nethwork
            }
        },
        async getUsername(){
            const username = await profile.getName();
            this.username = username;
            
        }

    }

})